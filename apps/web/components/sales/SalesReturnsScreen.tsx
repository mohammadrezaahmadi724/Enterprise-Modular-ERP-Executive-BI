'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Plus, RotateCcw } from 'lucide-react';
import { RETURN_KPIS, SALES_RETURNS, formatToman, type SalesReturnMemo } from '../../lib/sales-returns-demo';
import { createSalesReturn, fetchSalesReturns, type SalesReturnApi } from '../../lib/sales-api';
import { DEMO_SALES_LINE } from '../../lib/sales-create-defaults';
import { SalesGridToolbar, SalesListCardHeader, rowPadding, type RowDensity } from './sales-screen-bits';

function mergeReturns(demo: SalesReturnMemo[], api: SalesReturnApi[]): SalesReturnMemo[] {
  const keys = new Set(api.map((r) => r.id));
  const merged: SalesReturnMemo[] = api.map((r) => ({
    id: r.id,
    customerName: r.customerName,
    customerCode: r.customerCode,
    sourceInvoice: r.sourceInvoice,
    date: r.date,
    reason: r.reason,
    grossToman: r.grossToman,
    taxToman: r.taxToman,
    creditToman: r.creditToman,
    status: r.status,
    glDoc: r.glDoc,
  }));
  return [...merged, ...demo.filter((d) => !keys.has(d.id))];
}

