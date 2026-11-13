'use client';

import { Bot, ShoppingCart } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { SALES_TABS } from '../../lib/sales-hub-config';

export function SalesModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="sales"
      title="فروش و CRM"
      subtitle="از سرنخ تا سفارش فروش، در یک مسیر"
      demoNote="دادهٔ نمایشی — در موج بعد به API عملیات متصل می‌شود."
      tabs={SALES_TABS}
      cta={{ href: '/sales/leads?new=1', label: '+ سرنخ جدید' }}
      icon={ShoppingCart}
      mascot={{ href: '/sales/assistant', label: 'فروش یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
