'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { TrendingUp } from 'lucide-react';
import {
  AP_AGING_BUCKETS,
  AP_AGING_TOTAL,
  AP_AS_OF_JALALI,
  AP_AS_OF_LABEL,
  formatPct,
  formatToman,
} from '../../lib/finance-payables-demo';

export function FinancePayablesAging() {
  const ariaLabel = AP_AGING_BUCKETS.map((b) => `${b.label} ${formatPct(b.pct)}٪`).join('، ');

  return (
    <Card className="finance-aging-card">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <TrendingUp className="size-4" />
          </span>
          <div>
            <CardTitle className="text-base">سنی بدهی‌ها</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              مانده بر اساس روزهای گذشته از سررسید تا {AP_AS_OF_LABEL} · {formatToman(AP_AGING_TOTAL.amountToman)}{' '}
              تومان · {formatToman(AP_AGING_TOTAL.itemCount)} قلم
            </p>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
          سن بدهی تا تاریخ
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm text-foreground"
          >
            <span className="tabular-nums">{AP_AS_OF_JALALI}</span>
            <span aria-hidden>📅</span>
          </button>
        </label>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex gap-0.5 h-3.5 rounded overflow-hidden" role="img" aria-label={`سنی بدهی‌ها: ${ariaLabel}`}>
          {AP_AGING_BUCKETS.map((b) => (
            <span
              key={b.key}
              className={`${b.colorClass} min-w-1 rounded-sm`}
              style={{ flex: `${b.barFlex} 1 0` }}
              title={b.label}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {AP_AGING_BUCKETS.map((b) => (
            <div key={b.key} className="flex flex-col gap-1 rounded-xl bg-muted/50 px-2.5 py-2">
              <span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                <span className={`size-2 rounded-sm ${b.colorClass}`} />
                {b.label}
              </span>
              <span className="text-[15px] font-bold tabular-nums">{formatToman(b.amountToman)}</span>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {formatPct(b.pct)}٪ · {formatToman(b.itemCount)} قلم
              </span>
            </div>
          ))}
        </div>
        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer hover:text-foreground">
            نمودار مقایسهٔ بازه‌ها · جمع {formatToman(AP_AGING_TOTAL.amountToman)} تومان
          </summary>
          <div className="mt-3 flex items-end gap-2 h-40 border rounded-lg p-3 bg-background" role="img" aria-hidden>
            {AP_AGING_BUCKETS.map((b) => (
              <div key={b.key} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <div
                  className={`w-full ${b.colorClass} rounded-t`}
                  style={{ height: `${Math.max(12, b.pct * 2.2)}%` }}
                />
                <span className="text-[9px] truncate w-full text-center">{b.label}</span>
              </div>
            ))}
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
