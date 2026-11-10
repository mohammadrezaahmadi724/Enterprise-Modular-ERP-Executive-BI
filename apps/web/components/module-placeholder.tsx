import Link from 'next/link';
import { Badge, Card, CardContent, CardHeader, CardTitle, EmptyState, PageHeader, type TenantMenuItem, type TenantMenuModule } from '@repo/ui';

export function ModulePlaceholder({
  module,
  item,
}: {
  module: TenantMenuModule;
  item: TenantMenuItem;
}) {
  const Icon = module.icon;
  return (
  <>
    <PageHeader
      title={item.label}
      description={item.subtitle ?? module.label}
      action={
        <Badge variant="secondary" className="font-normal">
          موج طراحی ۶.۱
        </Badge>
      }
    />
    <Card className="border-dashed">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <CardTitle className="text-base">{item.label}</CardTitle>
          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
        </div>
      </CardHeader>
      <CardContent>
        <EmptyState
          title="صفحه عملیاتی در حال آماده‌سازی"
          description="ساختار منو، مسیر URL و استاندارد RBAC هم‌اکنون متصل است. داده از projection و API ماژول در موج بعدی فعال می‌شود."
        />
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/dashboard" className="text-sm text-primary hover:underline">
            بازگشت به داشبورد
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link href={module.items[0]?.href ?? '/dashboard'} className="text-sm text-primary hover:underline">
            سایر بخش‌های {module.label}
          </Link>
        </div>
      </CardContent>
    </Card>
  </>
  );
}

export function ModuleHub({ module }: { module: TenantMenuModule }) {
  const Icon = module.icon;
  return (
    <>
      <PageHeader title={module.label} description="انتخاب بخش عملیاتی" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {module.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10">
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </span>
              <div>
                <p className="font-semibold">{item.label}</p>
                {item.subtitle && <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
