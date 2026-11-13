'use client';

import { Bot, Factory } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { MANUFACTURING_TABS, MFG_FORMULA_FA } from '../../lib/manufacturing-hub-config';

export function ManufacturingModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="manufacturing"
      title="تولید"
      subtitle="BOM، سفارش کار و WIP — کارخانه آبان ۱۴۰۴"
      formula={MFG_FORMULA_FA}
      tabs={MANUFACTURING_TABS}
      cta={{ href: '/manufacturing/orders', label: '+ سفارش تولید' }}
      icon={Factory}
      mascot={{ href: '/manufacturing/reports', label: 'کارخانه‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
