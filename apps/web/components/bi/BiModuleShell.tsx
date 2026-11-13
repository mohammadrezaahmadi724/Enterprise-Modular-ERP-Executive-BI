'use client';

import { BarChart3, Radar } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { BI_FORMULA_FA, BI_TABS } from '../../lib/bi-hub-config';

export function BiModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="bi"
      title="BI و ریسک"
      subtitle="KPI مدیریتی و رادار هشدار — فقط Read Model"
      formula={BI_FORMULA_FA}
      tabs={BI_TABS}
      cta={{ href: '/bi/dashboard', label: 'داشبورد مدیرعامل' }}
      icon={BarChart3}
      mascot={{ href: '/bi/risk-radar', label: 'رادار ریسک', icon: Radar }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
