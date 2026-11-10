import Link from 'next/link';
import { AlertBell } from './alert-bell';

export function SiteHeader() {
  return (
    <header className="border-b px-4 py-2 flex items-center justify-between" dir="rtl">
      <Link href="/dashboard" className="font-semibold">
        ERP
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/settings/notifications" className="text-sm text-muted-foreground hover:underline">
          تنظیمات اعلان
        </Link>
        <AlertBell />
      </div>
    </header>
  );
}
