'use client';

import { Bot, Store } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { RETAIL_FORMULA_FA, RETAIL_TABS } from '../../lib/retail-hub-config';

export function RetailModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="retail"
      title="خرده‌فروشی"
      subtitle="شعب، صندوق و کمپین — فروش حضوری و آنلاین"
      formula={RETAIL_FORMULA_FA}
      tabs={RETAIL_TABS}
      cta={{ href: '/retail/pos', label: '+ تراکنش POS' }}
      icon={Store}
      mascot={{ href: '/retail/reports', label: 'فروش‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
