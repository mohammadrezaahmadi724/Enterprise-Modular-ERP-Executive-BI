'use client';

import { Bot, Truck } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { DIST_FORMULA_FA, DISTRIBUTION_TABS } from '../../lib/distribution-hub-config';

export function DistributionModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="distribution"
      title="توزیع و پخش"
      subtitle="مسیر، تحویل و تسویه ویزیتوری"
      formula={DIST_FORMULA_FA}
      tabs={DISTRIBUTION_TABS}
      cta={{ href: '/distribution/deliveries', label: '+ تحویل جدید' }}
      icon={Truck}
      mascot={{ href: '/distribution/reports', label: 'پخش‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
