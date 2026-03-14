'use client';

import { cn } from '@/lib/utils';

interface SoundCharacterProps {
  sound: 'a' | 'u' | 'i' | 'm' | 's' | 'sh';
  className?: string;
}

const characterMap: Record<string, { emoji: string; color: string; bgColor: string }> = {
  a: { emoji: '🦁', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  u: { emoji: '🐄', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  i: { emoji: '🐭', color: 'text-pink-600', bgColor: 'bg-pink-100' },
  m: { emoji: '🐻', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  s: { emoji: '🐍', color: 'text-green-600', bgColor: 'bg-green-100' },
  sh: { emoji: '🤫', color: 'text-blue-600', bgColor: 'bg-blue-100' },
};

export function SoundCharacter({ sound, className }: SoundCharacterProps) {
  const character = characterMap[sound] || characterMap['a'];

  return (
    <div
      className={cn(
        'relative w-24 h-24 rounded-full flex items-center justify-center transition-transform',
        character.bgColor,
        className
      )}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
      <span className="text-5xl relative z-10" role="img" aria-label={`${sound} sound character`}>
        {character.emoji}
      </span>
    </div>
  );
}
