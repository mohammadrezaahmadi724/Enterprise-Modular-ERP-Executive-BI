'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_ERP_MODULE_CATALOG } from '@repo/contracts';
import { MeetingDialog } from './MeetingDialog';
import { WEB_URL } from '@/lib/constants';
import { BRAND_NAME } from '@/lib/brand';

const PRODUCTS = [
  {
    href: '/pricing',
    title: 'ERP اختصاصی',
    desc: 'طراحی بر اساس فرآیند شما — برآورد ماژولار',
  },
  {
    href: '/demo',
    title: 'ERP ابری',
    desc: 'سابسکریپشن ابری با ۱۵ روز آزمایشی',
  },
  {
    href: '/pricing/estimate',
    title: 'برآورد هزینه آنلاین',
    desc: 'انتخاب ۹ ماژول و دریافت بازه قیمت',
  },
];

export function SakhtarHeader() {
  const { theme, setTheme } = useTheme();
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dark = theme === 'dark';

  const open = (which: 'modules' | 'products') => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (which === 'modules') {
      setProductsOpen(false);
      setModulesOpen(true);
    } else {
      setModulesOpen(false);
      setProductsOpen(true);
    }
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setModulesOpen(false);
      setProductsOpen(false);
    }, 200);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sakhtar-header sticky top-0 z-40 border-b">
        <div className="sakhtar-header-inner flex items-center justify-between gap-3 px-4">
          <Link href="/" className="sakhtar-header-logo flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="grid size-9 place-items-center rounded-lg border border-primary/35 bg-primary/12 text-[10px] font-bold text-primary">
              ER
            </span>
            <span className="sakhtar-header-logo-text text-base md:text-lg">{BRAND_NAME}</span>
          </Link>

          <nav className="sakhtar-header-nav hidden items-center gap-4 text-sm lg:flex" aria-label="ناوبری اصلی">
            <div
              className="sakhtar-header-dropdown relative"
              onMouseEnter={() => open('products')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="sakhtar-header-dropdown-trigger sakhtar-header-nav-link flex items-center gap-1 bg-transparent"
                aria-expanded={productsOpen}
              >
                محصولات
                <span aria-hidden className="text-[10px] opacity-70">
                  ▾
                </span>
              </button>
              {productsOpen ? (
                <div
                  className="sakhtar-header-mega-menu absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border p-2"
                  onMouseEnter={() => open('products')}
                  onMouseLeave={scheduleClose}
                >
                  {PRODUCTS.map((p) => (
                    <Link key={p.href} href={p.href} className="lcard-item block">
                      <span className="lcard-dot bg-primary" />
                      <span>
                        <span className="block text-sm font-medium">{p.title}</span>
                        <span className="block text-[11px] text-muted-foreground">{p.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div
              className="sakhtar-header-dropdown relative"
              onMouseEnter={() => open('modules')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="sakhtar-header-dropdown-trigger sakhtar-header-nav-link flex items-center gap-1 bg-transparent"
                aria-expanded={modulesOpen}
              >
                ماژول‌ها
                <span aria-hidden className="text-[10px] opacity-70">
                  ▾
                </span>
              </button>
              {modulesOpen ? (
                <div
                  className="sakhtar-header-mega-menu absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,32rem)] rounded-xl border p-3"
                  onMouseEnter={() => open('modules')}
                  onMouseLeave={scheduleClose}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    {DEFAULT_ERP_MODULE_CATALOG.map((m) => (
                      <Link key={m.code} href={`/modules/${m.code}`} className="lcard-item">
                        <span className="lcard-dot" style={{ background: m.color }} />
                        <span>
                          <span className="block text-sm font-medium">{m.nameFa}</span>
                          <span className="block text-[11px] text-muted-foreground line-clamp-1">{m.subtitle}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/pricing/estimate"
                    className="mt-2 block border-t pt-2 text-center text-xs text-primary hover:underline"
                  >
                    برآورد هزینه ماژول‌ها ←
                  </Link>
                </div>
              ) : null}
            </div>

            <Link href="/pricing" className="sakhtar-header-nav-link">
              برآورد هزینه
            </Link>
            <Link href="/about" className="sakhtar-header-nav-link">
              درباره رشد
            </Link>
            <Link href="/faq" className="sakhtar-header-nav-link">
              پرسش‌های متداول
            </Link>
            <Link href="/contact" className="sakhtar-header-nav-link">
              تماس
            </Link>
          </nav>

          <div className="sakhtar-header-actions flex items-center gap-2">
            <Link href={`${WEB_URL}/login`} className="sakhtar-header-login hidden text-sm sm:inline">
              ورود و ثبت‌نام
            </Link>
            <button
              type="button"
              className="theme-switch hidden sm:block"
              aria-label="تغییر تم"
              onClick={() => setTheme(dark ? 'light' : 'dark')}
            >
              <span
                className="absolute left-1 top-1/2 size-4 -translate-y-1/2 rounded-full bg-background shadow transition-transform"
                style={{ transform: `translate(${dark ? '1.1rem' : '0'}, -50%)` }}
              />
            </button>
            <button
              type="button"
              className="hidden rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground md:inline-flex"
              onClick={() => setMeetingOpen(true)}
            >
              رزرو جلسه
            </button>
            <button
              type="button"
              className="sakhtar-header-menu-btn lg:hidden"
              aria-label="منوی موبایل"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="hamburger" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal>
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="بستن منو"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="absolute right-0 top-0 flex h-full w-[min(100vw-18rem,20rem)] flex-col gap-1 border-l bg-background p-4 pt-20 shadow-2xl"
            dir="rtl"
          >
            <p className="mb-2 text-xs font-semibold text-muted-foreground">محصولات</p>
            {PRODUCTS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {p.title}
              </Link>
            ))}
            <p className="mb-2 mt-4 text-xs font-semibold text-muted-foreground">ماژول‌ها</p>
            {DEFAULT_ERP_MODULE_CATALOG.map((m) => (
              <Link
                key={m.code}
                href={`/modules/${m.code}`}
                className="rounded-lg px-3 py-2 text-sm hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {m.nameFa}
              </Link>
            ))}
            <hr className="my-3" />
            <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>
              برآورد هزینه
            </Link>
            <Link href="/about" className="rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>
              درباره رشد
            </Link>
            <Link href="/faq" className="rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>
              پرسش‌های متداول
            </Link>
            <Link href={`${WEB_URL}/login`} className="rounded-lg px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>
              ورود
            </Link>
            <button
              type="button"
              className="mt-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
              onClick={() => {
                setMobileOpen(false);
                setMeetingOpen(true);
              }}
            >
              رزرو جلسه
            </button>
            <button
              type="button"
              className="mt-2 rounded-lg border px-3 py-2 text-sm"
              onClick={() => setTheme(dark ? 'light' : 'dark')}
            >
              {dark ? 'حالت روشن' : 'حالت تاریک'}
            </button>
          </nav>
        </div>
      ) : null}

      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </>
  );
}
