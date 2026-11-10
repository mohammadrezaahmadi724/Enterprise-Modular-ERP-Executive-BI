import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export function PricingCard({
  title,
  price,
  highlighted,
  children,
  cta,
}: {
  title: string;
  price: string;
  highlighted?: boolean;
  children: ReactNode;
  cta: ReactNode;
}) {
  return (
    <div className={cn('rounded-2xl border p-6', highlighted && 'border-primary shadow-[var(--shadow-card)]')}>
      {highlighted && <span className="text-xs text-primary">پرفروش‌ترین ⭐</span>}
      <h3 className="text-lg font-bold mt-1">{title}</h3>
      <p className="text-2xl font-bold my-3">{price}</p>
      <ul className="text-sm space-y-2 text-muted-foreground mb-4">{children}</ul>
      {cta}
    </div>
  );
}
