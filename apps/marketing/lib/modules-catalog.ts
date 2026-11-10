export type ModuleMeta = {
  slug: string;
  titleFa: string;
  tagline: string;
  problem: string;
  features: string[];
  steps: string[];
  related: string[];
  plan: string;
};

export const MODULES: ModuleMeta[] = [
  {
    slug: 'finance',
    titleFa: 'مالی',
    tagline: 'دفتر کل دوطرفه، قفل دوره، خزانه',
    problem: 'پراکندگی اسناد و عدم توازن تراکنش‌ها.',
    features: ['GL دوطرفه', 'قفل دوره مالی', 'خزانه', 'گزارش مدیریتی', 'ارز چندگانه', 'دارایی ثابت'],
    steps: ['تعریف دفتر', 'صدور سند', 'تأیید', 'ثبت نهایی'],
    related: ['sales', 'bi-risk', 'inventory'],
    plan: 'Professional',
  },
  {
    slug: 'sales',
    titleFa: 'فروش',
    tagline: 'سفارش، تخفیف، تأیید گردش‌کار',
    problem: 'پیگیری مشتری و تأیید تخفیف دستی.',
    features: ['مدیریت لید', 'سفارش فروش', 'تأیید تخفیف', 'فاکتور', 'پروجکشن BI', 'Saga موجودی'],
    steps: ['ثبت لید', 'پیش‌فاکتور', 'تأیید', 'تحویل'],
    related: ['finance', 'distribution', 'retail'],
    plan: 'Growth',
  },
  {
    slug: 'hr',
    titleFa: 'منابع انسانی',
    tagline: 'حقوق، مرخصی، حضور',
    problem: 'محاسبه حقوق و مرخصی بدون تاریخ مؤثر.',
    features: ['پرونده پرسنل', 'مرخصی', 'حقوق', 'PDF فیش', 'تأیید چندمرحله‌ای', 'حضور'],
    steps: ['تعریف پرسنل', 'درخواست', 'تأیید', 'پرداخت'],
    related: ['finance', 'bi-risk', 'manufacturing'],
    plan: 'Professional',
  },
  {
    slug: 'inventory',
    titleFa: 'انبار و تدارکات',
    tagline: 'رزرو، Kanban، QC',
    problem: 'عدم دقت موجودی و وظایف انبار.',
    features: ['رزرو موجودی', 'WMS', 'Kanban', 'QC', 'بارکد', 'اتصال تولید'],
    steps: ['ورود کالا', 'QC', 'جایگذاری', 'خروج'],
    related: ['manufacturing', 'distribution', 'sales'],
    plan: 'Growth',
  },
  {
    slug: 'manufacturing',
    titleFa: 'تولید',
    tagline: 'BOM، Saga تولید',
    problem: 'هماهنگی مواد و خروجی.',
    features: ['BOM', 'دستور کار', 'Saga', 'اتصال GL', 'WIP', 'گزارش ایستایی'],
    steps: ['BOM', 'دستور', 'مصرف', 'تکمیل'],
    related: ['inventory', 'finance', 'hr'],
    plan: 'Enterprise',
  },
  {
    slug: 'retail',
    titleFa: 'خرده‌فروشی',
    tagline: 'صندوق به GL',
    problem: 'عدم یکپارچگی صندوق و حسابداری.',
    features: ['POS', 'پرداخت', 'Saga GL', 'آفلاین محدود', 'رسید', 'BI'],
    steps: ['فروش', 'پرداخت', 'ثبت GL', 'گزارش'],
    related: ['sales', 'finance', 'inventory'],
    plan: 'Growth',
  },
  {
    slug: 'distribution',
    titleFa: 'توزیع',
    tagline: 'مسیر، تحویل، Saga',
    problem: 'ردیابی تحویل و تأیید مشتری.',
    features: ['برنامه مسیر', 'تحویل', 'POD', 'Saga', 'CRM', 'اعلان'],
    steps: ['بارگیری', 'مسیر', 'تحویل', 'تأیید'],
    related: ['sales', 'inventory', 'ai-messaging'],
    plan: 'Professional',
  },
  {
    slug: 'bi-risk',
    titleFa: 'BI و ریسک',
    tagline: 'Projection-only، KPI',
    problem: 'کوئری سنگین روی OLTP.',
    features: ['داشبورد RGL', 'metric_snapshots', 'ریسک', 'Tremor', 'KPI', 'خروجی PDF'],
    steps: ['رویداد', 'Projection', 'KPI', 'هشدار'],
    related: ['finance', 'hr', 'sales'],
    plan: 'Enterprise',
  },
  {
    slug: 'ai-messaging',
    titleFa: 'AI و پیام',
    tagline: 'AI، تلگرام، SMS',
    problem: 'پشتیبانی پرحجم بدون اتوماسیون.',
    features: ['AI Chat', 'پیام‌رسان', 'VoIP', 'نظرسنجی', 'n8n', 'usage billing'],
    steps: ['کانال', 'ربات', 'تحلیل', 'اتوماسیون'],
    related: ['sales', 'distribution', 'bi-risk'],
    plan: 'Enterprise',
  },
];

export function getModule(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug);
}
