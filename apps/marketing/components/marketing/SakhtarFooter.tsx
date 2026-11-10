import Link from 'next/link';
import { DEFAULT_ERP_MODULE_CATALOG } from '@repo/contracts';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/brand';

const INDUSTRIES = [
  { label: 'بازرگانی', href: '/contact' },
  { label: 'تولید', href: '/contact' },
  { label: 'پخش', href: '/contact' },
  { label: 'خدمات', href: '/contact' },
];

export function SakhtarFooter() {
  return (
    <footer className="sakhtar-footer" dir="rtl" lang="fa">
      <div className="sakhtar-footer__shell">
        <div className="sakhtar-footer__main grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <section className="sakhtar-footer__brand">
            <div className="sakhtar-footer__brand-title">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-xs font-bold text-primary"
                aria-hidden
              >
                ER
              </span>
              <strong>{BRAND_NAME}</strong>
            </div>
            <p className="sakhtar-footer__slogan">{BRAND_TAGLINE}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ERP ابری برای شروع سریع و ERP اختصاصی برای فرآیند واقعی سازمان — برآورد آنلاین از همان کاتالوگ ادمین.
            </p>
            <div className="sakhtar-footer__contact-lines mt-4 text-sm">
              <Link href="/contact" className="text-primary hover:underline">
                تماس با ما
              </Link>
            </div>
          </section>

          <nav className="sakhtar-footer__columns grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-label="لینک‌های فوتر">
            <section className="sakhtar-footer__column">
              <h2>ماژول‌ها</h2>
              <ul>
                {DEFAULT_ERP_MODULE_CATALOG.map((m) => (
                  <li key={m.code}>
                    <Link href={`/modules/${m.code}`}>{m.nameFa}</Link>
                  </li>
                ))}
              </ul>
              <Link className="sakhtar-footer__hub" href="/pricing/estimate">
                برآورد هزینه ←
              </Link>
            </section>
            <section className="sakhtar-footer__column">
              <h2>صنایع</h2>
              <ul>
                {INDUSTRIES.map((i) => (
                  <li key={i.label}>
                    <Link href={i.href}>{i.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
            <section className="sakhtar-footer__column">
              <h2>{BRAND_NAME}</h2>
              <ul>
                <li>
                  <Link href="/pricing">برآورد هزینه</Link>
                </li>
                <li>
                  <Link href="/demo">ERP ابری</Link>
                </li>
                <li>
                  <Link href="/contact">تماس</Link>
                </li>
                <li>
                  <Link href="/legal/privacy">حریم خصوصی</Link>
                </li>
              </ul>
            </section>
          </nav>
        </div>

        <nav className="sakhtar-footer__legal" aria-label="لینک‌های حقوقی">
          <Link href="/legal/privacy">حریم خصوصی</Link>
          <Link href="/legal/terms">شرایط استفاده</Link>
          <Link href="/legal/security">امنیت</Link>
        </nav>
        <div className="sakhtar-footer__copyright mt-4 text-center text-xs text-muted-foreground">
          © 2026 {BRAND_NAME}
        </div>
      </div>
    </footer>
  );
}
