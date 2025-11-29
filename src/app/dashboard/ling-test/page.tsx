'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LING_SIX_SOUNDS, ENVIRONMENTAL_SOUNDS } from '@/lib/constants';
import {
  Volume2,
  Loader2,
  Save,
  BellRing,
  ToyBrick,
  Hand,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAudio } from '@/lib/actions';
import { Separator } from '@/components/ui/separator';
import * as Tone from 'tone';

const lingTestSchema = z.object({
  observations: z.string().optional(),
});

type LingTestFormValues = z.infer<typeof lingTestSchema>;

const iconMap: { [key: string]: React.ElementType } = {
  BellRing,
  ToyBrick,
  Hand,
};

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
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load previous test data.',
      });
    } finally {
      setIsFetching(false);
    }
  }, [user, form, toast]);

  useEffect(() => {
    fetchTestData();
  }, [fetchTestData]);

  const playEnvironmentalSound = async (soundName: string) => {
    if (!isClient) return;

    if (audioCache[soundName]) {
      const audio = new Audio(audioCache[soundName]);
      audio.play();
      return;
    }
    
    setIsSoundLoading(soundName);

    try {
      // Simple local sound generation with Tone.js
      let synth;
      if (soundName === 'Bell') {
        synth = new Tone.MetalSynth({
          frequency: 300,
          envelope: { attack: 0.001, decay: 0.4, release: 0.2 },
          harmonicity: 5.1,
          modulationIndex: 32,
          resonance: 4000,
          octaves: 1.5,
        }).toDestination();
        synth.triggerAttackRelease('C4', '8n');
      } else if (soundName === 'Rattle') {
        synth = new Tone.NoiseSynth({
          noise: { type: 'white' },
          envelope: { attack: 0.005, decay: 0.1, sustain: 0 },
        }).toDestination();
        synth.triggerAttackRelease('4n');
      } else if (soundName === 'Claps') {
        synth = new Tone.MembraneSynth({
          pitchDecay: 0.01,
          octaves: 10,
          oscillator: { type: 'whitenoise' },
          envelope: {
            attack: 0.005,
            decay: 0.25,
            sustain: 0.01,
            release: 1.4,
            attackCurve: 'exponential',
          },
        }).toDestination();
        synth.triggerAttackRelease('C2', '8n');
      }
       // We don't cache Tone.js sounds as they are generated on the fly.
    } catch(error) {
       toast({
        variant: 'destructive',
        title: 'Audio Error',
        description: 'Could not play environmental sound.',
      });
    } finally {
        // Add a small delay to allow the sound to play
        setTimeout(() => setIsSoundLoading(null), 300);
    }
  };


  const playLingSound = async (sound: string) => {
    if (!isClient) return;

    if (audioCache[sound]) {
      const audio = new Audio(audioCache[sound]);
      audio.play();
      return;
    }

    setIsSoundLoading(sound);
    try {
      const soundInfo = LING_SIX_SOUNDS.find((s) => s.sound === sound);
      if (!soundInfo) return;

      let prompt = `the sound "${sound}"`;
      if (['a', 'i', 'u'].includes(sound)) {
        prompt = `Produce the sound ${soundInfo.ipa}`;
      }
      
      const result = await getAudio(prompt);
      if (result.success && result.media) {
        setAudioCache((prev) => ({ ...prev, [sound]: result.media! }));
        const audio = new Audio(result.media);
        audio.play();
      } else {
        toast({
          variant: 'destructive',
          title: 'Audio Error',
          description: 'Could not play sound.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Audio Error',
        description: 'Could not play sound.',
      });
    } finally {
      setIsSoundLoading(null);
    }
  };

  async function onSubmit(values: LingTestFormValues) {
    if (!user) return;
    setIsLoading(true);
    try {
      await setDoc(
        doc(db, 'ling_tests', user.uid),
        {
          ...values,
          userId: user.uid,
          testDate: new Date().toISOString(),
        },
        { merge: true }
      );
      toast({
        title: 'Observations Saved',
        description: 'Your notes for this test have been saved.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save observations.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ling Six Sound and Environmental Sound Test</CardTitle>
        <CardDescription>
          Play each sound and observe the infant's reaction. Note any
          responses, such as turning their head, quieting, or vocalizing.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
             <h3 className="text-lg font-medium text-primary">Ling-6 Sounds</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LING_SIX_SOUNDS.map(({ sound, ipa, description }) => (
                <Card
                  key={sound}
                  className="flex flex-col items-center justify-center p-4 text-center"
                >
                  <p className="text-4xl font-bold font-mono text-primary">
                    {sound}
                  </p>
                  <p className="text-sm text-muted-foreground">{ipa}</p>
                  <p className="text-xs text-muted-foreground">
                    {description}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playLingSound(sound)}
                    className="mt-4"
                    disabled={!isClient || isSoundLoading !== null}
                  >
                    {isSoundLoading === sound ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Volume2 className="h-6 w-6" />
                    )}
                  </Button>
                </Card>
              ))}
            </div>

            <Separator />
             <h3 className="text-lg font-medium text-primary">Environmental Sounds</h3>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ENVIRONMENTAL_SOUNDS.map(({ name, icon }) => {
                 const Icon = iconMap[icon];
                return (
                <Card
                  key={name}
                  className="flex flex-col items-center justify-center p-4 text-center"
                >
                  <Icon className="h-10 w-10 text-primary" />
                  <p className="text-lg font-medium mt-2">{name}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => playEnvironmentalSound(name)}
                    className="mt-4"
                    disabled={!isClient || isSoundLoading !== null}
                  >
                    {isSoundLoading === name ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Volume2 className="h-6 w-6" />
                    )}
                  </Button>
                </Card>
                )
              })}
            </div>

            <Separator />

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
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Observations
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
