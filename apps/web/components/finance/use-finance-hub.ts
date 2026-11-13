'use client';

import { useEffect, useState } from 'react';
import { fetchFinanceHub, type FinanceHubResponse } from '../../lib/finance-api';

export function useFinanceHub() {
  const [hub, setHub] = useState<FinanceHubResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchFinanceHub()
      .then((h) => {
        setHub(h);
        setError(null);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { hub, error, loading };
}
