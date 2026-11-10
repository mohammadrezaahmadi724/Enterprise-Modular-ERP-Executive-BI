'use client';

import { useState } from 'react';

type Col = 'Pending' | 'InTransit' | 'Delivered';
type Card = { id: string; title: string; col: Col };

const columns: { id: Col; title: string }[] = [
  { id: 'Pending', title: 'در انتظار' },
  { id: 'InTransit', title: 'در مسیر' },
  { id: 'Delivered', title: 'تحویل‌شده' },
];

const seed: Card[] = [
  { id: 'd1', title: 'سفارش ۱۰۲۴', col: 'Pending' },
  { id: 'd2', title: 'سفارش ۱۰۲۵', col: 'InTransit' },
];

export function DeliveryKanban() {
  const [cards, setCards] = useState(seed);

  function move(id: string, col: Col) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, col } : c)));
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {columns.map((col) => (
        <section key={col.id} className="rounded-lg border bg-muted/30 p-3 min-h-[200px]">
          <h2 className="text-sm font-semibold mb-3">{col.title}</h2>
          <ul className="space-y-2">
            {cards
              .filter((c) => c.col === col.id)
              .map((c) => (
                <li key={c.id} className="rounded border bg-background p-2 text-sm shadow-sm">
                  <p>{c.title}</p>
                  <ColumnMoveActions col={col.id} onMove={(next: Col) => move(c.id, next)} />
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ColumnMoveActions({ col, onMove }: { col: Col; onMove: (c: Col) => void }) {
  const next: Col | null =
    col === 'Pending' ? 'InTransit' : col === 'InTransit' ? 'Delivered' : null;
  if (!next) return null;
  return (
    <button type="button" className="mt-2 text-xs text-primary underline" onClick={() => onMove(next)}>
      انتقال به ستون بعد
    </button>
  );
}
