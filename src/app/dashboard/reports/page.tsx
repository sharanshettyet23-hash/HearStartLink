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
import { Loader2, Baby, ShieldCheck, ListChecks, Ear, AlertTriangle, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { motion } from 'framer-motion';

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

  const reportCards = [
    { key: 'header', delay: 0 },
    { key: 'profile', delay: 0.1 },
    { key: 'screening', delay: 0.2 },
    { key: 'milestones', delay: 0.3 },
    { key: 'ling', delay: 0.4 },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 bg-gradient-to-r from-primary/5 to-indigo-500/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Comprehensive Infant Hearing Report</CardTitle>
                <CardDescription>A complete summary of all recorded information.</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Infant Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-sky-500/10">
              <Baby className="h-5 w-5 text-sky-500" />
            </div>
            Infant Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium w-1/3">Name</TableCell>
                  <TableCell>{profile.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Date of Birth</TableCell>
                  <TableCell>{profile.dob ? format(new Date(profile.dob), 'PPP') : 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gender</TableCell>
                  <TableCell>{profile.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Guardian</TableCell>
                  <TableCell>{profile.guardianName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Contact</TableCell>
                  <TableCell>{profile.guardianContact}</TableCell>
                </TableRow>
                {profile.address && (
                  <TableRow>
                    <TableCell className="font-medium">Address</TableCell>
                    <TableCell>{profile.address}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-sm">No profile data available.</p>
          )}
        </CardContent>
      </Card>
      </motion.div>

      {/* Screening & Risk Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-teal-500/10">
              <ShieldCheck className="h-5 w-5 text-teal-500" />
            </div>
            Screening Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {screening ? (
            <>
              <div className="flex items-center gap-3">
                <span className="font-medium">Status:</span>
                <Badge
                  variant={screening.screeningStatus === 'Passed' ? 'default' : 'destructive'}
                  className="text-sm"
                >
                  {screening.screeningStatus || 'N/A'}
                </Badge>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium mb-2">Identified Risk Factors</h4>
                {screening.riskFactors && screening.riskFactors.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {screening.riskFactors.map((factor: string) => (
                      <li key={factor} dangerouslySetInnerHTML={{ __html: factor }} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No risk factors identified.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No screening data available.</p>
          )}
        </CardContent>
      </Card>
      </motion.div>

      {/* Auditory Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-amber-500/10">
              <ListChecks className="h-5 w-5 text-amber-500" />
            </div>
            Completed Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          {milestones && milestones.completed?.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-3">
                {milestones.completed.length} milestone{milestones.completed.length !== 1 ? 's' : ''} achieved
              </p>
              <ul className="space-y-2">
                {milestones.completed.map((milestone: string) => (
                  <li key={milestone} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No completed milestones recorded.</p>
          )}
        </CardContent>
      </Card>
      </motion.div>

      {/* Ling-6 Sound Test */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-lg bg-indigo-500/10">
              <Ear className="h-5 w-5 text-indigo-500" />
            </div>
            Ling-6 Sound Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lingTest ? (
            <>
              <div className="flex items-center gap-3">
                <span className="font-medium">Test Date:</span>
                <span className="text-sm">{lingTest.testDate ? format(new Date(lingTest.testDate), 'PPP') : 'N/A'}</span>
              </div>
              {lingTest.responses && Object.keys(lingTest.responses).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Sound Responses</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(lingTest.responses).map(([sound, response]) => (
                        <div
                          key={sound}
                          className={`flex items-center gap-2 rounded-md border p-2.5 text-sm ${
                            response === 'yes'
                              ? 'border-green-200 bg-green-50'
                              : 'border-red-200 bg-red-50'
                          }`}
                        >
                          {response === 'yes' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600 shrink-0" />
                          )}
                          <span className="font-medium">{sound}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {lingTest.observations && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-1">Observations</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{lingTest.observations}</p>
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No Ling-6 test data available.</p>
          )}
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
