export const PROJECTS_HUB_KPIS = {
  activeProjects: 10,
  nearingDeadlineCount: 1,
  openTasks: 40,
  overdueTasks: 22,
  todayTasksInbox: 0,
};

export const PROJECTS_META_COUNT = 21;
export const TASKS_META_COUNT = 79;
export const REMINDERS_META_COUNT = 30;
export const PERSONAL_OPEN_COUNT = 36;

export type DemoProject = {
  code: string;
  name: string;
  deadline?: string;
  status: string;
  delayDays?: number;
};

export const DEMO_PROJECTS: DemoProject[] = [
  { code: 'PRJ-0007', name: 'پروژه اعمار ه ای تاور', deadline: '۱۴۰۵/۰۷/۰۱', status: 'active', delayDays: 50 },
  { code: 'PRJ-0403-02', name: 'راه‌اندازی شعبه اصفهان', deadline: '۱۴۰۵/۰۷/۲۳', status: 'active', delayDays: 28 },
  { code: 'PRJ-0999', name: 'test', deadline: '۱۴۰۵/۰۷/۳۰', status: 'active', delayDays: 21 },
  { code: 'PRJ-0998', name: 'طظزطز', deadline: '۱۴۰۵/۰۷/۳۰', status: 'active', delayDays: 21 },
  { code: 'PRJ-0012', name: 'راه‌اندازی شعبه و مرکز توزیع اصفهان', deadline: '۱۴۰۵/۰۸/۰۸', status: 'active', delayDays: 13 },
  { code: 'PRJ-0018', name: 'کمپین بازاریابی و فروش سازمانی پاییزه', deadline: '۱۴۰۵/۰۸/۱۳', status: 'active', delayDays: 8 },
];

export type TaskStatus = 'not_started' | 'in_progress' | 'done';

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  not_started: 'انجام نشده',
  in_progress: 'در حال انجام',
  done: 'انجام شده',
};

export const TASK_PRIORITY_LABEL = { low: 'پایین', medium: 'متوسط', high: 'بالا' } as const;
