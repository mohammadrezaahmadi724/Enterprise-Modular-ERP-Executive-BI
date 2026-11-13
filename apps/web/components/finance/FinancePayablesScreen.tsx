'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { Calendar, Plus, User } from 'lucide-react';
import { FinancePayablesAging } from './FinancePayablesAging';
import {
  AP_FOOTER,
  AP_OPEN_ITEMS,
  AP_PAYMENTS,
  AP_PAYMENT_SCHEDULE,
  AP_PAYMENT_SCHEDULE_META,
  AP_SHARE_TOP,
  AP_SUPPLIER_BALANCES,
  formatToman,
  type ApSupplierBalance,
} from '../../lib/finance-payables-demo';

const TABS = [
  { id: 'balances', label: 'مانده تأمین‌کنندگان' },
  { id: 'open', label: 'اقلام پرداختنی' },
  { id: 'payments', label: 'پرداخت‌ها' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function statusBadge(status: ApSupplierBalance['status']) {
  return <Badge variant="destructive">{status}</Badge>;
}

export function FinancePayablesScreen() {
  const [tab, setTab] = useState<TabId>('balances');

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        پرداختنی‌ها — ثبت هر فاکتور یک سند حسابداری پیش‌نویس می‌سازد؛ پس از قطعی‌شدن سند، قلم باز قابل تسویه می‌شود و
        مانده‌ها به‌روز می‌شوند.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 border-b w-full sm:w-auto" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={cn(
                'shrink-0 border-b-2 px-3 py-2 text-sm transition-colors -mb-px',
                tab === t.id
                  ? 'border-primary font-semibold text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Button size="sm">
          <Plus className="size-4 ml-1" />
          ثبت پرداختنی جدید
        </Button>
      </div>

      <FinancePayablesAging />

      {tab === 'balances' && (
        <div className="flex flex-col lg:flex-row gap-3 items-start">
          <div className="flex-[1.5] min-w-0 w-full">
            <SupplierBalancesTable />
          </div>
          <div className="flex-1 min-w-[280px] w-full space-y-3">
            <PaymentScheduleCard />
            <SupplierShareCard />
          </div>
        </div>
      )}
      {tab === 'open' && <OpenPayablesTable />}
      {tab === 'payments' && <PaymentsTable />}
    </div>
  );
}

function SupplierBalancesTable() {
  return (
    <Card className="finance-aging-card">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
        <div className="flex gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <User className="size-4" />
          </span>
          <div>
            <CardTitle className="text-base">مانده تأمین‌کنندگان</CardTitle>
            <p className="text-xs text-muted-foreground">
              حساب‌های پرداختنی · فقط اقلام باز و تسویه ناقص · {formatToman(AP_FOOTER.supplierCount)} تأمین‌کننده
            </p>
          </div>
        </div>
        <Button size="sm" asChild>
          <Link href="/treasury/dashboard">
            <Plus className="size-4 ml-1" />
            ثبت پرداخت
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[560px] overflow-auto">
          <table className="w-full text-sm finance-hub-table" aria-label="مانده تأمین‌کنندگان">
            <thead className="sticky top-0 bg-card border-b z-10">
              <tr className="text-muted-foreground">
                <th className="py-2 px-3 text-right font-medium">تأمین‌کننده</th>
                <th className="py-2 px-3 text-right">حساب</th>
                <th className="py-2 px-3 text-left">مانده (تومان)</th>
                <th className="py-2 px-3 text-left">سررسید گذشته (تومان)</th>
                <th className="py-2 px-3 text-right">بیشترین تأخیر</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {AP_SUPPLIER_BALANCES.map((r) => (
                <tr key={r.id} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2 px-3 font-medium">{r.name}</td>
                  <td className="py-2 px-3 font-mono text-xs" dir="ltr">
                    {r.account}
                  </td>
                  <td className="py-2 px-3 text-left tabular-nums">{formatToman(r.balanceToman)}</td>
                  <td className="py-2 px-3 text-left tabular-nums font-semibold text-destructive">
                    {formatToman(r.overdueToman)}
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums">{r.maxDelayDays.toLocaleString('fa-IR')} روز</td>
                  <td className="py-2 px-3">{statusBadge(r.status)}</td>
                  <td className="py-2 px-3">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      اقلام ({r.openItemCount})
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-muted/30 font-medium">
              <tr>
                <td className="py-2 px-3">
                  جمع · <span className="tabular-nums">{formatToman(AP_FOOTER.supplierCount)}</span> تأمین‌کننده
                </td>
                <td />
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(AP_FOOTER.balanceToman)}</td>
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(AP_FOOTER.overdueToman)}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentScheduleCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <Calendar className="size-4" />
          </span>
          <div>
            <CardTitle className="text-base">برنامهٔ پرداخت این هفته</CardTitle>
            <p className="text-xs text-muted-foreground">
              {formatToman(AP_PAYMENT_SCHEDULE_META.itemCount)} قلم · {formatToman(AP_PAYMENT_SCHEDULE_META.totalToman)}{' '}
              · شامل سررسید گذشته‌ها
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[480px] overflow-auto divide-y">
        {AP_PAYMENT_SCHEDULE.map((row, i) => (
          <div key={`${row.ref}-${i}`} className="flex items-center gap-2.5 px-3.5 py-2.5">
            <span
              className={cn(
                'w-11 shrink-0 flex flex-col items-center rounded-lg px-1 py-1 text-sm font-extrabold leading-tight tabular-nums',
                row.upcoming ? 'bg-muted text-muted-foreground' : 'bg-destructive/10 text-destructive',
              )}
            >
              {row.day}
              <span className="text-[10px] font-medium">{row.monthShort}</span>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <span className="text-sm font-medium truncate">{row.supplier}</span>
              <span
                className={cn('font-mono text-[11.5px]', row.overdueDays != null ? 'text-destructive' : 'text-muted-foreground')}
                dir="ltr"
              >
                {row.ref}
                {row.overdueDays != null ? ` · ${formatToman(row.overdueDays)} روز گذشته` : ''}
              </span>
            </div>
            <span className="text-sm font-bold tabular-nums shrink-0">{formatToman(row.amountToman)}</span>
          </div>
        ))}
        <p className="text-xs text-muted-foreground px-3.5 py-2">نمونه — لیست کامل از projection سررسید همگام می‌شود.</p>
      </CardContent>
    </Card>
  );
}

function SupplierShareCard() {
  return (
    <Card>
      <CardContent className="pt-4 space-y-3">
        <span className="text-xs font-semibold text-muted-foreground">سهم از مانده تأمین‌کنندگان</span>
        {AP_SHARE_TOP.map((s) => (
          <div key={s.name} className="space-y-1">
            <div className="flex justify-between gap-2 text-xs">
              <span className="font-medium truncate">{s.name}</span>
              <span className="font-bold tabular-nums shrink-0">{formatToman(s.balanceToman)}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={s.pct}>
              <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function OpenPayablesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">اقلام پرداختنی</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0 pb-2">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2 px-3 text-right">شماره فاکتور</th>
              <th className="py-2 px-3 text-right">تأمین‌کننده</th>
              <th className="py-2 px-3 text-right">تاریخ</th>
              <th className="py-2 px-3 text-right">سررسید</th>
              <th className="py-2 px-3 text-left">مبلغ</th>
              <th className="py-2 px-3 text-left">مانده باز</th>
              <th className="py-2 px-3 text-right">تأخیر</th>
            </tr>
          </thead>
          <tbody>
            {AP_OPEN_ITEMS.map((row) => (
              <tr key={row.docNo} className="border-b border-dashed">
                <td className="py-2 px-3 font-mono text-xs">{row.docNo}</td>
                <td className="py-2 px-3">{row.supplier}</td>
                <td className="py-2 px-3 tabular-nums">{row.issueDate}</td>
                <td className="py-2 px-3 tabular-nums">{row.dueDate}</td>
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(row.amountToman)}</td>
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(row.openToman)}</td>
                <td className="py-2 px-3 text-right tabular-nums">{row.delayDays.toLocaleString('fa-IR')} روز</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function PaymentsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">پرداخت‌ها</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2 text-right">شماره</th>
              <th className="py-2 text-right">تاریخ</th>
              <th className="py-2 text-right">تأمین‌کننده</th>
              <th className="py-2 text-right">روش</th>
              <th className="py-2 text-left">مبلغ (تومان)</th>
              <th className="py-2 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {AP_PAYMENTS.map((r) => (
              <tr key={r.no} className="border-b border-dashed">
                <td className="py-2 font-mono">{r.no}</td>
                <td className="py-2">{r.date}</td>
                <td className="py-2">{r.supplier}</td>
                <td className="py-2">{r.method}</td>
                <td className="py-2 text-left tabular-nums">{formatToman(r.amountToman)}</td>
                <td className="py-2">
                  <Badge className="bg-emerald-600">{r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
