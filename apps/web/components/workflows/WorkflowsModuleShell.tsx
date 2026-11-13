'use client';

import { Bot, GitBranch } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { WORKFLOW_FORMULA_FA, WORKFLOWS_TABS } from '../../lib/workflows-hub-config';

export function WorkflowsModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="workflows"
      title="گردش‌کار و تأییدات"
      subtitle="کارتابل تأیید، تفویض و ارجاع"
      formula={WORKFLOW_FORMULA_FA}
      tabs={WORKFLOWS_TABS}
      cta={{ href: '/workflows/my-tasks', label: 'کارتابل من' }}
      icon={GitBranch}
      mascot={{ href: '/workflows/my-tasks', label: 'تأیید‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
