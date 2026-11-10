'use client';

import { useMemo, useState } from 'react';

export default function NewPurchaseRequestPage() {
  const [lines, setLines] = useState([{ name: 'کالا ۱', qty: 2, price: 150_000 }]);
  const total = useMemo(() => lines.reduce((s, l) => s + l.qty * l.price, 0), [lines]);
  const fmt = new Intl.NumberFormat('fa-IR');

  return (
    <main className="p-6 max-w-xl space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">درخواست خرید جدید</h1>
      {lines.map((line, i) => (
        <div key={line.name} className="flex gap-2 text-sm">
          <span className="flex-1">{line.name}</span>
          <span>{fmt.format(line.qty * line.price)} ریال</span>
          <button
            type="button"
            className="text-xs text-destructive"
            onClick={() => setLines((prev) => prev.filter((_, j) => j !== i))}
          >
            حذف
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-sm underline"
        onClick={() => setLines((p) => [...p, { name: `کالا ${p.length + 1}`, qty: 1, price: 100_000 }])}
      >
        افزودن خط
      </button>
      <p className="font-semibold">جمع: {fmt.format(total)} ریال</p>
    </main>
  );
}
