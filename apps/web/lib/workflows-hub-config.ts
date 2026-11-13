export type WorkflowsTab = { id: string; label: string; href: string };

export const WORKFLOW_FORMULA_FA = 'تأیید = گام جاری + نقش مجاز + workflow_instance Running';

export const WORKFLOWS_TABS: WorkflowsTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/workflows' },
  { id: 'my-tasks', label: 'کارتابل من', href: '/workflows/my-tasks' },
  { id: 'admin', label: 'تعریف گردش‌کار', href: '/admin/workflows' },
];
