'use client';

import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// A single Audio instance, shared across all LingSoundButton components.
// This ensures that only one sound can be played at a time.
const audioPlayer = typeof window !== 'undefined' ? new Audio() : null;

interface LingSoundButtonProps {
  sound: 'a' | 'u' | 'i' | 'm' | 's' | 'sh';
}

export function LingSoundButton({ sound }: LingSoundButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const correctedSound = sound === 'u' ? 'o' : sound;
  const audioSrc = `/audio/ling6/${correctedSound}.mp3`;

  // This effect manages the playing state by listening to the shared audio player.
  useEffect(() => {
    if (!audioPlayer) return;

    const handlePlay = () => {
      // If the audio player's source is this button's sound, set playing to true.
      if (audioPlayer.src.endsWith(audioSrc)) {
        setIsPlaying(true);
      } else {
        // Otherwise, another sound is playing, so this button is not active.
        setIsPlaying(false);
      }
    };

    const handleEnd = () => {
      setIsPlaying(false);
    };

    // Add event listeners
    audioPlayer.addEventListener('play', handlePlay);
    audioPlayer.addEventListener('pause', handleEnd); // Covers both pause and natural end
    audioPlayer.addEventListener('ended', handleEnd);

    // Cleanup listeners on component unmount
    return () => {
      audioPlayer.removeEventListener('play', handlePlay);
      audioPlayer.removeEventListener('pause', handleEnd);
      audioPlayer.removeEventListener('ended', handleEnd);
    };
  }, [audioSrc]); // Dependency array ensures the correct src is in the closure.

  const playSound = () => {
    if (!audioPlayer) return;

    const isThisSoundPlaying = !audioPlayer.paused && audioPlayer.src.endsWith(audioSrc);

    // If this specific sound is already playing, stop it.
    if (isThisSoundPlaying) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    } else {
      // Stop any currently playing sound before starting a new one.
      if (!audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
      
      // Set the source and play the new sound.
      audioPlayer.src = audioSrc;
      audioPlayer.play().catch(err => {
        console.error("Error playing audio:", err);
        setIsPlaying(false); // Ensure state is reset on playback error
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={playSound}
      aria-label={`Play sound ${sound}`}
    >
      <Volume2 className={cn('h-6 w-6', isPlaying && 'text-primary animate-pulse')} />
    </Button>
  );
}
