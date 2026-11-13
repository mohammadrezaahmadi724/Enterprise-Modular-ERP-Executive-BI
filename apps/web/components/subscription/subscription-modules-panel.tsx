'use client';

import Link from 'next/link';
import { marketingUrl } from '../../lib/marketing-url';
import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_ERP_MODULE_CATALOG,
  DEFAULT_CLOUD_SUBSCRIPTION_RATES,
  resolveModuleMonthlyTomans,
  type CloudSubscriptionRates,
  type ErpModuleCode,
} from '@repo/contracts';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
const PLAN = process.env.NEXT_PUBLIC_CLOUD_PLAN_CODE ?? 'professional';

const fmtM = (tomans: number) =>
  new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(tomans / 1_000_000));

const MODULE_ROUTES: Partial<Record<ErpModuleCode, string>> = {
  finance: '/finance',
  sales: '/sales/orders',
  inventory: '/wms/stock',
  hr: '/hr',
  manufacturing: '/manufacturing',
  distribution: '/distribution',
  retail: '/retail',
  'bi-risk': '/bi/dashboard',
  'ai-messaging': '/messaging',
};

export function SubscriptionModulesPanel() {
  const [rates, setRates] = useState<CloudSubscriptionRates>(DEFAULT_CLOUD_SUBSCRIPTION_RATES);
  const [activeModules, setActiveModules] = useState<ErpModuleCode[]>(['finance', 'sales', 'inventory', 'hr']);

  useEffect(() => {
    void fetch(`${API}/api/v1/public/pricing/cloud-subscription`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: CloudSubscriptionRates) => setRates({ ...DEFAULT_CLOUD_SUBSCRIPTION_RATES, ...data }))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    import('../../lib/tenant-billing-api')
      .then(({ fetchTenantSubscription }) => fetchTenantSubscription())
      .then((sub) => {
        if (sub.activeErpModules?.length) setActiveModules(sub.activeErpModules as ErpModuleCode[]);
      })
      .catch(() => undefined);
  }, []);

  const catalog = useMemo(() => DEFAULT_ERP_MODULE_CATALOG.filter((m) => m.active), []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        تعرفه ماهانه هر ماژول (تومان) — هم‌منبع با برآوردگر و چک‌اوت
        {rates.source !== 'defaults' ? (
          <span className="block text-xs mt-1">منبع تعرفه: {rates.source}</span>
        ) : null}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
        {catalog.map((m) => {
          const active = activeModules.includes(m.code);
          const monthly = resolveModuleMonthlyTomans(m.code, rates);
          const href = MODULE_ROUTES[m.code];
          return (
            <ModuleCard key={m.code} title={m.nameFa} subtitle={m.subtitle} accent={m.color}>
              <div className="flex items-center justify-between gap-2 mt-2">
                <span className={active ? 'text-green-600 text-xs font-medium' : 'text-muted-foreground text-xs'}>
                  {active ? 'فعال در اشتراک' : 'غیرفعال'}
                </span>
                <span className="text-xs font-semibold" dir="ltr">
                  {monthly > 0 ? `${fmtM(monthly)} م‌ت/ماه` : '—'}
                </span>
              </div>
              {active && href ? (
                <Link href={href} className="block text-primary text-xs mt-2 hover:underline">
                  ورود به ماژول
                </Link>
              ) : (
                <Link
                  href={marketingUrl(`/checkout/plan/${PLAN}?modules=${m.code}&step=2&utm_source=subscription`)}
                  className="block text-xs mt-2 text-primary hover:underline"
                >
                  افزودن به اشتراک
                </Link>
              )}
            </ModuleCard>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground border-t pt-3">
        پایه ابری: {fmtM(rates.baseMonthlyTomans)} میلیون تومان/ماه (شامل {rates.includedSeats} کاربر) • کاربر اضافه{' '}
        {new Intl.NumberFormat('fa-IR').format(rates.extraSeatTomans / 1000)} هزار تومان/ماه
      </p>
    </div>
  );
}

function ModuleCard({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-3" style={{ borderInlineStart: `3px solid ${accent}` }}>
      <p className="font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      {children}
    </div>
  );
}
