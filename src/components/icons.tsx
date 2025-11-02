import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn('text-character', props.className)}
    >
      <path d="M6 16.5a8.5 8.5 0 1 1 12 0c0 2.5-2 4.5-4 4.5-1.5 0-2.5-1-4-1s-2.5 1-4 1c-2 0-4-2-4-4.5Z" />
      <path d="M12 7.5v0" />
      <path d="M12 12v0" />
      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

export function EarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 8.5a6.5 6.5 0 1 1 12 0c0 4.5-3 8-6 8s-6-3.5-6-8Z" />
      <path d="M12 10.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
      <path d="M10 10.5c0 1.5-1.5 2-1.5 3S10 15 10 15" />
    </svg>
  );
}
