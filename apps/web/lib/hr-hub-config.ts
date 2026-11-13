export type HrTab = { id: string; label: string; href: string };

export const HR_TABS: HrTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/hr' },
  { id: 'employees', label: 'پرونده کارکنان', href: '/hr/employees' },
  { id: 'org', label: 'ساختار سازمانی', href: '/hr/org' },
  { id: 'attendance', label: 'حضور و غیاب', href: '/hr/attendance' },
  { id: 'leave', label: 'مرخصی', href: '/hr/leave-requests' },
  { id: 'payroll', label: 'حقوق و دستمزد', href: '/hr/payroll/run' },
  { id: 'reports', label: 'گزارش‌ها', href: '/hr/reports' },
];
