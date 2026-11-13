'use client';

import { Bot, Package } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { WMS_FORMULA_FA, WMS_TABS } from '../../lib/wms-hub-config';

export function WmsModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="inventory"
      title="انبار"
      subtitle="موجودی، حرکت کالا و ردیابی — آبان ۱۴۰۵"
      formula={WMS_FORMULA_FA}
      tabs={WMS_TABS}
      cta={{ href: '/wms/receipts?new=1', label: '+ رسید جدید' }}
      icon={Package}
      mascot={{ href: '/wms/assistant', label: 'انبار‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
