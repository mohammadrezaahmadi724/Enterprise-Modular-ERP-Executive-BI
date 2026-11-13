'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchTenantSubscription } from '../../lib/tenant-billing-api';
import { BiHubOverviewClient } from './BiHubOverviewClient';

export function BiModuleEntitlementGate() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const sub = await fetchTenantSubscription();
        const ok = sub.activeErpModules.includes('bi-risk');
        if (!cancelled) setAllowed(ok);
      } catch {
        if (!cancelled) setAllowed(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (allowed === null) {
    return <p className="p-6 text-sm text-muted-foreground">در حال بررسی entitlement ماژول BI…</p>;
  }

  if (!allowed) {
    return (
      <main className="p-6 space-y-3" dir="rtl">
        <h1 className="text-xl font-bold">BI و ریسک</h1>
        <p className="text-sm text-muted-foreground">
          این ماژول برای مستأجر فعلی در اشتراک فعال نیست. API و داشبورد تنها پس از فعال‌سازی{' '}
          <code className="text-xs">bi-risk-base</code> در دسترس است.
        </p>
        <Link href="/subscription?tab=modules" className="text-primary text-sm font-medium">
          مدیریت ماژول‌های اشتراک ←
        </Link>
      </main>
    );
  }

  return <BiHubOverviewClient />;
}
