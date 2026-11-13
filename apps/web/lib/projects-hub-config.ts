export type ProjectsTab = { id: string; label: string; href: string };

export const PROJECTS_TABS: ProjectsTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/projects' },
  { id: 'list', label: 'پروژه‌ها', href: '/projects/projects' },
  { id: 'tasks', label: 'کارها', href: '/projects/tasks' },
  { id: 'personal', label: 'کارهای شخصی', href: '/projects/personal' },
  { id: 'reminders', label: 'یادآورها', href: '/projects/reminders' },
  { id: 'overdue', label: 'عقب‌افتاده', href: '/projects/overdue' },
];
