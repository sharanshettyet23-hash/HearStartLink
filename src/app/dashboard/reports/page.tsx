'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Loader2, User, Baby, ShieldCheck, Milestone, Mic, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ReportPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reportData, setReportData] = useState<{ [key: string]: DocumentData | null }>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchReportData = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const collections = {
        profile: 'infant_profiles',
        screening: 'screenings',
        milestones: 'milestones',
        lingTest: 'ling_tests',
      };

      const promises = Object.entries(collections).map(async ([key, collectionName]) => {
        const docRef = doc(db, collectionName, user.uid);
        const docSnap = await getDoc(docRef);
        return { [key]: docSnap.exists() ? docSnap.data() : null };
      });

      const results = await Promise.all(promises);
      const data = results.reduce((acc, current) => ({ ...acc, ...current }), {});
      setReportData(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load the report data.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Generating Report...</p>
      </div>
    );
  }

  const { profile, screening, milestones, lingTest } = reportData;

  return (
    <div className="space-y-6">
       <Card>
          <CardHeader>
            <CardTitle>Comprehensive Infant Hearing Report</CardTitle>
            <CardDescription>A complete summary of all recorded information.</CardDescription>
          </CardHeader>
        </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Baby /> Infant Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile ? (
              <>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Date of Birth:</strong> {profile.dob ? format(new Date(profile.dob), 'PPP') : 'N/A'}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                 <Separator className="my-4" />
                <p><strong>Guardian:</strong> {profile.guardianName}</p>
                <p><strong>Contact:</strong> {profile.guardianContact}</p>
              </>
            ) : <p className="text-muted-foreground">No profile data available.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck /> Screening & Risks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
             {screening ? (
              <>
                <div className="flex items-center gap-2">
                  <strong>Status:</strong> <Badge variant={screening.screeningStatus === 'Passed' ? 'default' : 'destructive'}>{screening.screeningStatus || 'N/A'}</Badge>
                </div>
                <div>
                  <strong>High-Risk Factors:</strong>
                  {screening.riskFactors && screening.riskFactors.length > 0 ? (
                    <ul className="list-disc pl-5 mt-1 text-sm">
                      {screening.riskFactors.map((factor: string) => <li key={factor}>{factor}</li>)}
                    </ul>
                  ) : <p className="text-sm text-muted-foreground">No risk factors identified.</p>}
                </div>
                 <Separator className="my-4" />
                <div>
                    <strong>AI Recommendation:</strong>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{screening.recommendations || 'No recommendations generated yet.'}</p>
                </div>
              </>
            ) : <p className="text-muted-foreground">No screening data available.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Milestone /> Auditory Milestones</CardTitle>
          </CardHeader>
          <CardContent>
             {milestones && milestones.completed?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {milestones.completed.map((milestone: string) => <li key={milestone}>{milestone}</li>)}
                </ul>
              ) : <p className="text-muted-foreground">No completed milestones recorded.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mic /> Ling-6 Sound Test</CardTitle>
          </CardHeader>
          <CardContent>
            {lingTest ? (
              <>
                <p><strong>Test Date:</strong> {lingTest.testDate ? format(new Date(lingTest.testDate), 'PPP') : 'N/A'}</p>
                <div>
                  <strong>Observations:</strong>
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{lingTest.observations || 'No observations recorded.'}</p>
                </div>
              </>
            ) : <p className="text-muted-foreground">No Ling-6 test data available.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
