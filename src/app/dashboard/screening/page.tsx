'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { getRecommendations } from '@/lib/actions';
import { useState, useEffect, useCallback } from 'react';
import { Loader2, Sparkles, BellRing } from 'lucide-react';
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

export default function ScreeningPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [recommendations, setRecommendations] = useState<{
    text: string;
    reminder: boolean;
  } | null>(null);
  const [ageInMonths, setAgeInMonths] = useState<number | null>(null);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);

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
        setRiskFactors(data.riskFactors ?? []);
        if (data.recommendations) {
           setRecommendations({ text: data.recommendations, reminder: data.reminderNeeded });
        }
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
    if (!user || ageInMonths === null) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Infant profile and age are required.',
      });
      return;
    }
    setIsLoading(true);
    setRecommendations(null);

    try {
      const result = await getRecommendations({
        screeningStatus: values.screeningStatus as 'Passed' | 'Referred' | 'Not Yet Screened',
        ageInMonths: ageInMonths,
        riskFactors: riskFactors,
      });

      if (result.success && result.data) {
        setRecommendations({
          text: result.data.recommendations,
          reminder: result.data.reminderNeeded,
        });

        // Save to Firestore
        await setDoc(doc(db, 'screenings', user.uid), {
          screeningStatus: values.screeningStatus,
          riskFactors: riskFactors,
          userId: user.uid,
          lastUpdated: new Date().toISOString(),
          recommendations: result.data.recommendations,
          reminderNeeded: result.data.reminderNeeded,
        }, { merge: true });
        
        toast({ title: 'Success', description: 'Recommendations generated.' });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'AI Error', description: 'Could not get recommendations.' });
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
    <div className="grid gap-6 md:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Hearing Screening</CardTitle>
              <CardDescription>
                Record the latest screening status to receive personalized guidance. 
                Manage risk factors in the 'Risk Factors' section.
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
                        onValueChange={field.onChange}
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
                Get Recommendations
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="space-y-6">
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-character" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating personalized advice...</span>
              </div>
            )}
            {!isLoading && !recommendations && (
              <p className="text-muted-foreground">
                Submit the form to generate AI-powered recommendations.
              </p>
            )}
            {recommendations && (
              <div className="space-y-4">
                <p className="whitespace-pre-wrap">{recommendations.text}</p>
                {recommendations.reminder && (
                  <Alert>
                    <BellRing className="h-4 w-4" />
                    <AlertTitle>Reminder Suggested</AlertTitle>
                    <AlertDescription>
                      A follow-up screening is recommended. We'll remind you.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
