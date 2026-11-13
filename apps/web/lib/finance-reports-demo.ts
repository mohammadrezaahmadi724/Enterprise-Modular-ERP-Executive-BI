export type FinanceReportDef = {
  id: string;
  category: 'financial' | 'management' | 'tax' | 'inventory';
  title: string;
  subtitle: string;
  lastRun: string | null;
  formats: Array<'pdf' | 'xlsx' | 'on-screen'>;
};

export const REPORT_CATEGORIES: Record<FinanceReportDef['category'], string> = {
  financial: 'مالی و حسابداری',
  management: 'مدیریتی',
  tax: 'مالیاتی',
  inventory: 'انبار و بهای تمام‌شده',
};

export const FINANCE_REPORTS: FinanceReportDef[] = [
  { id: 'trial', category: 'financial', title: 'تراز آزمایشی', subtitle: 'دو/چهار/شش/هشت ستونی', lastRun: '۱۴۰۵/۰۸/۱۹', formats: ['pdf', 'xlsx', 'on-screen'] },
  { id: 'gl', category: 'financial', title: 'دفتر کل', subtitle: 'گردش حساب‌ها — دوره جاری', lastRun: '۱۴۰۵/۰۸/۱۸', formats: ['pdf', 'xlsx'] },
  { id: 'sl', category: 'financial', title: 'دفتر معین', subtitle: 'تفصیلی طرف‌حساب', lastRun: null, formats: ['pdf', 'xlsx', 'on-screen'] },
  { id: 'pnl', category: 'management', title: 'صورت سود و زیان', subtitle: 'دفتر قانونی · آبان ۱۴۰۵', lastRun: '۱۴۰۵/۰۸/۲۰', formats: ['pdf', 'xlsx'] },
  { id: 'bs', category: 'management', title: 'ترازنامه', subtitle: 'وضعیت مالی — تجمیعی', lastRun: '۱۴۰۵/۰۸/۲۰', formats: ['pdf', 'xlsx'] },
  { id: 'cashflow', category: 'management', title: 'صورت جریان وجوه نقد', subtitle: 'مستقیم — یادداشت‌های پیوست', lastRun: null, formats: ['pdf', 'xlsx'] },
  { id: 'vat', category: 'tax', title: 'اظهارنامه ارزش افزوده', subtitle: 'دوره آبان ۱۴۰۵', lastRun: null, formats: ['pdf', 'xlsx'] },
  { id: 'stock', category: 'inventory', title: 'کارتکس و مانده انبار', subtitle: 'FIFO — انبار مرکزی', lastRun: '۱۴۰۵/۰۸/۱۷', formats: ['xlsx', 'on-screen'] },
];
