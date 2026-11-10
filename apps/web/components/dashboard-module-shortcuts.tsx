import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';

const MODULES = [
  { href: '/finance', label: 'مالی', desc: 'GL، خزانه، گزارش' },
  { href: '/sales', label: 'فروش', desc: 'CRM و سفارش' },
  { href: '/wms', label: 'انبار', desc: 'موجودی و WMS' },
  { href: '/hr', label: 'منابع انسانی', desc: 'پرسنل و حقوق' },
  { href: '/manufacturing', label: 'تولید', desc: 'BOM و دستور کار' },
  { href: '/bi/dashboard', label: 'BI', desc: 'KPI و داشبورد' },
] as const;

export function DashboardModuleShortcuts() {
  return (
    <section aria-label="دسترسی سریع ماژول‌ها">
      <h2 className="text-lg font-semibold mb-3">ماژول‌های فعال</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {MODULES.map((m) => (
          <Link key={m.href} href={m.href} className="group block">
            <Card className="h-full transition-shadow group-hover:shadow-md group-hover:border-primary/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{m.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
                <span className="text-xs text-primary mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                  ورود به ماژول ←
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
