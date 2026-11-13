'use client';

import { Users } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { HR_TABS } from '../../lib/hr-hub-config';

export function HrModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="hr"
      title="منابع انسانی"
      subtitle="پرسنل، حضور و حقوق"
      tabs={HR_TABS}
      cta={{ href: '/hr/employees', label: '+ پرونده پرسنل' }}
      icon={Users}
    >
      {children}
    </SakhtarModuleShell>
  );
}
