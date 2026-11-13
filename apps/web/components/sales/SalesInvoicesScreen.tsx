'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Receipt } from 'lucide-react';
import {
  INVOICES_TOTAL,
  SALES_INVOICES,
  formatToman,
  type InvoiceStatus,
  type SalesInvoice,
} from '../../lib/sales-invoices-demo';
import { createSalesInvoice, fetchSalesInvoices, type SalesInvoiceApi } from '../../lib/sales-api';
import { DEMO_SALES_LINE } from '../../lib/sales-create-defaults';
import { SalesGridToolbar, SalesListCardHeader, rowPadding, type RowDensity } from './sales-screen-bits';

function mergeInvoices(demo: SalesInvoice[], api: SalesInvoiceApi[]): SalesInvoice[] {
  const keys = new Set(api.map((i) => i.number));
  const merged: SalesInvoice[] = api.map((i) => ({
    number: i.number,
    customerName: i.customerName,
    customerCode: i.customerCode,
    orderNumber: i.orderNumber,
    invoiceDate: i.invoiceDate,
    dueDate: i.dueDate,
    status: i.status,
    amountToman: i.amountToman,
  }));
  return [...merged, ...demo.filter((d) => !keys.has(d.number))];
}

export function SalesInvoicesScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderFrom = searchParams.get('from') ?? '';

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | InvoiceStatus>('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [density, setDensity] = useState<RowDensity>('compact');
  const [catalog, setCatalog] = useState(SALES_INVOICES);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState(orderFrom || 'SO-0486');
  const [customerName, setCustomerName] = useState('مشتری نمونه');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (orderFrom) setOrderNumber(orderFrom);
  }, [orderFrom]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { invoices, source } = await fetchSalesInvoices();
        if (cancelled) return;
        setCatalog(mergeInvoices(SALES_INVOICES, invoices));
        if (invoices.length) setApiHint(`${invoices.length} فاکتور از ${source}`);
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
    return catalog
      .filter((r) => {
        if (status !== 'all' && r.status !== status) return false;
        if (q && !r.number.includes(q) && !r.customerName.includes(q) && !r.orderNumber.includes(q)) return false;
        return true;
      })
      .slice(0, 40);
  }, [search, status, catalog]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4 bg-muted/20">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm mb-3">
          <label className="flex flex-col gap-1 text-xs">
            سفارش مبدأ
            <input className="rounded-md border px-3 py-2 font-mono" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1 text-xs lg:col-span-2">
            نام مشتری
            <input className="rounded-md border px-3 py-2" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </label>
          <div className="flex items-end justify-end">
            <Button
              className="bg-rose-700 hover:bg-rose-800 w-full"
              disabled={saving || !orderNumber.trim()}
              onClick={async () => {
                setSaving(true);
                setSaveError(null);
                try {
                  const { invoice } = await createSalesInvoice({
                    customerName,
                    orderNumber: orderNumber.trim(),
                    lines: [DEMO_SALES_LINE],
                  });
                  router.push(`/sales/invoices/${encodeURIComponent(invoice.number)}`);
                } catch (e) {
                  setSaveError(e instanceof Error ? e.message : 'خطا');
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? 'صدور…' : 'فاکتور پیش‌نویس (API)'}
            </Button>
          </div>
        </div>
        {saveError ? <p className="text-xs text-amber-600">{saveError}</p> : null}
      </Card>
      <Card className="p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end text-sm">
          <label className="flex flex-col gap-1 text-xs lg:col-span-2">
            جست‌وجو
            <input
              className="rounded-md border px-3 py-2"
              placeholder="شماره فاکتور، سفارش یا نام مشتری"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            وضعیت
            <select className="rounded-md border px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
              <option value="all">همه وضعیت‌ها</option>
              <option value="posted">ثبت قطعی</option>
              <option value="draft">پیش‌نویس</option>
            </select>
          </label>
          <div className="flex gap-2">
            <Button className="bg-rose-700 hover:bg-rose-800 flex-1">اعمال فیلتر</Button>
            <Button variant="ghost" onClick={() => { setSearch(''); setStatus('all'); setFromDate(''); setToDate(''); }}>
              پاک کردن
            </Button>
          </div>
          <label className="flex flex-col gap-1 text-xs">
            از تاریخ
            <input className="rounded-md border px-3 py-2" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1 text-xs">
            تا تاریخ
            <input className="rounded-md border px-3 py-2" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </label>
        </div>
      </Card>

      <Card className="finance-aging-card overflow-hidden p-0">
        <SalesListCardHeader
          icon={<Receipt className="size-4" />}
          title="فاکتورهای فروش"
          subtitle={apiHint ?? `${INVOICES_TOTAL.toLocaleString('fa-IR')} فاکتور`}
        />
        <SalesGridToolbar search={search} onSearch={setSearch} placeholder="فیلتر سریع…" density={density} onDensity={setDensity} />
        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted/90">
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 px-3 text-right">شماره فاکتور</th>
                <th className="py-2 px-3 text-right">مشتری</th>
                <th className="py-2 px-3 text-right">سفارش</th>
                <th className="py-2 px-3 text-right">تاریخ فاکتور</th>
                <th className="py-2 px-3 text-right">سررسید</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
                <th className="py-2 px-3 text-right">مبلغ (تومان)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.number} className="border-b border-dashed hover:bg-muted/40">
                  <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>
                    <Link href={`/sales/invoices/${encodeURIComponent(r.number)}`} className="text-rose-800 hover:underline">
                      {r.number}
                    </Link>
                  </td>
                  <td className={cn('px-3', rowPadding(density))}>
                    <CustomerCell name={r.customerName} code={r.customerCode} />
                  </td>
                  <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>
                    <Link href={`/sales/orders/${encodeURIComponent(r.orderNumber)}`} className="hover:underline">
                      {r.orderNumber}
                    </Link>
                  </td>
                  <td className={cn('px-3 text-xs', rowPadding(density))}>{r.invoiceDate}</td>
                  <td className={cn('px-3 text-xs', rowPadding(density))}>{r.dueDate}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    {r.status === 'posted' ? (
                      <Badge className="bg-emerald-600 hover:bg-emerald-600 gap-1"><span className="size-1.5 rounded-full bg-white/90" />ثبت قطعی</Badge>
                    ) : (
                      <Badge variant="secondary">پیش‌نویس</Badge>
                    )}
                  </td>
                  <td className={cn('px-3 tabular-nums font-medium', rowPadding(density))}>{formatToman(r.amountToman)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function CustomerCell({ name, code }: { name: string; code?: string }) {
  return (
    <div>
      <p className="font-medium text-sm">{name}</p>
      {code ? <p className="text-[10px] text-muted-foreground font-mono">{code}</p> : null}
    </div>
  );
}
