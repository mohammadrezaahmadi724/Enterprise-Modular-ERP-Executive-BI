export type RoadmapPhase = {
  id: string;
  order: number;
  titleFa: string;
  daysMin: number;
  daysMax: number;
  weightPct: number;
  critical: boolean;
  descriptionFa: string;
  deliverables: string[];
};

export const CLOUD_ONBOARDING_ROADMAP: RoadmapPhase[] = [
  {
    id: 'activate',
    order: 1,
    titleFa: 'فعال‌سازی تننت ابری',
    daysMin: 1,
    daysMax: 2,
    weightPct: 25,
    critical: true,
    descriptionFa: 'ایجاد محیط، نقش‌های پایه و ماژول‌های انتخاب‌شده.',
    deliverables: ['دسترسی کاربران', 'ماژول‌های فعال'],
  },
  {
    id: 'data',
    order: 2,
    titleFa: 'بارگذاری و آموزش',
    daysMin: 2,
    daysMax: 5,
    weightPct: 50,
    critical: true,
    descriptionFa: 'انتقال داده اولیه، جلسه آموزش و تنظیمات سازمان.',
    deliverables: ['داده تست', 'کارگاه آموزش'],
  },
  {
    id: 'go-live',
    order: 3,
    titleFa: 'شروع عملیات',
    daysMin: 1,
    daysMax: 3,
    weightPct: 25,
    critical: false,
    descriptionFa: 'پشتیبانی راه‌اندازی و پایش اولین هفته.',
    deliverables: ['چک‌لیست Go-Live'],
  },
];

export const DEFAULT_IMPLEMENTATION_ROADMAP: RoadmapPhase[] = [
  {
    id: 'discovery',
    order: 1,
    titleFa: 'تحلیل و کشف نیازمندی‌ها',
    daysMin: 4,
    daysMax: 6,
    weightPct: 15,
    critical: true,
    descriptionFa: 'جمع‌بندی فرآیندها، داده‌های اولیه و محدوده نسخه اول.',
    deliverables: ['سند Scope', 'فهرست یکپارچه‌سازی‌ها'],
  },
  {
    id: 'solution-design',
    order: 2,
    titleFa: 'طراحی راهکار و معماری',
    daysMin: 3,
    daysMax: 5,
    weightPct: 12,
    critical: true,
    descriptionFa: 'طراحی ماژول‌ها، نقش‌ها و جریان داده بین بخش‌ها.',
    deliverables: ['طرح راهکار', 'نقشه ماژول‌ها'],
  },
  {
    id: 'build',
    order: 3,
    titleFa: 'پیاده‌سازی ماژول‌های کلیدی',
    daysMin: 6,
    daysMax: 8,
    weightPct: 40,
    critical: true,
    descriptionFa: 'فروش، مالی و انبار در مسیر بحرانی؛ سایر ماژول‌ها موازی.',
    deliverables: ['ماژول‌های قابل تست', 'گزارش پیشرفت هفتگی'],
  },
  {
    id: 'integration',
    order: 4,
    titleFa: 'یکپارچه‌سازی و انتقال داده',
    daysMin: 2,
    daysMax: 3,
    weightPct: 12,
    critical: false,
    descriptionFa: 'انتقال داده و اتصال ابزارهای انتخاب‌شده.',
    deliverables: ['داده مهاجرت‌شده', 'چک‌لیست یکپارچه‌سازی'],
  },
  {
    id: 'qa',
    order: 5,
    titleFa: 'آزمون و تضمین کیفیت',
    daysMin: 4,
    daysMax: 6,
    weightPct: 14,
    critical: true,
    descriptionFa: 'تست فرآیند، امنیت و آمادگی بهره‌برداری.',
    deliverables: ['گزارش UAT', 'رفع نواقص بحرانی'],
  },
  {
    id: 'go-live',
    order: 6,
    titleFa: 'استقرار و راه‌اندازی',
    daysMin: 2,
    daysMax: 4,
    weightPct: 7,
    critical: true,
    descriptionFa: 'استقرار نهایی، آموزش اولیه و شروع بهره‌برداری.',
    deliverables: ['محیط عملیاتی', 'چک‌لیست Go-Live'],
  },
];

export const ESTIMATE_OUT_OF_SCOPE = [
  'طراحی وب‌سایت',
  'پنل اختصاصی مشتری',
  'اپلیکیشن مستقل موبایل',
  'تولید محتوا',
  'خرید تجهیزات و سخت‌افزار',
  'هزینه پیامک و سرویس‌های ثالث',
  'تغییرات خارج از نیازهای ثبت‌شده',
] as const;

export const ESTIMATE_RECURRING_NOTES = [
  {
    titleFa: 'تمدید پشتیبانی سالانه',
    noteFa: '۱۲ ماه پشتیبانی پایه رایگان است؛ هزینه پشتیبانی بعد از یک‌سال، ۲۰٪ هزینه قرارداد اولیه است.',
  },
  {
    titleFa: 'زیرساخت ابری',
    noteFa: 'هزینه زیرساخت ابری مطابق تعرفه زیرساخت ابری ساختار سیستم محاسبه می‌شود.',
  },
  {
    titleFa: 'مالیات بر ارزش افزوده',
    noteFa: 'در صورت شمول، طبق قانون به مبلغ افزوده می‌شود.',
  },
] as const;
