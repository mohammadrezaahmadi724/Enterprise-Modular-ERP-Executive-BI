'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_MARKETING_SITE, mergeMarketingSite, type MarketingSiteContent } from '@repo/contracts';
import { apiBase } from './api-base';

export function useSiteContent(): MarketingSiteContent {
  const [content, setContent] = useState<MarketingSiteContent>(DEFAULT_MARKETING_SITE);

  useEffect(() => {
    let cancelled = false;
    void fetch(`${apiBase()}/api/v1/public/pricing/site`, { cache: 'no-store' })
      .then(async (res) => (res.ok ? ((await res.json()) as Partial<MarketingSiteContent>) : null))
      .then((data) => {
        if (!cancelled && data) setContent(mergeMarketingSite(data));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return content;
}
