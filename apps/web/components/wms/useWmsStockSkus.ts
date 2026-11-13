'use client';

import { useEffect, useState } from 'react';
import { fetchWmsStock } from '../../lib/wms-api';

const FALLBACK_SKUS = ['PRD-1016', 'PRD-CHAY', 'PRD-BRN3', 'PRD-1001', 'PRD-FEFO'];

export function useWmsStockSkus(): string[] {
  const [skus, setSkus] = useState<string[]>(FALLBACK_SKUS);

  useEffect(() => {
    let cancelled = false;
    void fetchWmsStock()
      .then(({ stock }) => {
        if (cancelled) return;
        const fromApi = [...new Set(stock.map((s) => s.sku))];
        if (fromApi.length) setSkus(fromApi);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return skus;
}
