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
  Info,
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
import { Separator } from '@/components/ui/separator';
import { LingSoundButton } from '@/components/ui/ling-sound-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const lingTestSchema = z.object({
  observations: z.string().optional(),
});

type LingTestFormValues = z.infer<typeof lingTestSchema>;

const iconMap: { [key: string]: React.ElementType } = {
  BellRing,
  ToyBrick,
  Hand,
};

// A single Audio instance, shared across all sound button components on this page.
const audioPlayer = typeof window !== 'undefined' ? new Audio() : null;

export default function LingTestPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
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
  
  useEffect(() => {
    if (!audioPlayer) return;

    const handleEnd = () => {
      setIsSoundLoading(null);
    };

    audioPlayer.addEventListener('ended', handleEnd);
    audioPlayer.addEventListener('pause', handleEnd);

    return () => {
      audioPlayer.removeEventListener('ended', handleEnd);
      audioPlayer.removeEventListener('pause', handleEnd);
    };
  }, []);

  const playEnvironmentalSound = (soundName: string) => {
    if (!isClient || !audioPlayer) return;

    const sound = ENVIRONMENTAL_SOUNDS.find(s => s.name === soundName);

    if (!sound) {
      toast({
        variant: 'destructive',
        title: 'Audio Error',
        description: `Unknown sound: ${soundName}.`,
      });
      return;
    }

    const audioSrc = sound.src;

    const isThisSoundPlaying = !audioPlayer.paused && audioPlayer.src.includes(audioSrc);

    if (isThisSoundPlaying) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    } else {
      if (!audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
      
      audioPlayer.src = audioSrc;
      setIsSoundLoading(soundName);
      audioPlayer.play().catch(err => {
        console.error("Error playing audio:", err);
        toast({
          variant: 'destructive',
          title: 'Audio Error',
          description: `Failed to play ${soundName}. Make sure the audio file is at ${audioSrc}.`,
        });
        setIsSoundLoading(null);
      });
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
        <Alert className="mt-4 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-700" />
            <AlertTitle className="font-bold text-blue-800">Important Instructions</AlertTitle>
            <AlertDescription className="text-blue-700">
                <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>Observe any type of behavioural response from the child such as eye widening, head turning, pausing activity, smiling, or changes in facial expression.</li>
                    <li>Perform the test in a quiet, noise-free environment.</li>
                    <li>Use a good-quality loudspeaker, mobile phone, or similar device that produces clear sound at an appropriate volume.</li>
                    <li>Do not be concerned if a response is not observed immediately, as behavioural listening responses in infants can be subtle and difficult to observe.</li>
                    <li>If responses are consistently absent or there are concerns about the child’s hearing, advise consulting a nearby audiologist for a detailed hearing evaluation.</li>
                </ul>
            </AlertDescription>
        </Alert>
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
                  <div className="mt-4">
                    <LingSoundButton
                      sound={sound as 'a' | 'u' | 'i' | 'm' | 's' | 'sh'}
                    />
                  </div>
                </Card>
              ))}
            </div>

            <Separator />
            <h3 className="text-lg font-medium text-primary">
              Environmental Sounds
            </h3>

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
                      disabled={!isClient || (isSoundLoading !== null && isSoundLoading !== name)}
                    >
                      {isSoundLoading === name ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <Volume2 className="h-6 w-6" />
                      )}
                    </Button>
                  </Card>
                );
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
