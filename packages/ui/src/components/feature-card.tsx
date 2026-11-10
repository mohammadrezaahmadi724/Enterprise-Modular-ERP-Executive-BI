import type { ReactNode } from 'react';

export function FeatureCard({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border p-4 transition-shadow hover:shadow-[var(--shadow-soft)]">
      <div className="mb-2 text-primary">{icon}</div>
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
    </div>
  );
}
