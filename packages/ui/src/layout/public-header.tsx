'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../primitives/theme-toggle';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

const NAV = [
  { href: '/pricing', label: 'قیمت‌گذاری' },
  { href: '/demo', label: 'دمو' },
  { href: '/blog/welcome', label: 'وبلاگ' },
  { href: '/contact', label: 'تماس' },
];

const MODULE_LINKS = [
  { href: '/modules/finance', label: 'مالی' },
  { href: '/modules/sales', label: 'فروش' },
  { href: '/modules/hr', label: 'منابع انسانی' },
  { href: '/modules/inventory', label: 'انبار' },
  { href: '/modules/bi-risk', label: 'BI و ریسک' },
  { href: '/modules/ai-messaging', label: 'AI و پیام' },
];

type PublicHeaderProps = {
  homeHref?: string;
  loginHref?: string;
  registerHref?: string;
  brand?: string;
};

export function PublicHeader({
  homeHref = '/',
  loginHref = '/login',
  registerHref = '/register',
  brand = 'ERP ابری ماژولار',
}: PublicHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-md bg-background/80 transition-[padding,box-shadow]',
        scrolled && 'shadow-[var(--shadow-soft)]',
      )}
      dir="rtl"
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2">
        پرش به محتوا
      </a>
      <motion className={cn('mx-auto flex max-w-6xl items-center justify-between gap-4 px-4', scrolled ? 'py-2' : 'py-3')}>
        <Link href={homeHref} className="font-bold text-sm md:text-base shrink-0">
          {brand}
        </Link>
        <nav className="hidden lg:flex items-center gap-4 text-sm">
          <details className="relative group">
            <summary className="cursor-pointer list-none">ماژول‌ها</summary>
            <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-background p-2 shadow-lg hidden group-open:block">
              {MODULE_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block px-2 py-1 hover:bg-muted rounded text-xs">
                  {l.label}
                </Link>
              ))}
            </div>
          </details>
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(pathname === l.href && 'text-primary font-medium')}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-xs">
          <ThemeToggle />
          <Link href={loginHref} className="hidden sm:inline hover:underline">
            ورود
          </Link>
          <Link
            href={registerHref}
            className="rounded-md px-3 py-2 text-primary-foreground font-medium"
            style={{ background: 'var(--gradient-cta)' }}
          >
            شروع رایگان
          </Link>
          <button type="button" className="lg:hidden border rounded px-2" onClick={() => setOpen((v) => !v)}>
            منو
          </button>
        </div>
      </motion>
      {open && (
        <nav className="lg:hidden border-t px-4 py-3 flex flex-col gap-2 text-sm">
          {MODULE_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {NAV.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function motion(props: React.PropsWithChildren<{ className?: string }>) {
  return <div className={props.className}>{props.children}</div>;
}
