import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn('bg-clip-text text-transparent', className)}
      style={{ backgroundImage: 'var(--gradient-cta)' }}
    >
      {children}
    </span>
  );
}
