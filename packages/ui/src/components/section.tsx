import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function Section({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn('py-[var(--section-py)]', className)}>
      {children}
    </section>
  );
}
