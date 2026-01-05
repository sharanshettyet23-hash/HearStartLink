'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { differenceInMonths } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const screeningSchema = z.object({
  screeningStatus: z.enum(['Passed', 'Referred', 'Not Yet Screened'], {
    required_error: 'You need to select a screening status.',
  }),
});

type ScreeningFormValues = z.infer<typeof screeningSchema>;

// Guidance Card Component
function GuidanceCard({ status }: { status: ScreeningFormValues['screeningStatus'] }) {
  const router = useRouter();
  const [milestoneChoice, setMilestoneChoice] = useState<'achieved' | 'not-achieved' | null>(null);

  const handleNavigate = () => {
    router.push('/dashboard/reports'); // Navigate to the referral page
  };

  const renderContent = () => {
    switch (status) {
      case 'Passed':
        return (
          <ul className="list-disc list-inside space-y-2">
            <li>Monitor developmental milestones (speech, language, auditory).</li>
            <li>Schedule Screening for Auditory, Speech & Language Evaluation at 1.5 years.</li>
          </ul>
        );
      case 'Referred':
        return (
          <ul className="list-disc list-inside space-y-2">
            <li>Check the high-risk register.</li>
            <li>Repeat hearing screening after 1 month (during vaccination visit).</li>
            <li>If repeat screening is PASS → continue milestone monitoring.</li>
            <li>If repeat screening is FAIL → immediately refer to an audiologist for diagnostic evaluation.</li>
            <li>Schedule Screening for Auditory, Speech & Language Evaluation at 1.5 years.</li>
          </ul>
        );
      case 'Not Yet Screened':
        return (
          <div>
            <p className="font-bold">Step 1: Check the high-risk register.</p>
            <p className="font-bold mt-2">Step 2: Monitor developmental milestones and perform Ling Six Sound Check.</p>
            
            <div className="mt-4 border-t border-purple-400 pt-4">
              <p className="font-semibold mb-2">Based on your observation:</p>
              {milestoneChoice === 'achieved' ? (
                <ul className="list-disc list-inside space-y-2">
                  <li>Schedule Auditory, Speech & Language Evaluation at 1.5 years.</li>
                </ul>
              ) : milestoneChoice === 'not-achieved' ? (
                <div>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Immediately refer to an audiologist.</li>
                  </ul>
                  <Button onClick={handleNavigate} className="mt-4 bg-white text-purple-700 hover:bg-gray-200">
                    Go to Referral Section
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Button onClick={() => setMilestoneChoice('achieved')} className="bg-purple-500 hover:bg-purple-400 border border-white">Milestones Achieved & Responds to Ling Sounds</Button>
                  <Button onClick={() => setMilestoneChoice('not-achieved')} className="bg-purple-500 hover:bg-purple-400 border border-white">Milestones Not Achieved / Suspect Hearing Loss</Button>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-purple-700 text-white rounded-lg">
      <CardHeader>
        <CardTitle>Guidance</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}

export default function ScreeningPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [ageInMonths, setAgeInMonths] = useState<number | null>(null);
  const [savedStatus, setSavedStatus] = useState<ScreeningFormValues['screeningStatus'] | null>(null);

  const form = useForm<ScreeningFormValues>({
    resolver: zodResolver(screeningSchema),
    defaultValues: {},
  });

  const fetchScreeningData = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const profileRef = doc(db, 'infant_profiles', user.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        const dob = profileSnap.data().dob;
        setAgeInMonths(differenceInMonths(new Date(), new Date(dob)));
      }

      const screeningRef = doc(db, 'screenings', user.uid);
      const screeningSnap = await getDoc(screeningRef);
      if (screeningSnap.exists()) {
        const data = screeningSnap.data();
        form.reset({ screeningStatus: data.screeningStatus });
      }
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load data.' });
    } finally {
      setIsFetching(false);
    }
  }, [user, form, toast]);

  useEffect(() => {
    fetchScreeningData();
  }, [fetchScreeningData]);

  async function onSubmit(values: ScreeningFormValues) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to save screening status.',
      });
      return;
    }
    setIsLoading(true);

    try {
      await setDoc(doc(db, 'screenings', user.uid), {
        screeningStatus: values.screeningStatus,
        userId: user.uid,
        lastUpdated: new Date().toISOString(),
      }, { merge: true });
      
      toast({ title: 'Success', description: 'Screening status saved.' });
      setSavedStatus(values.screeningStatus); // Show guidance card on successful save
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save screening status.' });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return <div className="flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  
  if (ageInMonths === null) {
     return <Alert>
        <AlertTitle>Infant Profile Needed</AlertTitle>
        <AlertDescription>
          Please complete the infant profile first to access screening tools.
        </AlertDescription>
      </Alert>
  }

  return (
    <div className="grid gap-6 md:grid-cols-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Hearing Screening</CardTitle>
              <CardDescription>
                Record the latest screening status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="screeningStatus"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Screening Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSavedStatus(null); // Hide card when selection changes
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Passed" />
                          </FormControl>
                          <FormLabel className="font-normal">Passed</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Referred" />
                          </FormControl>
                          <FormLabel className="font-normal">Referred (Needs follow-up)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Not Yet Screened" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Not Yet Screened
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Status
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {savedStatus && <GuidanceCard status={savedStatus} />}
    </div>
  );
}
