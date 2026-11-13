'use client';

import { useEffect, useState } from 'react';
import { fetchWmsFefoPick, type WmsFefoPickApi, type WmsLineApi } from '../../lib/wms-api';
import { WmsFefoPickPanel } from './WmsFefoPickPanel';

type LinePick = {
  key: string;
  pick: WmsFefoPickApi | null;
  loading: boolean;
};

function lineKey(line: WmsLineApi, index: number): string {
  return `${index}:${line.sku}:${line.warehouse}:${line.quantity}`;
}

export function WmsFefoPickLinesPanel({ lines }: { lines: WmsLineApi[] }) {
  const [picks, setPicks] = useState<LinePick[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      const next: LinePick[] = lines.map((line, index) => ({
        key: lineKey(line, index),
        pick: null,
        loading: Boolean(line.sku && line.warehouse && line.quantity > 0),
      }));
      setPicks(next);

      await Promise.all(
        lines.map(async (line, index) => {
          if (!line.sku || !line.warehouse || line.quantity <= 0) return;
          try {
            const { pick } = await fetchWmsFefoPick(line.sku, line.warehouse, line.quantity);
            if (cancelled) return;
            setPicks((prev) =>
              prev.map((p, i) => (i === index ? { ...p, pick, loading: false } : p)),
            );
          } catch {
            if (cancelled) return;
            setPicks((prev) => prev.map((p, i) => (i === index ? { ...p, loading: false } : p)));
          }
        }),
      );
    }

    const handle = setTimeout(() => void refresh(), 280);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [lines]);

  if (!lines.length) return null;

  return (
    <div className="space-y-3 px-1">
      {lines.map((line, index) => {
        const state = picks[index];
        return (
          <div key={state?.key ?? index} className="rounded-md border bg-background/60 px-3 py-2">
            <p className="text-[11px] text-muted-foreground mb-1">
              قلم {(index + 1).toLocaleString('fa-IR')}: {line.sku} @ {line.warehouse} ×{' '}
              {line.quantity.toLocaleString('fa-IR')}
            </p>
            <WmsFefoPickPanel pick={state?.pick ?? null} loading={state?.loading} />
          </div>
        );
      })}
    </div>
  );
}
