import type { ReactNode } from 'react';

export function BrowserMockup({ children, title = 'ERP' }: { children: ReactNode; title?: string }) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-[var(--shadow-elevated)]" dir="ltr">
      <div className="flex items-center gap-2 border-b px-3 py-2 bg-muted/50 text-xs text-muted-foreground">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="mr-auto font-mono truncate">{title}</span>
      </div>
      <div className="p-4 min-h-[12rem]">{children}</div>
    </div>
  );
}
