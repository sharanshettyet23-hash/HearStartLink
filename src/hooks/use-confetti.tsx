'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti() {
  const celebrate = useCallback((origin?: { x: number; y: number }) => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#3b82f6', '#ec4899', '#8b5cf6', '#fbbf24', '#10b981'],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['circle', 'square'],
        origin: origin || { x: Math.random(), y: Math.random() - 0.2 },
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle'],
        origin: origin || { x: Math.random(), y: Math.random() - 0.2 },
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);

  const quickCelebrate = useCallback((element?: HTMLElement) => {
    const rect = element?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: ['#3b82f6', '#ec4899', '#8b5cf6', '#fbbf24', '#10b981'],
    });
  }, []);

  return { celebrate, quickCelebrate };
}
