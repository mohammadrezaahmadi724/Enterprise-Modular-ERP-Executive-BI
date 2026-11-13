export type BiTab = { id: string; label: string; href: string };

export const BI_FORMULA_FA = 'شاخص‌ها فقط از metric_snapshots / projection_* — بدون تجمع OLTP';

export const BI_TABS: BiTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/bi' },
  { id: 'dashboard', label: 'داشبورد مدیرعامل', href: '/bi/dashboard' },
  { id: 'risk', label: 'رادار ریسک', href: '/bi/risk-radar' },
];
