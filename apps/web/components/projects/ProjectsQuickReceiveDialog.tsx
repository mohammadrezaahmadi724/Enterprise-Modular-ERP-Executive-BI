'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@repo/ui';
import { PackageCheck, X } from 'lucide-react';
import { fetchPurchaseOrders, receivePurchaseOrder, type PurchaseOrderApi } from '../../lib/procurement-api';
import { formatToman } from '../../lib/finance-receivables-demo';

const DEFAULT_WH = 'WH-ESF';

type ReadyPo = {
  purchaseOrderNumber: string;
  supplierName: string;
  totalToman: number;
  status: string;
  lineCount: number;
};

type Props = {
  open: boolean;
  options: ReadyPo[];
  initialPo?: string;
  projectCode: string;
  onClose: () => void;
  onCreated: () => void;
};

export function ProjectsQuickReceiveDialog({ open, options, initialPo, projectCode, onClose, onCreated }: Props) {
  const [poNumber, setPoNumber] = useState(initialPo ?? options[0]?.purchaseOrderNumber ?? '');
  const [po, setPo] = useState<PurchaseOrderApi | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ receiptDocNo: string } | null>(null);

  useEffect(() => {
    if (!open) return;
    setPoNumber(initialPo ?? options[0]?.purchaseOrderNumber ?? '');
    setResult(null);
  }, [open, initialPo, options]);

  useEffect(() => {
    if (!open || !poNumber) return;
    void (async () => {
      try {
        const { orders } = await fetchPurchaseOrders();
        setPo(orders.find((o) => o.number === poNumber) ?? null);
      } catch {
        setPo(null);
      }
    })();
  }, [open, poNumber]);

  if (!open || !options.length) return null;

  const meta = options.find((o) => o.purchaseOrderNumber === poNumber);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!po?.lines?.length) return;
    setBusy(true);
    try {
      const lines = po.lines.map((l) => ({
        sku: l.sku,
        warehouse: DEFAULT_WH,
        quantity: l.quantity,
        unitPriceRial: Math.max(1, Math.round(l.unitPriceToman * 10)),
      }));
      const { receiptDocNo } = await receivePurchaseOrder(po.number, {
        party: po.supplierName,
        lines,
      });
      setResult({ receiptDocNo });
      onCreated();
    } finally {
      setBusy(false);
    }
  }

  const fullHref = `/procurement/receipts?po=${encodeURIComponent(poNumber)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background shadow-lg">
        <MotionHeader onClose={onClose} />
        {result ? (
          <SuccessPane receiptDocNo={result.receiptDocNo} onClose={onClose} />
        ) : (
          <form onSubmit={submit} className="p-4 space-y-3 text-sm">
            <p className="text-xs text-muted-foreground bg-muted/40 rounded-md px-3 py-2">
              تحویل کامل اقلام سفارش به انبار <span className="font-mono">{DEFAULT_WH}</span> — پروژه {projectCode}
            </p>

            <label className="block">
              <span className="text-xs">سفارش خرید</span>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 bg-background"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
              >
                {options.map((o) => (
                  <option key={o.purchaseOrderNumber} value={o.purchaseOrderNumber}>
                    {o.purchaseOrderNumber} — {o.supplierName} ({formatToman(o.totalToman)})
                  </option>
                ))}
              </select>
            </label>

            {meta ? (
              <ul className="text-xs text-muted-foreground space-y-1 border rounded-md p-2">
                <li>
                  {meta.lineCount.toLocaleString('fa-IR')} قلم · وضعیت {meta.status === 'approved' ? 'تأییدشده' : 'تحویل جزئی'}
                </li>
                {po?.lines?.slice(0, 3).map((l) => (
                  <li key={l.sku} className="font-mono">
                    {l.sku} × {l.quantity.toLocaleString('fa-IR')} {l.unit}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="flex flex-wrap gap-2 pt-1">
              <Button type="submit" disabled={busy || !po?.lines?.length} className="bg-rose-800">
                <PackageCheck className="size-4 ml-1" />
                ثبت رسید و ورود به انبار
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                انصراف
              </Button>
              <Button type="button" variant="ghost" size="sm" asChild className="mr-auto text-xs">
                <Link href={fullHref}>فرم کامل رسید</Link>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SuccessPane({ receiptDocNo, onClose }: { receiptDocNo: string; onClose: () => void }) {
  return (
    <div className="p-4 space-y-3 text-sm">
      <p className="font-medium text-emerald-800">رسید انبار ثبت شد.</p>
      <Link href={`/wms/documents/${encodeURIComponent(receiptDocNo)}`} className="font-mono text-primary text-xs block">
        {receiptDocNo}
      </Link>
      <MotionActions onClose={onClose} receiptDocNo={receiptDocNo} />
    </div>
  );
}

function MotionActions({ onClose, receiptDocNo }: { onClose: () => void; receiptDocNo: string }) {
  return (
    <div className="flex gap-2">
      <Button size="sm" asChild>
        <Link href={`/wms/documents/${encodeURIComponent(receiptDocNo)}`}>باز کردن سند WMS</Link>
      </Button>
      <Button size="sm" variant="outline" onClick={onClose}>
        بستن
      </Button>
    </div>
  );
}

function MotionHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <h3 className="font-semibold text-sm flex items-center gap-2">
        <PackageCheck className="size-4 text-rose-800" />
        رسید خرید → انبار
      </h3>
      <button type="button" onClick={onClose} className="text-muted-foreground">
        <X className="size-4" />
      </button>
    </div>
  );
}
