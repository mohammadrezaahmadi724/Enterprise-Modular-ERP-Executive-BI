'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      document.cookie.split(';').forEach((part) => {
        const name = part.split('=')[0]?.trim();
        if (!name) return;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });
      sessionStorage.clear();
    } catch {
      /* no-op */
    }
    router.replace('/login?logout=1');
  }, [router]);

  return (
    <main className="p-8 text-center space-y-3" dir="rtl">
      <p className="text-sm text-muted-foreground">در حال خروج از نشست…</p>
      <Link href="/login" className="text-sm text-primary underline">
        بازگشت به ورود
      </Link>
    </main>
  );
}
