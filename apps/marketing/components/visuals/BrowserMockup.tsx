import type { ReactNode } from 'react';

export function BrowserMockup({ children, title = 'ERP BI' }: { children: ReactNode; title?: string }) {
  return (
    <div className="rounded-xl border bg-card shadow-2xl overflow-hidden" dir="ltr">
      <div className="flex items-center gap-2 border-b px-3 py-2 bg-muted/50 text-xs text-muted-foreground">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="mr-auto font-mono">{title}</span>
      </div>
      <div className="p-4 bg-slate-950 text-slate-100 min-h-[200px]">{children}</div>
    </div>
  );
}
