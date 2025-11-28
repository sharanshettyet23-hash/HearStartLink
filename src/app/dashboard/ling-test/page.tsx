'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LING_SIX_SOUNDS } from '@/lib/constants';
import { Volume2, Loader2, Save } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAudio } from '@/lib/actions';

const lingTestSchema = z.object({
  observations: z.string().optional(),
});

type LingTestFormValues = z.infer<typeof lingTestSchema>;

export default function LingTestPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [audioCache, setAudioCache] = useState<Record<string, string>>({});
  const [isSoundLoading, setIsSoundLoading] = useState<string | null>(null);

  const form = useForm<LingTestFormValues>({
    resolver: zodResolver(lingTestSchema),
    defaultValues: { observations: '' },
  });
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchTestData = useCallback(async () => {
    if (!user) return;
    setIsFetching(true);
    try {
      const docRef = doc(db, 'ling_tests', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        form.reset(docSnap.data());
      }
    } catch (error) {
       toast({ variant: 'destructive', title: 'Error', description: 'Failed to load previous test data.' });
    } finally {
      setIsFetching(false);
    }
  }, [user, form, toast]);

  useEffect(() => {
    fetchTestData();
  }, [fetchTestData]);
  
  const playSound = async (sound: string) => {
    if (!isClient) return;
    
    // Use AI-generated sound if available in cache
    if (audioCache[sound]) {
      const audio = new Audio(audioCache[sound]);
      audio.play();
      return;
    }

    setIsSoundLoading(sound);
    try {
      // Use the 'as in' description for a clearer TTS prompt
      const soundInfo = LING_SIX_SOUNDS.find(s => s.sound === sound);
      const prompt = `The sound ${sound}, as in ${soundInfo?.description.split('"')[1]}`;
      
      const result = await getAudio(prompt);
      if (result.success && result.media) {
        setAudioCache(prev => ({...prev, [sound]: result.media!}));
        const audio = new Audio(result.media);
        audio.play();
      } else {
         toast({ variant: 'destructive', title: 'Audio Error', description: 'Could not play sound.' });
      }
    } catch (error) {
       toast({ variant: 'destructive', title: 'Audio Error', description: 'Could not play sound.' });
    } finally {
      setIsSoundLoading(null);
    }
  };


  async function onSubmit(values: LingTestFormValues) {
    if (!user) return;
    setIsLoading(true);
    try {
      await setDoc(doc(db, 'ling_tests', user.uid), {
        ...values,
        userId: user.uid,
        testDate: new Date().toISOString(),
      }, { merge: true });
      toast({ title: 'Observations Saved', description: 'Your notes for this test have been saved.' });
    } catch (error) {
       toast({ variant: 'destructive', title: 'Error', description: 'Failed to save observations.' });
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
        <CardTitle>Ling Six Sound Test</CardTitle>
        <CardDescription>
          Play each sound and observe the infant's reaction. Note any responses, such as turning their head, quieting, or vocalizing.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LING_SIX_SOUNDS.map(({ sound, ipa, description }) => (
                <Card key={sound} className="flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-4xl font-bold font-mono text-primary">{sound}</p>
                  <p className="text-sm text-muted-foreground">{ipa}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                  <Button variant="ghost" size="icon" onClick={() => playSound(sound)} className="mt-4" disabled={!isClient || isSoundLoading !== null}>
                    {isSoundLoading === sound ? <Loader2 className="h-6 w-6 animate-spin" /> : <Volume2 className="h-6 w-6" />}
                  </Button>
                </Card>
              ))}
            </div>

            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observations</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Infant turned head towards 'a' sound. No response to 's'."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Observations
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
