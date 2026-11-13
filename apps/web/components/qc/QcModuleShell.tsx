'use client';

import { Bot, ClipboardCheck } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { QC_FORMULA_FA, QC_TABS } from '../../lib/qc-hub-config';

export function QcModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="qc"
      title="کنترل کیفیت"
      subtitle="بازرسی، نگه‌داری و ردیابی — زیرمجموعه تولید"
      formula={QC_FORMULA_FA}
      tabs={QC_TABS}
      cta={{ href: '/qc/inspections', label: '+ بازرسی جدید' }}
      icon={ClipboardCheck}
      mascot={{ href: '/manufacturing/orders', label: 'QC‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
