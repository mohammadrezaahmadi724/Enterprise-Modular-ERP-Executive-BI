/** ناوبری «فروش و CRM» — ERP Roshd */
export type SalesTab = {
  id: string;
  label: string;
  href: string;
};

export const SALES_TABS: SalesTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/sales' },
  { id: 'leads', label: 'سرنخ‌ها', href: '/sales/leads' },
  { id: 'customers', label: 'مشتریان', href: '/sales/customers' },
  { id: 'activities', label: 'فعالیت‌ها و پیگیری‌ها', href: '/sales/activities' },
  { id: 'quotes', label: 'پیش‌فاکتورها', href: '/sales/quotes' },
  { id: 'orders', label: 'سفارش‌های فروش', href: '/sales/orders' },
  { id: 'invoices', label: 'فاکتورهای فروش', href: '/sales/invoices' },
  { id: 'returns', label: 'برگشت از فروش', href: '/sales/returns' },
  { id: 'my', label: 'فروش من', href: '/sales/my-sales' },
  { id: 'team', label: 'عملکرد تیم فروش', href: '/sales/team-performance' },
  { id: 'contacts', label: 'پایگاه تماس', href: '/sales/contacts' },
  { id: 'sms', label: 'پنل پیامک', href: '/sales/sms' },
  { id: 'assistant', label: 'دستیار', href: '/sales/assistant' },
];

export const SALES_DASHBOARD_TILES = [
  { href: '/sales/leads', label: 'قیف فروش', subtitle: '۹۶ سرنخ در جریان' },
  { href: '/sales/quotes', label: 'پیش‌فاکتور', subtitle: 'پیشنهاد قیمت' },
  { href: '/sales/orders', label: 'سفارش', subtitle: 'تعهد تحویل' },
  { href: '/sales/invoices', label: 'فاکتور', subtitle: 'صدور و مودیان' },
  { href: '/sales/activities', label: 'پیگیری‌ها', subtitle: 'اقدام بعدی' },
  { href: '/sales/team-performance', label: 'تیم فروش', subtitle: 'شاخص ماه' },
] as const;

export const DEFAULT_PIPELINE_NAME = 'خط فروش پیش‌فرض';
export const OPEN_LEADS_META_COUNT = 96;
