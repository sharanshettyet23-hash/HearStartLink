'use client';

import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  emoji?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  emoji = '🌟',
}: EmptyStateProps) {
  return (
    <Card className="border-2 border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="mb-6 relative">
          <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
            {emoji}
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full">
            <Icon className="h-16 w-16 text-primary" />
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-2 text-foreground">
          {title}
        </h3>

        <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
          {description}
        </p>

        {actionLabel && onAction && (
          <Button onClick={onAction} size="lg" className="shadow-lg">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
