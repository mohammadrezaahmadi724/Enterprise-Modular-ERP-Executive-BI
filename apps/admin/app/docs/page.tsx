import Link from 'next/link';

const SECTIONS = [
  {
    title: 'مستأجر و دسترسی',
    items: [
      ['/tenants', 'مستأجران'],
      ['/users', 'کاربران پلتفرم'],
      ['/subscriptions', 'اشتراک‌ها'],
      ['/permissions', 'مجوزها'],
      ['/roles', 'نقش‌ها'],
    ],
  },
  {
    title: 'تجاری',
    items: [
      ['/plans', 'پلن‌ها'],
      ['/cloud-pricing', 'تعرفه اشتراک'],
      ['/modules', 'کاتالوگ ماژول'],
      ['/billing', 'فاکتور SaaS'],
      ['/site', 'محتوای سایت'],
      ['/tickets', 'رزرو جلسه'],
    ],
  },
  {
    title: 'عملیات پلتفرم',
    items: [
      ['/health', 'سلامت سرویس، صف و Redis'],
      ['/audit', 'ممیزی'],
      ['/break-glass', 'دسترسی اضطراری Break-Glass'],
      ['/feature-flags', 'Feature Flags'],
      ['/notifications', 'اعلان‌ها'],
      ['/notification-templates', 'قالب ایمیل'],
    ],
  },
] as const;

export default function DocsPage() {
  return (
    <main className="space-y-6" dir="rtl">
      <header>
        <h1 className="text-lg font-bold">مستندات عملیاتی</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          کنسول سوپرادمین فقط لایهٔ SaaS است: اشتراک، تعرفه، مستأجر و سلامت پلتفرم. دادهٔ عملیاتی هر
          سازمان (مالی، فروش، انبار) داخل پنل مستأجر است و از اینجا باز نمی‌شود مگر با رویهٔ Break-Glass.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {SECTIONS.map((section) => (
          <section key={section.title} className="rounded-xl border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold">{section.title}</h2>
            <ul className="space-y-2 text-sm">
              {section.items.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-primary hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
