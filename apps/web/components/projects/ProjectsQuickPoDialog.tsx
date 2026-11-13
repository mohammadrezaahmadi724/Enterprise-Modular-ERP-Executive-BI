'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@repo/ui';
import { ShoppingCart, X } from 'lucide-react';
import {
  createPurchaseOrder,
  fetchApprovedPurchaseRequests,
  fetchSuppliers,
  type PurchaseRequestApi,
  type SupplierApi,
} from '../../lib/procurement-api';
import { formatToman } from '../../lib/finance-receivables-demo';
import type { ProjectContextApi } from '../../lib/projects-api';

type ReadyPr = ProjectContextApi['procurement']['readyForPurchaseOrder'][number];

type Props = {
  open: boolean;
  ctx: ProjectContextApi;
  initialPr?: string;
  onClose: () => void;
  onCreated: () => void;
};

export function ProjectsQuickPoDialog({ open, ctx, initialPr, onClose, onCreated }: Props) {
  const options = ctx.procurement.readyForPurchaseOrder;
  const [prNumber, setPrNumber] = useState(initialPr ?? options[0]?.purchaseRequestNumber ?? '');
  const [suppliers, setSuppliers] = useState<SupplierApi[]>([]);
  const [supplierCode, setSupplierCode] = useState('');
  const [prDetail, setPrDetail] = useState<PurchaseRequestApi | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ number: string; approvalRequired?: boolean } | null>(null);

  useEffect(() => {
    if (!open) return;
    setPrNumber(initialPr ?? options[0]?.purchaseRequestNumber ?? '');
    setResult(null);
    void (async () => {
      try {
        const { suppliers: rows } = await fetchSuppliers();
        setSuppliers(rows);
        if (rows[0]) setSupplierCode(rows[0].code);
      } catch {
        /* */
      }
    })();
  }, [open, initialPr, options]);

  useEffect(() => {
    if (!open || !prNumber) return;
    void (async () => {
      try {
        const { requests } = await fetchApprovedPurchaseRequests();
        const hit = requests.find((r) => r.number === prNumber) ?? null;
        setPrDetail(hit);
      } catch {
        setPrDetail(null);
      }
    })();
  }, [open, prNumber]);

  if (!open) return null;
  if (!options.length) return null;

  const projectCode = ctx.project.code;
  const supplier = suppliers.find((s) => s.code === supplierCode);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!prNumber || !supplier) return;
    const pr = prDetail;
    const lines =
      pr?.lines?.length && pr.lines.some((l) => l.estimatedUnitToman)
        ? pr.lines.map((l) => ({
            sku: (l.sku ?? 'ITEM').trim(),
            quantity: l.quantity,
            unit: l.unit,
            unitPriceToman: l.estimatedUnitToman ?? Math.round((pr.estimatedToman || 1) / Math.max(l.quantity, 1)),
          }))
        : [
            {
              sku: 'ITEM',
              quantity: 1,
              unit: 'بسته',
              unitPriceToman: pr?.estimatedToman ?? options.find((o) => o.purchaseRequestNumber === prNumber)?.estimatedToman ?? 1,
            },
          ];

    setBusy(true);
    try {
      const { order } = await createPurchaseOrder({
        purchaseRequestNumber: prNumber,
        project: projectCode,
        supplierCode: supplier.code,
        supplierName: supplier.name,
        orderDate: '۱۴۰۵/۰۸/۱۲',
        deliveryDate: pr?.needDate,
        note: `صدور از زمینه پروژه ${projectCode}`,
        lines,
      });
      setResult({ number: order.number, approvalRequired: order.approvalRequired });
      onCreated();
    } finally {
      setBusy(false);
    }
  }

  const fullFormHref = `/procurement/purchase-orders?project=${encodeURIComponent(projectCode)}&pr=${encodeURIComponent(prNumber)}&openForm=1`;

  return (
    <MotionShell>
      <MotionHeader onClose={onClose} />
      {result ? (
        <PoSuccess result={result} projectCode={projectCode} onClose={onClose} />
      ) : (
        <form onSubmit={submit} className="p-4 space-y-3 text-sm">
          <p className="text-xs text-muted-foreground bg-muted/40 rounded-md px-3 py-2">
            درخواست تأییدشده را با یک تأمین‌کننده به سفارش خرید تبدیل می‌کنید — پروژه {projectCode} خودکار ثبت می‌شود.
          </p>

          <label className="block">
            <span className="text-xs">درخواست خرید</span>
            <select
              className="mt-1 w-full rounded-md border px-3 py-2 bg-background"
              value={prNumber}
              onChange={(e) => setPrNumber(e.target.value)}
            >
              {options.map((o: ReadyPr) => (
                <option key={o.purchaseRequestNumber} value={o.purchaseRequestNumber}>
                  {o.purchaseRequestNumber} — {o.title.slice(0, 36)} ({formatToman(o.estimatedToman)})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs">تأمین‌کننده *</span>
            <select
              className="mt-1 w-full rounded-md border px-3 py-2 bg-background"
              value={supplierCode}
              onChange={(e) => setSupplierCode(e.target.value)}
            >
              {suppliers.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} — {s.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button type="submit" disabled={busy || !supplierCode} className="bg-rose-800">
              <ShoppingCart className="size-4 ml-1" />
              ثبت سفارش خرید
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button type="button" variant="ghost" size="sm" asChild className="mr-auto text-xs">
              <Link href={fullFormHref}>فرم کامل سفارش</Link>
            </Button>
          </div>
        </form>
      )}
    </MotionShell>
  );
}

function PoSuccess({
  result,
  projectCode,
  onClose,
}: {
  result: { number: string; approvalRequired?: boolean };
  projectCode: string;
  onClose: () => void;
}) {
  const href = `/procurement/purchase-orders?project=${encodeURIComponent(projectCode)}`;
  return (
    <div className="p-4 space-y-3 text-sm">
      <p className="font-medium text-emerald-800">سفارش {result.number} ثبت شد.</p>
      {result.approvalRequired ? (
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          مبلغ بالای آستانه PO — تأیید CFO لازم است.
        </p>
      ) : null}
      <div className="flex gap-2">
        <Button size="sm" asChild>
          <Link href={href}>مشاهده سفارش‌ها</Link>
        </Button>
        <Button size="sm" variant="outline" onClick={onClose}>
          بستن
        </Button>
      </div>
    </div>
  );
}

function MotionHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <h3 className="font-semibold text-sm flex items-center gap-2">
        <ShoppingCart className="size-4 text-rose-800" />
        صدور سفارش خرید
      </h3>
      <button type="button" onClick={onClose} className="text-muted-foreground">
        <X className="size-4" />
      </button>
    </div>
  );
}

function MotionShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background shadow-lg">{children}</div>
    </div>
  );
}
