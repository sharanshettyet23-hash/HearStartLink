'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { AUDITORY_MILESTONES } from '@/lib/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';
import { Loader2, ArrowRight, ArrowLeft, Save, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MilestonesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isTracking, setIsTracking] = useState(false);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const totalMilestones = AUDITORY_MILESTONES.reduce(
    (sum, group) => sum + group.milestones.length,
    0
  );
  const progress =
    totalMilestones > 0
      ? (completedMilestones.length / totalMilestones) * 100
      : 0;

  const totalGroups = AUDITORY_MILESTONES.length;
  const stepProgress = ((currentGroupIndex + 1) / (totalGroups + 1)) * 100;
  const currentGroup = AUDITORY_MILESTONES[currentGroupIndex];

  const fetchMilestonesData = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const docRef = doc(db, 'milestones', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCompletedMilestones(docSnap.data().completed ?? []);
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load milestones data.',
      });
    } finally {
      setIsFetching(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (isTracking) {
      fetchMilestonesData();
    }
  }, [isTracking, fetchMilestonesData]);

  const handleToggleMilestone = (milestone: string) => {
    setCompletedMilestones((prev) =>
      prev.includes(milestone)
        ? prev.filter((m) => m !== milestone)
        : [...prev, milestone]
    );
  };

  const handleSaveChanges = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await setDoc(doc(db, 'milestones', user.uid), {
        completed: completedMilestones,
        userId: user.uid,
        lastUpdated: new Date().toISOString(),
      });
      toast({
        title: 'Milestones Saved',
        description: 'Your progress has been updated.',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save changes.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentGroupIndex < totalGroups) {
      setCurrentGroupIndex((prev) => prev + 1);
    } else {
      handleSaveChanges();
    }
  };

  const handlePrevious = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex((prev) => prev - 1);
    }
  };

  const handleStartTracking = () => {
    setIsTracking(true);
  };

  if (isFetching && isTracking) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {!isTracking ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-700" />
              Developmental Milestones & Listening Observation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-blue-700 space-y-2">
                <p>Please review the behaviours listed under the age range that corresponds to your child’s current age.</p>
                <ul className="list-disc list-inside pl-4">
                    <li>If your child is 4 months old, check milestones under the 4–6 months section.</li>
                    <li>If your child is 12 months (1 year), review the 10–13 months section.</li>
                </ul>
                <p>If your child is not consistently achieving the age-appropriate behaviours, please refer to the previous age range and continue tracking. This will help you determine the actual age at which each milestone is achieved.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartTracking}>Start Tracking</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Auditory Milestones</CardTitle>
            <CardDescription>
              Track the infant's progress by checking off observed auditory
              milestones.
            </CardDescription>
            <div className="pt-4 space-y-2">
                <Progress value={stepProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                    Step {currentGroupIndex + 1} of {totalGroups + 1}
                </p>
            </div>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {currentGroupIndex < totalGroups ? (
                <div key={currentGroup.ageGroup}>
                    <h3 className="text-lg font-medium text-primary mb-4">{currentGroup.ageGroup}</h3>
                    <div className="space-y-4 pl-2">
                    {currentGroup.milestones.map((milestone) => (
                        <div key={milestone} className="flex items-center space-x-3">
                        <Checkbox
                            id={milestone}
                            checked={completedMilestones.includes(milestone)}
                            onCheckedChange={() => handleToggleMilestone(milestone)}
                        />
                        <Label
                            htmlFor={milestone}
                            className="text-sm font-normal leading-snug text-muted-foreground"
                        >
                            {milestone}
                        </Label>
                        </div>
                    ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg font-medium text-primary mb-4">Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Overall Progress</span>
                            <span>{completedMilestones.length} / {totalMilestones} completed</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                    <p className="text-muted-foreground text-sm mt-4">
                        You have reviewed all milestone categories. Click the button below to save your progress.
                    </p>
                </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
                {currentGroupIndex < totalGroups ? (
                <>
                    <Button type="button" variant="outline" onClick={handlePrevious} disabled={isLoading || currentGroupIndex === 0}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <Button type="button" onClick={handleNext} disabled={isLoading}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </>
                ) : (
                <div className="w-full flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevious} disabled={isLoading}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                    </Button>
                    <Button onClick={handleSaveChanges} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Progress
                    </Button>
                </div>
                )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
