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
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { HIGH_RISK_FACTORS } from '@/lib/constants';
import { useState, useEffect, useCallback } from 'react';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Separator } from '@/components/ui/separator';

const riskFactorSchema = z.object({
  riskFactors: z.array(z.string()).optional(),
});

type RiskFactorFormValues = z.infer<typeof riskFactorSchema>;

export default function RiskFactorsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const form = useForm<RiskFactorFormValues>({
    resolver: zodResolver(riskFactorSchema),
    defaultValues: { riskFactors: [] },
  });

  const fetchRiskFactors = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const screeningRef = doc(db, 'screenings', user.uid);
      const screeningSnap = await getDoc(screeningRef);
      if (screeningSnap.exists()) {
        form.reset({ riskFactors: screeningSnap.data().riskFactors ?? [] });
      }
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load risk factors.' });
    } finally {
      setIsFetching(false);
    }
  }, [user, form, toast]);

  useEffect(() => {
    fetchRiskFactors();
  }, [fetchRiskFactors]);

  async function onSubmit(values: RiskFactorFormValues) {
    if (!user) return;
    setIsLoading(true);
    try {
      await setDoc(doc(db, 'screenings', user.uid), {
        riskFactors: values.riskFactors,
        userId: user.uid,
        lastUpdated: new Date().toISOString(),
      }, { merge: true });
      toast({ title: 'Success', description: 'Risk factors have been saved.' });
    } catch (error) {
       toast({ variant: 'destructive', title: 'Error', description: 'Could not save risk factors.' });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return <div className="flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>High-Risk Factors for Hearing Loss</CardTitle>
            <CardDescription>
              Select any factors that apply to the infant. This information helps in generating personalized recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {HIGH_RISK_FACTORS.map((group) => (
                <div key={group.category}>
                  <h3 className="text-lg font-medium text-primary mb-4">{group.category}</h3>
                  <div className="space-y-4">
                    {group.factors.map((factor) => (
                      <FormField
                        key={factor}
                        control={form.control}
                        name="riskFactors"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(factor)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value ?? []), factor])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== factor
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-muted-foreground leading-snug">
                              {factor}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Risk Factors
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
