import Link from 'next/link';

const LINKS = [
  ['/site', 'متن صفحه اصلی، درباره و پرسش‌ها'],
  ['/modules', 'قیمت ماژول‌ها'],
  ['/cloud-pricing', 'تعرفه اشتراک و صندلی'],
  ['/tickets', 'رزرو جلسه و برآورد'],
] as const;

export function CommercialDeskNav() {
  return (
    <nav className="mb-4 flex flex-wrap gap-2" dir="rtl" aria-label="کنترل تجاری سایت">
      {LINKS.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium shadow-sm hover:border-primary"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
