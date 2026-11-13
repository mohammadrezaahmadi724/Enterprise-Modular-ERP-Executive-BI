'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Calendar, FileText, Plus } from 'lucide-react';
import {
  NEXT_QUOTE_NUMBER,
  QUOTES_TOTAL,
  SALES_QUOTES,
  formatQuoteAmount,
  type QuoteStatus,
  type SalesQuote,
} from '../../lib/sales-quotes-demo';
import { createSalesQuote, fetchSalesQuotes, type SalesQuoteApi } from '../../lib/sales-api';
import { DEMO_SALES_LINE } from '../../lib/sales-create-defaults';
import { useRouter } from 'next/navigation';
import { SalesGridToolbar, SalesListCardHeader, rowPadding, type RowDensity } from './sales-screen-bits';
import { SalesLineItemComposer } from './SalesLineItemComposer';

function statusBadge(s: QuoteStatus) {
  if (s === 'accepted') return <Badge className="bg-emerald-600 hover:bg-emerald-600 gap-1"><span className="size-1.5 rounded-full bg-white/90" />پذیرفته‌شده</Badge>;
  return <Badge variant="secondary" className="gap-1"><span className="size-1.5 rounded-full bg-muted-foreground" />پیش‌نویس</Badge>;
}

function mergeQuotes(demo: SalesQuote[], api: SalesQuoteApi[]): SalesQuote[] {
  const keys = new Set(api.map((q) => q.number));
  const merged: SalesQuote[] = api.map((q) => ({
    number: q.number,
    accountCode: q.accountCode,
    totalToman: q.totalToman,
    validUntil: q.validUntil,
    status: q.status,
  }));
  return [...merged, ...demo.filter((d) => !keys.has(d.number))];
}

export function SalesQuotesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [density, setDensity] = useState<RowDensity>('compact');
  const [catalog, setCatalog] = useState(SALES_QUOTES);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [accountCode, setAccountCode] = useState('CUS-DEMO-020');
  const [validUntil, setValidUntil] = useState('۱۴۰۵/۰۹/۰۱');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { quotes, source } = await fetchSalesQuotes();
        if (cancelled) return;
        setCatalog(mergeQuotes(SALES_QUOTES, quotes));
        if (quotes.length) setApiHint(`${quotes.length} پیش‌فاکتور از ${source}`);
      } catch {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    const q = search.trim();
    const base = q ? catalog.filter((r) => r.number.includes(q) || r.accountCode.includes(q)) : catalog;
    return base.slice(0, 25);
  }, [search, catalog]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-muted/20">
        <div className="p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <label className="flex flex-col gap-1 text-xs">
              شماره پیش‌فاکتور
              <input readOnly className="rounded-md border bg-muted/50 px-3 py-2 font-mono" value={NEXT_QUOTE_NUMBER} />
            </label>
            <label className="flex flex-col gap-1 text-xs lg:col-span-2">
              طرف حساب
              <input
                className="rounded-md border bg-background px-3 py-2 font-mono"
                placeholder="کد طرف حساب"
                value={accountCode}
                onChange={(e) => setAccountCode(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1 text-xs">
              سرنخ مرتبط
              <select className="rounded-md border bg-background px-3 py-2">
                <option>بدون سرنخ</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs">
              اعتبار تا
              <span className="relative">
                <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  className="w-full rounded-md border bg-background py-2 pr-9 pl-3"
                  placeholder="۱۴۰۵/۰۹/۰۱"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </span>
            </label>
          </div>
          <SalesLineItemComposer sectionTitle="اقلام" addLabel="افزودن قلم" />
          {saveError ? <p className="text-xs text-amber-600">{saveError}</p> : null}
          <div className="flex justify-end">
            <Button
              className="bg-rose-700 hover:bg-rose-800"
              disabled={saving || !accountCode.trim()}
              onClick={async () => {
                setSaving(true);
                setSaveError(null);
                try {
                  const { quote } = await createSalesQuote({
                    accountCode: accountCode.trim(),
                    validUntil,
                    lines: [DEMO_SALES_LINE],
                  });
                  router.push(`/sales/quotes/${encodeURIComponent(quote.number)}`);
                } catch (e) {
                  setSaveError(e instanceof Error ? e.message : 'خطا');
                } finally {
                  setSaving(false);
                }
              }}
            >
              <Plus className="size-4 ml-1" />
              {saving ? 'در حال ثبت…' : 'پیش‌فاکتور جدید (API)'}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="finance-aging-card overflow-hidden p-0">
        <SalesListCardHeader
          icon={<FileText className="size-4" />}
          title="پیش‌فاکتورها"
          subtitle={apiHint ?? `${QUOTES_TOTAL.toLocaleString('fa-IR')} پیش‌فاکتور در دسترس شما`}
        />
        <SalesGridToolbar search={search} onSearch={setSearch} placeholder="نام یا شماره طرف حساب" density={density} onDensity={setDensity} />
        <div className="overflow-x-auto max-h-[480px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted/90">
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 px-3 text-right">شماره</th>
                <th className="py-2 px-3 text-right">طرف حساب</th>
                <th className="py-2 px-3 text-right">مبلغ کل (تومان)</th>
                <th className="py-2 px-3 text-right">اعتبار تا</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.number} className="border-b border-dashed hover:bg-muted/40">
                  <td className={cn('px-3 font-mono text-xs font-semibold', rowPadding(density))}>
                    <Link href={`/sales/quotes/${encodeURIComponent(r.number)}`} className="text-rose-800 hover:underline">
                      {r.number}
                    </Link>
                  </td>
                  <td className={cn('px-3', rowPadding(density))}>{r.accountCode}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{formatQuoteAmount(r.totalToman)}</td>
                  <td className={cn('px-3 text-muted-foreground text-xs', rowPadding(density))}>{r.validUntil}</td>
                  <td className={cn('px-3', rowPadding(density))}>{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
