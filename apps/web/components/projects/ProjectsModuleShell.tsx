'use client';

import { Bot, FolderKanban } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { PROJECTS_TABS } from '../../lib/projects-hub-config';

export function ProjectsModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="projects"
      title="پروژه‌ها و کارها"
      subtitle="پروژه‌یار — کار، یادآور و تیم"
      tabs={PROJECTS_TABS}
      cta={{ href: '/projects/projects', label: '+ پروژه جدید' }}
      icon={FolderKanban}
      mascot={{ href: '/projects/personal', label: 'پروژه‌یار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
