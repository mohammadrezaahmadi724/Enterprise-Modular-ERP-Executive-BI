'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { PackageCheck, Truck } from 'lucide-react';
import { DEMO_PURCHASE_ORDERS, fetchPurchaseOrders, receivePurchaseOrder, type PurchaseOrderApi } from '../../lib/procurement-api';
import { createEmptyWmsLine } from '../../lib/wms-line-factory';
import type { WmsLineApi } from '../../lib/wms-api';
import { WmsDocLineComposer, sanitizeWmsDocLines } from '../wms/WmsDocLineComposer';
import { useWmsStockSkus } from '../wms/useWmsStockSkus';

export function ProcurementReceiptsScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const poFromUrl = searchParams.get('po')?.trim() ?? '';
  const skuOptions = useWmsStockSkus();
  const [poNumber, setPoNumber] = useState<string>(poFromUrl || DEMO_PURCHASE_ORDERS[0]!.number);
  const [party, setParty] = useState<string>(DEMO_PURCHASE_ORDERS[0]!.supplier);
  const [lines, setLines] = useState<WmsLineApi[]>(() => [
    { ...createEmptyWmsLine('receipt'), sku: 'PRD-1016', warehouse: 'WH-ESF', quantity: 50, unitPriceRial: 1_200_000 },
  ]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastReceipt, setLastReceipt] = useState<string | null>(null);
  const [apiOrders, setApiOrders] = useState<PurchaseOrderApi[]>([]);

  const receiptableOrders = apiOrders.filter((o) => o.status === 'approved' || o.status === 'partial_receipt');
  const selectedPo = receiptableOrders.find((p) => p.number === poNumber) ?? DEMO_PURCHASE_ORDERS.find((p) => p.number === poNumber);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const { orders } = await fetchPurchaseOrders();
        if (!cancelled && orders.length) setApiOrders(orders);
      } catch {
        /* */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (poFromUrl) setPoNumber(poFromUrl);
  }, [poFromUrl]);

  useEffect(() => {
    const hit = receiptableOrders.find((o) => o.number === poNumber);
    if (!hit?.lines?.length) return;
    setParty(hit.supplierName);
    setLines(
      hit.lines.map((l) => ({
        ...createEmptyWmsLine('receipt'),
        sku: l.sku,
        warehouse: 'WH-ESF',
        quantity: l.quantity,
        unitPriceRial: Math.max(1, Math.round(l.unitPriceToman * 10)),
      })),
    );
  }, [poNumber, receiptableOrders]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        ثبت رسید انبار از سفارش خرید — API{' '}
        <code className="text-xs bg-muted px-1 rounded">POST /procurement/purchase-orders/:number/receive</code>
      </p>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="size-4 text-violet-600" />
            رسید خرید → WMS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            <label className="text-xs flex flex-col gap-1">
              سفارش خرید (PO)
              <select
                className="rounded-md border px-3 py-2"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
              >
                {(receiptableOrders.length ? receiptableOrders : []).map((p) => (
                  <option key={p.number} value={p.number}>
                    {p.number} — {'supplierName' in p ? p.supplierName : (p as { supplier?: string }).supplier}
                  </option>
                ))}
                {!receiptableOrders.length
                  ? DEMO_PURCHASE_ORDERS.map((p) => (
                      <option key={p.number} value={p.number}>
                        {p.number} — {p.supplier}
                      </option>
                    ))
                  : null}
              </select>
            </label>
            <label className="text-xs flex flex-col gap-1">
              طرف حساب / تأمین‌کننده
              <input
                className="rounded-md border px-3 py-2"
                value={party}
                onChange={(e) => setParty(e.target.value)}
              />
            </label>
          </div>
          {selectedPo ? (
            <Badge variant="outline" className="text-xs">
              وضعیت PO: {selectedPo.status}
            </Badge>
          ) : null}

          <WmsDocLineComposer
            variant="receipt"
            sectionTitle="اقلام تحویلی"
            lines={lines}
            onChange={setLines}
            skuOptions={skuOptions}
          />

          {error ? <p className="text-xs text-amber-600">{error}</p> : null}
          {lastReceipt ? (
            <p className="text-xs text-emerald-700">
              رسید انبار:{' '}
              <Link href={`/wms/documents/${encodeURIComponent(lastReceipt)}`} className="font-mono underline">
                {lastReceipt}
              </Link>
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-rose-700 hover:bg-rose-800"
              disabled={saving}
              onClick={() => void handleReceive()}
            >
              <PackageCheck className="size-4 ml-1" />
              {saving ? 'ثبت رسید…' : 'ثبت رسید و ورود به انبار'}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/wms/receipts">لیست رسیدهای WMS</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  async function handleReceive() {
    setSaving(true);
    setError(null);
    try {
      const docLines = sanitizeWmsDocLines(lines, 'receipt');
      if (!docLines.length) throw new Error('حداقل یک قلم معتبر وارد کنید');
      const result = await receivePurchaseOrder(poNumber, { party, lines: docLines });
      setLastReceipt(result.receiptDocNo);
      router.push(`/wms/documents/${encodeURIComponent(result.receiptDocNo)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا در ثبت رسید');
    } finally {
      setSaving(false);
    }
  }
}
