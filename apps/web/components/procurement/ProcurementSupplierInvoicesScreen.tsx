'use client';

import { useEffect, useState } from 'react';
import { fetchProcurementSupplierInvoices, type SupplierInvoiceRow } from '../../lib/procurement-api';

export function ProcurementSupplierInvoicesScreen() {
  const [rows, setRows] = useState<SupplierInvoiceRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchProcurementSupplierInvoices();
        if (!cancelled) setRows(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'خطا');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="sk-module-page space-y-4">
      <h2 className="text-xl font-bold">فاکتور تأمین‌کننده (AP)</h2>
      <p className="text-sm text-muted-foreground">
        از سفارش‌های خرید با رسید انبار (partial/full) مشتق می‌شود — برای چرخه خرید end-to-end.
      </p>
      {error ? <p className="text-sm text-amber-700">{error}</p> : null}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-xs">
              <th className="p-2 text-right">شماره AP</th>
              <th className="p-2 text-right">PO</th>
              <th className="p-2 text-right">تأمین‌کننده</th>
              <th className="p-2 text-right">مبلغ (تومان)</th>
              <th className="p-2 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  فعلاً فاکتوری نیست — ابتدا PO را دریافت (receive) کنید.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.number} className="border-b">
                  <td className="p-2 font-mono text-xs">{r.number}</td>
                  <td className="p-2">{r.poNumber}</td>
                  <td className="p-2">{r.supplierName}</td>
                  <td className="p-2 tabular-nums">{nf.format(r.amountToman)}</td>
                  <td className="p-2">{r.status === 'posted' ? 'ثبت‌شده' : 'پیش‌نویس'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
