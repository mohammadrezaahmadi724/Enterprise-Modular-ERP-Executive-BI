'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Plus, ShoppingCart } from 'lucide-react';
import {
  ORDERS_TOTAL,
  SALES_ORDERS,
  SUPPLY_STATUS_FA,
  formatToman,
  type OrderSupplyStatus,
  type SalesOrder,
} from '../../lib/sales-orders-demo';
import { createSalesOrder, fetchSalesOrders, type SalesOrderApi } from '../../lib/sales-api';
import { DEMO_SALES_LINE } from '../../lib/sales-create-defaults';
import { useRouter, useSearchParams } from 'next/navigation';
import { SalesGridToolbar, SalesListCardHeader, rowPadding, type RowDensity } from './sales-screen-bits';
import { SalesLineItemComposer } from './SalesLineItemComposer';

function supplyBadge(s: OrderSupplyStatus) {
  return (
    <Badge variant="outline" className="gap-1 font-normal">
      <span className="size-1.5 rounded-full bg-muted-foreground" />
      {SUPPLY_STATUS_FA[s]}
    </Badge>
  );
}

function mergeOrders(demo: SalesOrder[], api: SalesOrderApi[]): SalesOrder[] {
  const keys = new Set(api.map((o) => o.number));
  const merged: SalesOrder[] = api.map((o) => ({
    number: o.number,
    accountCode: o.accountCode,
    supplyStatus: o.supplyStatus,
    deliveredLabel: o.deliveredLabel,
    amountToman: o.amountToman,
  }));
  return [...merged, ...demo.filter((d) => !keys.has(d.number))];
}

export function SalesOrdersScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [density, setDensity] = useState<RowDensity>('compact');
  const [catalog, setCatalog] = useState(SALES_ORDERS);
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [accountCode, setAccountCode] = useState('CUS-DEMO-020');
  const [quoteNumber, setQuoteNumber] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { orders, source } = await fetchSalesOrders();
        if (cancelled) return;
        setCatalog(mergeOrders(SALES_ORDERS, orders));
        if (orders.length) setApiHint(`${orders.length} سفارش از ${source}`);
      } catch {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (searchParams.get('new') !== '1') return;
    document.getElementById('sales-order-create-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [searchParams]);

  const rows = useMemo(() => {
    const q = search.trim();
    const base = q ? catalog.filter((r) => r.number.includes(q) || r.accountCode.includes(q)) : catalog;
    return base.slice(0, 25);
  }, [search, catalog]);

  return (
    <div className="flex flex-col gap-4">
      <Card id="sales-order-create-panel" className="bg-muted/20">
        <div className="p-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm font-mono"
              placeholder="طرف حساب"
              value={accountCode}
              onChange={(e) => setAccountCode(e.target.value)}
            />
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm font-mono"
              placeholder="پیش‌فاکتور مرتبط"
              value={quoteNumber}
              onChange={(e) => setQuoteNumber(e.target.value)}
            />
            <select className="rounded-md border bg-background px-3 py-2 text-sm">
              <option>انبار پیش‌فرض</option>
            </select>
          </div>
          <SalesLineItemComposer sectionTitle="اقلام سفارش" addLabel="افزودن قلم" />
          {saveError ? <p className="text-xs text-amber-600">{saveError}</p> : null}
          <div className="flex justify-end">
            <Button
              className="bg-rose-700 hover:bg-rose-800"
              disabled={saving || !accountCode.trim()}
              onClick={async () => {
                setSaving(true);
                setSaveError(null);
                try {
                  const { order } = await createSalesOrder({
                    accountCode: accountCode.trim(),
                    quoteNumber: quoteNumber.trim() || undefined,
                    lines: [DEMO_SALES_LINE],
                  });
                  router.push(`/sales/orders/${encodeURIComponent(order.number)}`);
                } catch (e) {
                  setSaveError(e instanceof Error ? e.message : 'خطا');
                } finally {
                  setSaving(false);
                }
              }}
            >
              <Plus className="size-4 ml-1" />
              {saving ? 'در حال ثبت…' : 'سفارش جدید (API)'}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="finance-aging-card overflow-hidden p-0">
        <SalesListCardHeader
          icon={<ShoppingCart className="size-4" />}
          title="سفارش‌های فروش"
          subtitle={apiHint ?? `${ORDERS_TOTAL.toLocaleString('fa-IR')} سفارش`}
        />
        <SalesGridToolbar search={search} onSearch={setSearch} placeholder="شماره سفارش یا طرف حساب" density={density} onDensity={setDensity} />
        <div className="overflow-x-auto max-h-[480px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted/90">
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 px-3 text-right">شماره سفارش</th>
                <th className="py-2 px-3 text-right">طرف حساب</th>
                <th className="py-2 px-3 text-right">وضعیت تأمین و تحویل</th>
                <th className="py-2 px-3 text-right">تحویل‌شده</th>
                <th className="py-2 px-3 text-right">مبلغ سفارش (تومان)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.number} className="border-b border-dashed hover:bg-muted/40">
                  <td className={cn('px-3 font-mono text-xs font-semibold', rowPadding(density))}>
                    <Link href={`/sales/orders/${encodeURIComponent(r.number)}`} className="text-rose-800 hover:underline">
                      {r.number}
                    </Link>
                  </td>
                  <td className={cn('px-3', rowPadding(density))}>{r.accountCode}</td>
                  <td className={cn('px-3', rowPadding(density))}>{supplyBadge(r.supplyStatus)}</td>
                  <td className={cn('px-3 text-xs text-muted-foreground', rowPadding(density))}>{r.deliveredLabel}</td>
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
