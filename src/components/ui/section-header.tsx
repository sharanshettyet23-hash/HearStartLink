'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  gradient?: string;
  iconColor?: string;
  className?: string;
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  gradient = 'from-blue-500/10 to-purple-500/10',
  iconColor = 'text-blue-600',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <div className={cn(
        'inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r',
        gradient,
        'border-2 border-primary/10'
      )}>
        {Icon && (
          <div className="p-2 bg-white rounded-full shadow-sm">
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
