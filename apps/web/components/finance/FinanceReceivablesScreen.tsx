'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { Plus, User } from 'lucide-react';
import { FinanceReceivablesAging } from './FinanceReceivablesAging';
import {
  AR_CUSTOMER_BALANCES,
  AR_FOOTER_TOTALS,
  AR_OPEN_ITEMS_SAMPLE,
  AR_RECEIPTS_SAMPLE,
  AR_RETURNS_SAMPLE,
  formatToman,
  type ArCustomerBalance,
} from '../../lib/finance-receivables-demo';
import { fetchArOpenItems, type ArOpenItemDto } from '../../lib/finance-api';

const TABS = [
  { id: 'balances', label: 'مانده طرف‌حساب‌ها' },
  { id: 'open', label: 'اقلام باز' },
  { id: 'receipts', label: 'دریافت‌ها' },
  { id: 'returns', label: 'برگشت از فروش (بستانکار)' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function statusBadge(status: ArCustomerBalance['status']) {
  if (status === 'بیش از ۹۰ روز') return <Badge variant="destructive">{status}</Badge>;
  if (status === 'سررسید گذشته') return <Badge className="bg-amber-500 hover:bg-amber-500">{status}</Badge>;
  return <Badge className="bg-emerald-600 hover:bg-emerald-600">{status}</Badge>;
}

export function FinanceReceivablesScreen() {
  const [tab, setTab] = useState<TabId>('balances');

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        دریافتنی‌ها — ثبت هر فاکتور یک سند حسابداری پیش‌نویس می‌سازد؛ پس از قطعی‌شدن سند، قلم باز قابل تسویه می‌شود و
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
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary">
            <Plus className="size-4 ml-1" />
            ثبت برگشت از فروش
          </Button>
          <Button size="sm">
            <Plus className="size-4 ml-1" />
            ثبت دریافتنی جدید
          </Button>
        </div>
      </div>

      <FinanceReceivablesAging />

      {tab === 'balances' && <CustomerBalancesTable />}
      {tab === 'open' && <OpenItemsTable />}
      {tab === 'receipts' && <ReceiptsTable />}
      {tab === 'returns' && <ReturnsTable />}
    </div>
  );
}

function CustomerBalancesTable() {
  return (
    <Card className="finance-aging-card">
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
        <div className="flex gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <User className="size-4" />
          </span>
          <div>
            <CardTitle className="text-base">مانده مشتریان</CardTitle>
            <p className="text-xs text-muted-foreground">
              حساب‌های دریافتنی · فقط اقلام باز و تسویه ناقص · {formatToman(AR_FOOTER_TOTALS.customerCount)} مشتری
            </p>
          </div>
        </div>
        <Button size="sm" asChild>
          <Link href="/treasury/dashboard">
            <Plus className="size-4 ml-1" />
            ثبت دریافت
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[560px] overflow-auto">
          <table className="w-full text-sm finance-hub-table" aria-label="مانده مشتریان">
            <thead className="sticky top-0 bg-card border-b z-10">
              <tr className="text-muted-foreground">
                <th className="py-2 px-3 text-right font-medium">مشتری</th>
                <th className="py-2 px-3 text-right">حساب</th>
                <th className="py-2 px-3 text-left">مانده (تومان)</th>
                <th className="py-2 px-3 text-left">سررسید گذشته (تومان)</th>
                <th className="py-2 px-3 text-right">بیشترین تأخیر</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {AR_CUSTOMER_BALANCES.map((r) => (
                <tr key={r.id} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2 px-3 font-medium">{r.name}</td>
                  <td className="py-2 px-3 font-mono text-xs" dir="ltr">
                    {r.account}
                  </td>
                  <td className="py-2 px-3 text-left tabular-nums">{formatToman(r.balanceToman)}</td>
                  <td className="py-2 px-3 text-left tabular-nums">
                    {r.overdueToman != null ? (
                      <span className={r.status !== 'جاری' ? 'font-semibold text-destructive' : ''}>
                        {formatToman(r.overdueToman)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-right tabular-nums">
                    {r.maxDelayDays != null
                      ? `${new Intl.NumberFormat('fa-IR').format(r.maxDelayDays)} روز`
                      : '—'}
                  </td>
                  <td className="py-2 px-3 text-right">{statusBadge(r.status)}</td>
                  <td className="py-2 px-3">
                    <Button variant="ghost" size="sm" type="button">
                      اقلام ({new Intl.NumberFormat('fa-IR').format(r.openItemCount)})
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-muted/20 font-semibold">
              <tr>
                <td className="py-2 px-3">
                  جمع · <span className="tabular-nums">{formatToman(AR_FOOTER_TOTALS.customerCount)}</span> مشتری
                </td>
                <td />
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(AR_FOOTER_TOTALS.balanceToman)}</td>
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(AR_FOOTER_TOTALS.overdueToman)}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function OpenItemsTable() {
  const [rows, setRows] = useState<ArOpenItemDto[]>(AR_OPEN_ITEMS_SAMPLE);
  const [source, setSource] = useState<string>('demo');
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchArOpenItems()
      .then((data) => {
        if (cancelled) return;
        setRows(data.items);
        setSource(data.source);
        setLoadError(false);
      })
      .catch(() => {
        if (cancelled) return;
        setRows(AR_OPEN_ITEMS_SAMPLE);
        setSource('demo_fallback');
        setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">اقلام باز</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-0 pb-2">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2 px-3 text-right">شماره سند</th>
              <th className="py-2 px-3 text-right">مشتری</th>
              <th className="py-2 px-3 text-right">تاریخ صدور</th>
              <th className="py-2 px-3 text-right">سررسید</th>
              <th className="py-2 px-3 text-left">مبلغ</th>
              <th className="py-2 px-3 text-left">مانده باز</th>
              <th className="py-2 px-3 text-right">تأخیر</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.docNo} className="border-b border-dashed">
                <td className="py-2 px-3 font-mono">{row.docNo}</td>
                <td className="py-2 px-3">{row.customer}</td>
                <td className="py-2 px-3 tabular-nums">{row.issueDate}</td>
                <td className="py-2 px-3 tabular-nums">{row.dueDate}</td>
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(row.amountToman)}</td>
                <td className="py-2 px-3 text-left tabular-nums">{formatToman(row.openToman)}</td>
                <td className="py-2 px-3 text-right tabular-nums">{row.delayDays.toLocaleString('fa-IR')} روز</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground px-3 pt-2">
          منبع: {source}
          {loadError ? ' · API در دسترس نبود؛ نمایش نمونه محلی' : ''}
        </p>
      </CardContent>
    </Card>
  );
}

function ReceiptsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">دریافت‌ها</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2 text-right">شماره</th>
              <th className="py-2 text-right">تاریخ</th>
              <th className="py-2 text-right">مشتری</th>
              <th className="py-2 text-right">روش</th>
              <th className="py-2 text-left">مبلغ (تومان)</th>
              <th className="py-2 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {AR_RECEIPTS_SAMPLE.map((r) => (
              <tr key={r.no} className="border-b border-dashed">
                <td className="py-2 font-mono">{r.no}</td>
                <td className="py-2">{r.date}</td>
                <td className="py-2">{r.customer}</td>
                <td className="py-2">{r.method}</td>
                <td className="py-2 text-left tabular-nums text-emerald-600">{formatToman(r.amountToman)}</td>
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

function ReturnsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">برگشت از فروش (بستانکار)</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-muted-foreground">
            <tr>
              <th className="py-2 text-right">شماره</th>
              <th className="py-2 text-right">تاریخ</th>
              <th className="py-2 text-right">مشتری</th>
              <th className="py-2 text-right">فاکتور مرجع</th>
              <th className="py-2 text-left">بستانکار (تومان)</th>
              <th className="py-2 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {AR_RETURNS_SAMPLE.map((r) => (
              <tr key={r.no} className="border-b border-dashed">
                <td className="py-2 font-mono">{r.no}</td>
                <td className="py-2">{r.date}</td>
                <td className="py-2">{r.customer}</td>
                <td className="py-2 font-mono text-xs">{r.refInvoice}</td>
                <td className="py-2 text-left tabular-nums">{formatToman(r.creditToman)}</td>
                <td className="py-2">
                  <Badge variant="secondary">{r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
