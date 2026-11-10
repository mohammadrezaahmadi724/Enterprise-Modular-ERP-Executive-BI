'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
export function Nav() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur bg-background/80" dir="rtl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <Link href="/" className="font-bold text-lg">
          ERP ابری
        </Link>
        <div className="hidden md:flex gap-4">
          <Link href="/modules/finance">ماژول‌ها</Link>
          <Link href="/pricing">قیمت‌ها</Link>
          <Link href="/blog/welcome">بلاگ</Link>
          <Link href="/demo">دمو</Link>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-xs border rounded px-2 py-1"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'روشن' : 'تیره'}
          </button>
          <Link href="/demo" className="rounded-md bg-primary px-3 py-2 text-primary-foreground text-xs">
            شروع رایگان
          </Link>
        </div>
      </nav>
    </header>
  );
}
