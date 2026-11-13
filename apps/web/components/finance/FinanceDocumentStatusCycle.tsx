import { Badge } from '@repo/ui';
import { Check, ChevronLeft } from 'lucide-react';

type Counts = { draft: number; sent: number; approved: number; posted: number };

export function FinanceDocumentStatusCycle({ counts }: { counts?: Counts }) {
  const STEPS = [
    { key: 'draft', label: 'پیش‌نویس', count: String(counts?.draft ?? 2), variant: 'secondary' as const },
    { key: 'sent', label: 'ارسال‌شده', count: String(counts?.sent ?? 2), variant: 'outline' as const, warn: true },
    { key: 'approved', label: 'تأییدشده', count: String(counts?.approved ?? 0), variant: 'outline' as const, info: true },
    {
      key: 'posted',
      label: 'ثبت قطعی',
      count: new Intl.NumberFormat('fa-IR').format(counts?.posted ?? 2455),
      variant: 'default' as const,
      done: true,
    },
    { key: 'returned', label: 'برگشت‌خورده', count: '—', variant: 'secondary' as const },
  ];
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">چرخهٔ وضعیت سند</h3>
      <div className="overflow-x-auto pb-2">
        <div
          className="relative grid min-w-[520px] grid-cols-5 gap-2"
          role="list"
          aria-label="مراحل وضعیت سند حسابداری"
        >
          <span
            aria-hidden
            className="absolute top-[11px] right-[10%] h-0.5 w-[60%] rounded bg-border"
          />
          <span
            aria-hidden
            className="absolute top-[11px] right-[70%] h-0 w-[20%] border-t-2 border-dashed border-muted-foreground/40"
          />
          {STEPS.map((s) => (
            <div key={s.key} role="listitem" className="relative flex flex-col items-center gap-1.5 text-center">
              <span
                className={
                  s.done
                    ? 'flex size-[22px] items-center justify-center rounded-full bg-emerald-600 text-white'
                    : 'flex size-[22px] items-center justify-center rounded-full border-2 border-muted bg-card'
                }
              >
                {s.done ? <Check className="size-3.5" /> : s.key === 'returned' ? <ChevronLeft className="size-3.5 text-muted-foreground" /> : <span className="size-2 rounded-full bg-muted-foreground/50" />}
              </span>
              <Badge variant={s.variant} className={s.done ? 'bg-emerald-600 hover:bg-emerald-600' : undefined}>
                {s.label}
              </Badge>
              <span className="text-xs text-muted-foreground tabular-nums">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="border-t border-dashed pt-2 text-xs leading-relaxed text-muted-foreground">
        سند «ثبت‌شده» تغییرناپذیر است؛ اصلاح فقط با سند برگشتی انجام می‌شود.
      </p>
    </div>
  );
}
