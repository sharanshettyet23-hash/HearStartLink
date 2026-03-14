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
import { Loader2, Save, AlertTriangle, ArrowRight, ArrowLeft, Users, HeartPulse, Truck, Baby, Scan, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const iconMap: { [key: string]: React.ElementType } = {
  Users,
  HeartPulse,
  Truck,
  Baby,
  Scan,
  Stethoscope,
};

const riskFactorSchema = z.object({
  riskFactors: z.array(z.string()).optional(),
});

type RiskFactorFormValues = z.infer<typeof riskFactorSchema>;

export default function RiskFactorsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<RiskFactorFormValues>({
    resolver: zodResolver(riskFactorSchema),
    defaultValues: { riskFactors: [] },
  });
  
  const totalSteps = HIGH_RISK_FACTORS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentSection = HIGH_RISK_FACTORS[currentStep];

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
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handlePrevious = () => {
     if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
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

            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-700" />
              <AlertTitle className="font-bold text-blue-800">Important Information</AlertTitle>
              <AlertDescription className="text-blue-700 space-y-2">
                <p>The above-mentioned conditions are risk factors that may increase the likelihood of hearing loss in children.</p>
                <p>If your child has any of these risk factors, it is recommended to undergo a hearing screening.</p>
                <p>Early hearing screening helps in the timely identification of possible hearing problems.</p>
                <p className="font-semibold mt-3">Note: Even if a child passes the newborn hearing screening, they may still be at risk. Regular follow-up hearing checks are recommended for children with any of the above risk factors.</p>
              </AlertDescription>
            </Alert>

             <div className="pt-4">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">Step {currentStep + 1} of {totalSteps}</p>
            </div>
          </CardHeader>
          
          <CardContent className="min-h-[250px]">
            <div key={currentSection.category}>
              <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-lg border-2 border-rose-200">
                {currentSection.icon && (() => {
                  const Icon = iconMap[currentSection.icon];
                  return Icon ? (
                    <div className="p-2 bg-rose-500 rounded-full">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  ) : null;
                })()}
                <h3 className="text-xl font-semibold text-rose-900">{currentSection.category}</h3>
              </div>
              <div className="space-y-4">
                {currentSection.factors.map((factor) => (
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
                          <span dangerouslySetInnerHTML={{ __html: factor }} />
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={isLoading || currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button type="button" onClick={handleNext} disabled={isLoading}>
              {currentStep === totalSteps - 1 && isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : currentStep === totalSteps - 1 ? (
                <Save className="mr-2 h-4 w-4" />
              ) : null}
              {currentStep === totalSteps - 1 ? 'Save All Risk Factors' : 'Next'}
              {currentStep < totalSteps - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
