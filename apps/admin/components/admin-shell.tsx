import Link from 'next/link';
import { AdminFooter } from '@repo/ui';

const NAV = [
  ['/dashboard', 'داشبورد'],
  ['/tenants', 'Tenantها'],
  ['/subscriptions', 'اشتراک‌ها'],
  ['/plans', 'پلن‌ها'],
  ['/cloud-pricing', 'تعرفه اشتراک'],
  ['/site', 'محتوای سایت'],
  ['/billing', 'پرداخت‌ها'],
  ['/tickets', 'رزرو جلسه'],
  ['/modules', 'ماژول‌ها'],
  ['/notifications', 'Notification Hub'],
  ['/audit', 'Audit'],
  ['/break-glass', 'Break-Glass'],
  ['/feature-flags', 'Feature Flags'],
  ['/health', 'سلامت سیستم'],
  ['/docs', 'مستندات'],
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" dir="rtl">
      <aside className="w-56 border-e bg-muted/30 p-3 text-sm hidden md:block">
        <p className="font-bold mb-4">Super Admin</p>
        <nav className="flex flex-col gap-1">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="rounded px-2 py-1 hover:bg-muted">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="border-b px-4 py-2 flex justify-between text-sm">
          <span className="font-semibold">مدیریت پلتفرم</span>
          <span className="text-xs bg-amber-100 px-2 rounded">Production</span>
        </header>
        <main className="flex-1 p-4">{children}</main>
        <AdminFooter env={process.env.NEXT_PUBLIC_APP_ENV ?? 'production'} version="6.1.0-public-admin" />
      </div>
    </div>
  );
}