export function SalesReturnsScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invoicePrefill = searchParams.get('invoice') ?? '';

  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [catalog, setCatalog] = useState(SALES_RETURNS);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [sourceInvoice, setSourceInvoice] = useState(invoicePrefill || 'INV-140508-007');
  const [reason, setReason] = useState('مرجوعی بخشی — کیفیت بسته‌بندی');
  const [customerName, setCustomerName] = useState('مشتری نمونه');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (invoicePrefill) setSourceInvoice(invoicePrefill);
  }, [invoicePrefill]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { returns, source } = await fetchSalesReturns();
        if (cancelled) return;
        setCatalog(mergeReturns(SALES_RETURNS, returns));
        if (returns.length) setApiHint(`${returns.length} اعلامیه از ${source}`);
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
    return catalog.filter((r) => !q || r.id.includes(q) || r.customerName.includes(q) || r.sourceInvoice.includes(q));
  }, [search, catalog]);

  const kpis = useMemo(() => {
    if (rows.length === 0) return RETURN_KPIS;
    const grossToman = rows.reduce((s, r) => s + r.grossToman, 0);
    const taxToman = rows.reduce((s, r) => s + r.taxToman, 0);
    const creditToman = rows.reduce((s, r) => s + r.creditToman, 0);
    return { count: rows.length, grossToman, taxToman, creditToman };
  }, [rows]);

  async function handleCreate() {
    setSaving(true);
    setSaveError(null);
    try {
      const { return: memo } = await createSalesReturn({
        customerName,
        sourceInvoice: sourceInvoice.trim(),
        reason: reason.trim(),
        lines: [{ ...DEMO_SALES_LINE, quantity: 2, lineTotalRial: DEMO_SALES_LINE.unitPriceRial * 2 }],
      });
      router.push(`/sales/returns/${encodeURIComponent(memo.id)}`);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ReturnsPageHeader
        sourceInvoice={sourceInvoice}
        onSourceInvoice={setSourceInvoice}
        reason={reason}
        onReason={setReason}
        customerName={customerName}
        onCustomerName={setCustomerName}
        saving={saving}
        saveError={saveError}
        onCreate={() => void handleCreate()}
      />
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="تعداد اعلامیه‌ها" value={String(kpis.count)} />
        <Kpi label="جمع ناخالص مرجوعی" value={`${formatToman(kpis.grossToman)} تومان`} />
        <Kpi label="جمع مالیات تعدیل‌شده" value={`${formatToman(kpis.taxToman)} تومان`} />
        <Kpi label="کل بستانکار به مشتری" value={`${formatToman(kpis.creditToman)} تومان`} />
      </section>

      <Card className="finance-aging-card overflow-hidden p-0">
        <SalesListCardHeader
          icon={<RotateCcw className="size-4" />}
          title="فهرست اعلامیه‌های برگشت از فروش"
          subtitle={apiHint ?? 'برگشت و Credit Memo — با ثبت GL'}
        />
        <SalesGridToolbar search={search} onSearch={setSearch} placeholder="شماره یا مشتری" density={density} onDensity={setDensity} />
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-muted/90">
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 px-3 text-right">شماره اعلامیه</th>
                <th className="py-2 px-3 text-right">مشتری</th>
                <th className="py-2 px-3 text-right">فاکتور مبدأ</th>
                <th className="py-2 px-3 text-right">تاریخ</th>
                <th className="py-2 px-3 text-right min-w-[180px]">علت</th>
                <th className="py-2 px-3 text-right">ناخالص</th>
                <th className="py-2 px-3 text-right">مالیات</th>
                <th className="py-2 px-3 text-right">کل بستانکار</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
                <th className="py-2 px-3 text-right">سند مالی</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-dashed hover:bg-muted/40">
                  <td className={cn('px-3', rowPadding(density))}>
                    <Link href={`/sales/returns/${encodeURIComponent(r.id)}`} className="text-rose-800 font-mono text-xs hover:underline">
                      {r.id}
                    </Link>
                  </td>
                  <td className={cn('px-3', rowPadding(density))}>{r.customerName}</td>
                  <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>
                    <Link href={`/sales/invoices/${encodeURIComponent(r.sourceInvoice)}`} className="hover:underline">
                      {r.sourceInvoice}
                    </Link>
                  </td>
                  <td className={cn('px-3 text-xs', rowPadding(density))}>{r.date}</td>
                  <td className={cn('px-3 text-xs text-muted-foreground max-w-[200px]', rowPadding(density))}>{r.reason}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{formatToman(r.grossToman)}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{formatToman(r.taxToman)}</td>
                  <td className={cn('px-3 tabular-nums text-emerald-700 font-semibold', rowPadding(density))}>{formatToman(r.creditToman)}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    {r.status === 'posted' ? (
                      <Badge className="bg-emerald-600 hover:bg-emerald-600">ثبت قطعی</Badge>
                    ) : (
                      <Badge variant="secondary">پیش‌نویس</Badge>
                    )}
                  </td>
                  <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>
                    {r.glDoc ? (
                      <Link href="/finance/ledgers" className="text-primary hover:underline">
                        {r.glDoc}
                      </Link>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted/30 font-medium text-sm">
                <td colSpan={5} className="px-3 py-3">
                  جمع {kpis.count.toLocaleString('fa-IR')} اعلامیه
                </td>
                <td className="px-3 py-3 tabular-nums">{formatToman(kpis.grossToman)}</td>
                <td className="px-3 py-3 tabular-nums">{formatToman(kpis.taxToman)}</td>
                <td className="px-3 py-3 tabular-nums text-emerald-700">{formatToman(kpis.creditToman)}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ReturnsPageHeader({
  sourceInvoice,
  onSourceInvoice,
  reason,
  onReason,
  customerName,
  onCustomerName,
  saving,
  saveError,
  onCreate,
}: {
  sourceInvoice: string;
  onSourceInvoice: (v: string) => void;
  reason: string;
  onReason: (v: string) => void;
  customerName: string;
  onCustomerName: (v: string) => void;
  saving: boolean;
  saveError: string | null;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold">برگشت از فروش و اعلامیه‌های بستانکار</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            مرجوعی کالا، تعدیل حساب مشتری و سند بستانکار GL (۱۱۰۱ / ۴۱۰۱) — هم‌تراز دریافتنی.
          </p>
        </div>
      </div>
      <Card className="p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <label className="flex flex-col gap-1 text-xs">
          فاکتور مبدأ
          <input className="rounded-md border px-3 py-2 font-mono" value={sourceInvoice} onChange={(e) => onSourceInvoice(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs">
          مشتری
          <input className="rounded-md border px-3 py-2" value={customerName} onChange={(e) => onCustomerName(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1 text-xs lg:col-span-2">
          علت مرجوعی
          <input className="rounded-md border px-3 py-2" value={reason} onChange={(e) => onReason(e.target.value)} />
        </label>
        {saveError ? <p className="text-xs text-amber-600 sm:col-span-2">{saveError}</p> : null}
        <div className="flex items-end lg:col-span-4 justify-end">
          <Button className="bg-rose-700 hover:bg-rose-800" disabled={saving} onClick={onCreate}>
            <Plus className="size-4 ml-1" />
            {saving ? 'ثبت…' : 'ثبت برگشت از فروش (API)'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-bold mt-0.5 tabular-nums">{value}</p>
    </div>
  );
}
