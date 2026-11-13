'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogoutPage() {
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
    router.replace('/');
  }, [router]);

  return (
    <main className="p-8 text-center space-y-3" dir="rtl">
      <p className="text-sm text-muted-foreground">نشست محلی پاک شد.</p>
      <Link href="/" className="text-sm text-primary underline">
        بازگشت به داشبورد پلتفرم
      </Link>
    </main>
  );
}
