import Link from 'next/link';

const BREAKDOWN_ROWS = [
  {
    factor: 'هسته پلتفرم',
    detail: 'احراز هویت، چندمستأجری، Outbox، اعلان',
    effect: 'high' as const,
    note: 'ثابت در هر پروژه',
  },
  {
    factor: 'ماژول‌های انتخابی',
    detail: '۹ خانواده ERP — قیمت از کاتالوگ ادمین',
    effect: 'high' as const,
    note: 'جمع ماژول‌ها',
  },
  {
    factor: 'سفارشی‌سازی فرآیند',
    detail: 'گردش‌کار، فیلد سفارشی، چاپ',
    effect: 'mid' as const,
    note: 'بعد از جلسه تحلیل',
  },
  {
    factor: 'تعداد کاربر / شعبه',
    detail: 'سطح دسترسی و مقیاس عملیاتی',
    effect: 'mid' as const,
    note: 'پلن یا Enterprise',
  },
  {
    factor: 'مهاجرت داده',
    detail: 'از Excel، سیستم قدیمی یا چند منبع',
    effect: 'mid' as const,
    note: 'بر اساس حجم',
  },
  {
    factor: 'Integration',
    detail: 'درگاه، پیامک، BI خارجی، n8n',
    effect: 'low' as const,
    note: 'اختیاری',
  },
  {
    factor: 'آموزش و پشتیبانی',
    detail: 'Onboarding تیم و SLA',
    effect: 'low' as const,
    note: 'قرارداد سالانه',
  },
];

const FAQ_ITEMS = [
  {
    q: 'آیا این برآورد همان فاکتور نهایی است؟',
    a: 'خیر. بازه اولیه بر اساس کاتالوگ ماژول و هسته سیستم است. پس از جلسه تحلیل فرآیند، سفارشی‌سازی و مهاجرت داده محدوده نهایی اصلاح می‌شود.',
  },
  {
    q: 'تفاوت ERP ابری و ERP اختصاصی چیست؟',
    a: 'ERP ابری سابسکریپشن ماژولار با پیکربندی استاندارد است. ERP اختصاصی روی فرآیند واقعی سازمان شما طراحی و تحویل می‌شود — معمولاً با همان هسته فنی.',
  },
  {
    q: 'چند ماژول برای شروع کافی است؟',
    a: 'بسیاری از سازمان‌ها با مالی + فروش + انبار شروع می‌کنند و به‌تدریج BI، تولید یا HR را اضافه می‌کنند. در برآورد آنلاین ترکیب دلخواه را امتحان کنید.',
  },
  {
    q: 'آیا بدون ساخت حساب می‌توانم برآورد بگیرم؟',
    a: 'بله. صفحه برآورد هزینه و رزرو جلسه بدون ثبت‌نام در ERP ابری در دسترس است.',
  },
];

export function PricingTrustRow() {
  return (
    <div className="pl-trust mx-4">
      <span>🔒 بدون ارسال خودکار اطلاعات مالی</span>
      <span>📋 کاتالوگ قیمت از پنل ادمین</span>
      <span>⏱ حدود ۲ دقیقه برآورد اولیه</span>
      <span>📞 جلسه تحلیل فرآیند رایگان برای طرح جدی</span>
    </div>
  );
}

export function PricingBreakdownTable() {
  return (
    <section className="pl-section mx-auto max-w-4xl px-4 py-12" id="breakdown">
      <div className="pl-kicker text-xs text-primary mb-2">عوامل هزینه</div>
      <h2 className="text-2xl font-bold mb-4">چه چیزهایی روی قیمت اثر می‌گذارند؟</h2>
      <div className="pl-table-wrap">
        <table className="pl-table">
          <thead>
            <tr className="bg-muted/40 text-xs">
              <th>عامل</th>
              <th>توضیح</th>
              <th>اثر</th>
              <th>یادداشت</th>
            </tr>
          </thead>
          <tbody>
            {BREAKDOWN_ROWS.map((r) => (
              <tr key={r.factor}>
                <td className="font-medium">{r.factor}</td>
                <td className="text-muted-foreground">{r.detail}</td>
                <td>
                  <span className={`pl-effect ${r.effect}`}>
                    {r.effect === 'high' ? 'زیاد' : r.effect === 'mid' ? 'متوسط' : 'کم'}
                  </span>
                </td>
                <td className="text-xs text-muted-foreground">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function PricingFaqSection() {
  return (
    <section className="est-faq mx-auto max-w-3xl px-4 py-12 pb-20" id="faq">
      <h2 className="text-2xl font-bold mb-6 text-center">سوالات متداول قیمت ERP</h2>
      {FAQ_ITEMS.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  );
}

export function PricingStickyCta() {
  return (
    <Link href="/pricing/estimate" className="est-sticky-start est-primary rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground shadow-lg">
      شروع برآورد
    </Link>
  );
}
