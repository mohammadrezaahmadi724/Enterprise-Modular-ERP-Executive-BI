'use client';

import { useEffect, useState } from 'react';
import { fetchMasterDataOverview } from '../lib/projects-master-data-api';
import { masterDataHiddenMenuHrefs } from '../lib/master-data-sidebar';

export function useMasterDataEntitlements() {
  const [entitlements, setEntitlements] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await fetchMasterDataOverview();
        if (cancelled) return;
        setEntitlements(data.entitlements);
      } catch {
        if (!cancelled) setEntitlements({});
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    entitlements,
    loaded,
    hiddenMenuHrefs: masterDataHiddenMenuHrefs(entitlements),
  };
}
