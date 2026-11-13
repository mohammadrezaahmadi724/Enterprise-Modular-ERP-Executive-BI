'use client';

import { useMemo, useState } from 'react';
import { Badge, Card, CardContent } from '@repo/ui';
import { DEMO_JOURNALS } from '../../lib/finance-demo-data';
import { cn } from '@repo/ui';

const FILTERS = ['همه اسناد', 'پیش‌نویس', 'ارسال شده', 'تأیید شده', 'ثبت قطعی'] as const;

export function FinanceJournalMasterDetail() {
  const [selectedId, setSelectedId] = useState(DEMO_JOURNALS[0]?.id ?? '');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('همه اسناد');

  const selected = useMemo(() => DEMO_JOURNALS.find((j) => j.id === selectedId) ?? DEMO_JOURNALS[0], [selectedId]);

  const list = useMemo(() => {
    if (filter === 'همه اسناد') return DEMO_JOURNALS;
    if (filter === 'ثبت قطعی') return DEMO_JOURNALS.filter((j) => j.status === 'ثبت قطعی');
    return DEMO_JOURNALS.filter((j) => j.status !== 'ثبت قطعی');
  }, [filter]);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(260px,320px)_1fr]">
      <Card className="finance-aging-card">
        <CardContent className="p-3 space-y-3">
          <div className="flex flex-wrap gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={cn('rounded-md px-2 py-1 text-[11px] border', filter === f && 'bg-muted font-semibold')}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            className="w-full rounded-md border bg-background px-2 py-1.5 text-xs"
            placeholder="جست‌وجوی شماره سند..."
          />
          <ul className="max-h-[420px] space-y-1 overflow-y-auto text-sm">
            {list.map((j) => (
              <li key={j.id}>
                <button
                  type="button"
                  className={cn(
                    'w-full rounded-lg border px-2 py-2 text-right transition-colors',
                    j.id === selected?.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50',
                  )}
                  onClick={() => setSelectedId(j.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-semibold">{j.number}</span>
                    <Badge className="bg-emerald-600/90 text-[10px]">{j.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{j.date}</div>
                  <div className="text-xs tabular-nums mt-0.5">{j.debit} تومان</div>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="finance-aging-card min-h-[420px]">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold">
                سند {selected?.number} — {selected?.status}
              </h2>
              <p className="text-sm text-muted-foreground">{selected?.description}</p>
            </div>
            <Badge variant="outline">دفتر قانونی</Badge>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div>
              <span className="text-muted-foreground">تاریخ سند</span>
              <p className="font-medium">{selected?.date}</p>
            </div>
            <div>
              <span className="text-muted-foreground">نوع سند</span>
              <p className="font-medium">سند روزنامه عمومی</p>
            </div>
            <div>
              <span className="text-muted-foreground">شماره رسمی</span>
              <p className="font-mono">{selected?.number}</p>
            </div>
            <div>
              <span className="text-muted-foreground">منبع</span>
              <p>دستی</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-2 text-right">ردیف</th>
                  <th className="py-2 text-right">حساب</th>
                  <th className="py-2 text-right">شرح</th>
                  <th className="py-2 text-left">بدهکار</th>
                  <th className="py-2 text-left">بستانکار</th>
                </tr>
              </thead>
              <tbody>
                {selected?.lines.map((ln, i) => (
                  <tr key={i} className="border-b border-dashed">
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">
                      <span className="font-mono">{ln.account}</span>
                      <span className="block text-xs text-muted-foreground">{ln.accountName}</span>
                    </td>
                    <td className="py-2">{ln.desc}</td>
                    <td className="py-2 text-left text-rose-600 tabular-nums">{ln.debit !== '۰' ? ln.debit : '—'}</td>
                    <td className="py-2 text-left text-emerald-600 tabular-nums">{ln.credit !== '۰' ? ln.credit : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-sm">
            <span>جمع سند</span>
            <span className="font-semibold tabular-nums">{selected?.debit} تومان</span>
            <Badge className="bg-emerald-600">سند تراز است ✓</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
