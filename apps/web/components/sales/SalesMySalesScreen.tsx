'use client';

import Link from 'next/link';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { formatToman } from '../../lib/finance-receivables-demo';
import { MY_SALES_ITEMS, MY_SALES_KPIS } from '../../lib/sales-my-demo';

const KIND_FA = { lead: 'سرنخ', quote: 'پیش‌فاکتور', order: 'سفارش' };

export function SalesMySalesScreen() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">فروش من — کارهای assign‌شده به «کاربر جاری (نمایشی)».</p>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="سرنخ باز" value={String(MY_SALES_KPIS.openLeads)} />
        <Kpi label="پیش‌فاکتور در انتظار" value={String(MY_SALES_KPIS.quotesPending)} />
        <Kpi label="فروش ماه (تومان)" value={formatToman(MY_SALES_KPIS.ordersMonthToman)} />
        <Kpi label="تحقق هدف" value={`${MY_SALES_KPIS.targetPct}٪`} />
      </section>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">اولویت‌های امروز</CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {MY_SALES_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0">
              <div>
                <div className="flex gap-2 items-center">
                  <Badge variant="outline">{KIND_FA[item.kind]}</Badge>
                  <p className="font-medium text-sm">{item.title}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.dueLabel} · {item.stage}</p>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold tabular-nums">{formatToman(item.amountToman)}</p>
                <Link href={item.kind === 'lead' ? '/sales/leads' : item.kind === 'quote' ? '/sales/quotes' : '/sales/orders'} className="text-xs text-primary">
                  باز کردن
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold mt-0.5">{value}</p>
    </div>
  );
}
