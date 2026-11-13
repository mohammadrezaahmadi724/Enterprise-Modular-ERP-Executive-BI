'use client';

import { Bot, Package } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { PROCUREMENT_TABS } from '../../lib/procurement-hub-config';

export function ProcurementModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="procurement"
      title="خرید و تأمین"
      subtitle="درخواست خرید تا رسید انبار"
      tabs={PROCUREMENT_TABS}
      cta={{ href: '/procurement/purchase-requests/new', label: '+ درخواست خرید' }}
      icon={Package}
      mascot={{ href: '/procurement/reports', label: 'تأمین‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
