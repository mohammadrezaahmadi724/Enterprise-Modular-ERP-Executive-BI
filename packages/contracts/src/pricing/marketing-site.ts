export const MARKETING_SITE_SETTING_KEY = 'marketing_site_v1';

export type MarketingFaqItem = { q: string; a: string };
export type MarketingAboutPoint = { title: string; body: string };

export type MarketingSiteContent = {
  phoneDisplay: string;
  phoneTel: string;
  heroBadge: string;
  heroTitleLead: string;
  heroTitleAccent: string;
  heroTitleRest: string;
  heroBody: string;
  heroProofs: string[];
  pricingBadge: string;
  pricingTitle: string;
  pricingAccent: string;
  pricingBody: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutBody: string;
  aboutPoints: MarketingAboutPoint[];
  faqTitle: string;
  faqIntro: string;
  faq: MarketingFaqItem[];
};

export const DEFAULT_MARKETING_SITE: MarketingSiteContent = {
  phoneDisplay: '۰۲۱۹۱۰۹۵۵۹۰',
  phoneTel: '+982191095590',
  heroBadge: 'ERP ماژولار ابری و اختصاصی برای سازمان‌های در حال رشد',
  heroTitleLead: 'ERP ابری و اختصاصی،',
  heroTitleAccent: 'متناسب با فرآیند واقعی',
  heroTitleRest: 'سازمان شما',
  heroBody:
    'فروش، مالی، انبار، تولید، منابع انسانی و داشبورد مدیریتی در یک پلتفرم. ماژول را خودتان انتخاب می‌کنید، برآورد را آنلاین می‌بینید و جلسهٔ مشاوره را از همین صفحه رزرو می‌کنید.',
  heroProofs: [
    'برآورد هزینه از کاتالوگ قیمت سوپر ادمین',
    'دورهٔ آزمایشی ERP ابری',
    'گزارش مدیریتی از مدل خواندنی، بدون فشار روی سند روزانه',
  ],
  pricingBadge: 'قیمت و هزینه ERP',
  pricingTitle: 'برآورد هزینه متناسب با',
  pricingAccent: 'فرآیند سازمان شما',
  pricingBody:
    'قیمت یک عدد ثابت برای همه نیست. تعداد کاربران، ماژول‌های فعال، سطح سفارشی‌سازی و انتقال داده محدوده را مشخص می‌کند. اعداد از تعرفهٔ ماژول و اشتراک ابری در پنل سوپر ادمین می‌آیند.',
  aboutKicker: 'درباره رشد',
  aboutTitle: 'یک ERP که ماژولش را خود سازمان انتخاب می‌کند',
  aboutBody:
    'رشد برای تیم‌هایی است که نمی‌خواهند همهٔ سیستم را یکجا بخرند. مالی، عملیات، انبار، پروژه و منابع انسانی جدا فعال می‌شوند و تعرفهٔ هر کدام از پنل سوپر ادمین کنترل می‌شود.',
  aboutPoints: [
    { title: 'ابری یا اختصاصی', body: 'اشتراک ماهانه برای شروع سریع، یا برآورد پیاده‌سازی وقتی فرآیند خاص دارید.' },
    { title: 'قیمت شفاف', body: 'کاتالوگ ماژول و نرخ صندلی اضافه همان منبع برآوردگر و چک‌اوت است.' },
    { title: 'جلسهٔ واقعی', body: 'رزرو تلفنی، آنلاین یا حضوری مستقیم در صف سوپر ادمین ثبت می‌شود.' },
  ],
  faqTitle: 'پرسش‌های متداول',
  faqIntro: 'اگر پاسخ این‌جا نبود، جلسه رزرو کنید یا با شمارهٔ تماس بالای سایت حرف بزنید.',
  faq: [
    {
      q: 'برآورد هزینه از کجا می‌آید؟',
      a: 'از کاتالوگ ماژول و تعرفهٔ اشتراک ابری که سوپر ادمین ذخیره کرده است. تغییر قیمت در پنل، برآوردگر را هم عوض می‌کند.',
    },
    {
      q: 'رزرو جلسه کجا دیده می‌شود؟',
      a: 'درخواست در بخش سرنخ‌های سوپر ادمین با دستهٔ رزرو جلسه می‌نشیند؛ وضعیت را همان‌جا باز، در حال بررسی یا بسته می‌کنید.',
    },
    {
      q: 'ERP ابری با پیاده‌سازی اختصاصی چه فرقی دارد؟',
      a: 'ابری اشتراک ماهانه با صندلی و ماژول است. اختصاصی برآورد پروژه است: هسته، ماژول، سفارشی‌سازی، کاربران و انتقال داده.',
    },
    {
      q: 'آیا بدون ساخت حساب می‌توان قیمت دید؟',
      a: 'بله. برآوردگر نتیجه را بعد از تأیید شماره نشان می‌دهد و حساب ERP جداگانه است.',
    },
  ],
};

export function mergeMarketingSite(patch: Partial<MarketingSiteContent> | null | undefined): MarketingSiteContent {
  const base = DEFAULT_MARKETING_SITE;
  if (!patch || typeof patch !== 'object') return base;
  return {
    ...base,
    ...patch,
    heroProofs: Array.isArray(patch.heroProofs) && patch.heroProofs.length ? patch.heroProofs : base.heroProofs,
    aboutPoints: Array.isArray(patch.aboutPoints) && patch.aboutPoints.length ? patch.aboutPoints : base.aboutPoints,
    faq: Array.isArray(patch.faq) && patch.faq.length ? patch.faq : base.faq,
  };
}
