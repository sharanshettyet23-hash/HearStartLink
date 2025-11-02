'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AUDITORY_MILESTONES } from '@/lib/constants';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function ChecklistPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const totalMilestones = AUDITORY_MILESTONES.reduce((sum, group) => sum + group.milestones.length, 0);
  const progress = totalMilestones > 0 ? (completedMilestones.length / totalMilestones) * 100 : 0;

  const fetchChecklistData = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const docRef = doc(db, 'checklists', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCompletedMilestones(docSnap.data().completed ?? []);
      }
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load checklist data.' });
    } finally {
      setIsFetching(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchChecklistData();
  }, [fetchChecklistData]);
  
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
      await setDoc(doc(db, 'checklists', user.uid), {
        completed: completedMilestones,
        userId: user.uid,
        lastUpdated: new Date().toISOString(),
      });
      toast({ title: 'Checklist Saved', description: 'Your progress has been updated.' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save changes.' });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return <div className="flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Auditory Behavioural Checklist</CardTitle>
        <CardDescription>
          Track the infant's progress by checking off observed auditory milestones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{completedMilestones.length} / {totalMilestones} completed</span>
                </div>
                <Progress value={progress} />
            </div>

            <Accordion type="multiple" defaultValue={AUDITORY_MILESTONES.map(g => g.ageGroup)}>
            {AUDITORY_MILESTONES.map((group) => (
                <AccordionItem value={group.ageGroup} key={group.ageGroup}>
                <AccordionTrigger className="text-lg font-medium">
                    {group.ageGroup}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 pl-2">
                    {group.milestones.map((milestone) => (
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
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
            <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Progress
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
