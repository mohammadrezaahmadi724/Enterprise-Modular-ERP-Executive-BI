/** ناوبری یکپارچه «مالی و حسابداری» — استاندارد ایران / ERP Roshd */
export type FinanceTab = {
  id: string;
  label: string;
  href: string;
};

export const FINANCE_TABS: FinanceTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/finance' },
  { id: 'journals', label: 'اسناد حسابداری', href: '/finance/journal-entries' },
  { id: 'coa', label: 'کدینگ حساب‌ها', href: '/finance/chart-of-accounts' },
  { id: 'periods', label: 'دوره‌های مالی', href: '/finance/periods' },
  { id: 'ar', label: 'دریافتنی‌ها', href: '/finance/receivables' },
  { id: 'ap', label: 'پرداختنی‌ها', href: '/finance/payables' },
  { id: 'treasury', label: 'خزانه', href: '/treasury/dashboard' },
  { id: 'checks', label: 'چک و صیاد', href: '/treasury/checks' },
  { id: 'recon', label: 'مغایرت بانکی', href: '/finance/bank-reconciliation' },
  { id: 'sales-comm', label: 'حساب‌های فروش و پورسانت', href: '/finance/sales-accounts' },
  { id: 'vat', label: 'ارزش افزوده', href: '/finance/vat' },
  { id: 'moadian', label: 'سامانه مودیان', href: '/finance/moadian' },
  { id: 'cost', label: 'مراکز هزینه و پروژه‌ها', href: '/finance/cost-centers' },
  { id: 'close', label: 'بستن سال', href: '/finance/year-close' },
  { id: 'reports', label: 'گزارش‌ها', href: '/finance/reports' },
  { id: 'ledgers', label: 'دفترها', href: '/finance/ledgers' },
  { id: 'assistant', label: 'دستیار', href: '/finance/assistant' },
];

export const FINANCE_DASHBOARD_TILES = [
  { href: '/finance/journal-entries', label: 'دفتر کل', subtitle: 'ثبت و کنترل' },
  { href: '/treasury/dashboard', label: 'دریافت و پرداخت', subtitle: 'جریان نقدی' },
  { href: '/treasury/bank-accounts', label: 'خزانه‌داری', subtitle: 'نقدینگی' },
  { href: '/treasury/checks', label: 'مدیریت چک', subtitle: 'سررسیدها' },
  { href: '/finance/receivables', label: 'دریافتنی/پرداختنی', subtitle: 'تعهدات' },
  { href: '/finance/fixed-assets', label: 'دارایی ثابت', subtitle: 'استهلاک' },
  { href: '/finance/moadian', label: 'سامانه مودیان', subtitle: 'صورتحساب' },
  { href: '/finance/budget', label: 'بودجه و هزینه', subtitle: 'انحراف بودجه' },
  { href: '/finance/costing', label: 'بهای تمام‌شده', subtitle: 'هزینه واقعی' },
  { href: '/finance/reports', label: 'گزارش‌های مالی', subtitle: 'تحلیل مدیریتی' },
] as const;
