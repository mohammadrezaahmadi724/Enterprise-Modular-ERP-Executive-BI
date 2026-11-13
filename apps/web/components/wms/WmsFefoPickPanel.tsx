'use client';

import type { WmsFefoPickApi } from '../../lib/wms-api';

type Props = {
  pick: WmsFefoPickApi | null;
  loading?: boolean;
};

export function WmsFefoPickPanel({ pick, loading }: Props) {
  if (loading) {
    return <p className="text-xs text-muted-foreground">محاسبهٔ تخصیص FEFO…</p>;
  }
  if (!pick) {
    return (
      <p className="text-xs text-muted-foreground">
        پس از انتخاب کالا، انبار و مقدار، پیش‌نمایش بچ‌ها (اول انقضا) اینجا نشان داده می‌شود — بدون کسر موجودی.
      </p>
    );
  }

  if (pick.allocations.length === 0) {
    return (
      <p className="text-xs text-amber-700">
        بچ فعالی برای {pick.sku} در {pick.warehouse} یافت نشد (موجودی بچ: {pick.batchOnHand.toLocaleString('fa-IR')})
      </p>
    );
  }

  return (
    <div className="rounded-md border border-emerald-200/80 bg-emerald-50/60 px-3 py-2 text-xs space-y-2">
      <p className="font-medium text-emerald-950">پیش‌نمایش Pick-by-FEFO</p>
      <table className="w-full">
        <thead>
          <tr className="text-muted-foreground">
            <th className="text-right py-1">بچ</th>
            <th className="text-right py-1">انقضا</th>
            <th className="text-right py-1">مقدار</th>
          </tr>
        </thead>
        <tbody>
          {pick.allocations.map((a) => (
            <tr key={a.batchNo} className="border-t border-emerald-100">
              <td className="py-1 font-mono">{a.batchNo}</td>
              <td className="py-1">{a.expiryDate ?? '—'}</td>
              <td className="py-1 tabular-nums">{a.qty.toLocaleString('fa-IR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pick.uncoveredQty > 0 ? (
        <p className="text-amber-800">کسری تخصیص: {pick.uncoveredQty.toLocaleString('fa-IR')} واحد</p>
      ) : (
        <p className="text-emerald-800">کل مقدار با بچ‌های فعلی پوشش داده می‌شود.</p>
      )}
    </div>
  );
}
