import Link from 'next/link';
import { Badge, Card, CardContent, CardHeader, CardTitle, KPICard, PageHeader } from '@repo/ui';

export default function AdminDashboardPage() {
  const nf = new Intl.NumberFormat('fa-IR');
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-card/80 p-6 shadow-sm">
        <PageHeader
          title="داشبورد پلتفرم"
          description="شاخص‌های SaaS از metric_snapshots و projection_* — بدون دسترسی مستقیم به OLTP مستأجر"
          action={<Badge variant="success">سیستم پایدار</Badge>}
        />
        <Box className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Tenant فعال', value: '۵۴۲', tag: 'OPS', delta: '▴ ۳٪', status: 'رشد ارگانیک', tone: 'ok' as const },
            { title: 'MRR', value: `${nf.format(124)}M`, tag: 'BILL', delta: '▴ ۷٪', status: 'ماه جاری', tone: 'ok' as const },
            { title: 'تیکت باز', value: '۱۲', tag: 'SUP', delta: '▾ ۲', status: 'نیاز پیگیری', tone: 'warn' as const },
            { title: 'Break-Glass', value: '۰', tag: 'SEC', delta: '—', status: 'بدون ریسک', tone: 'ok' as const },
          ].map((k) => (
            <KPICard
              key={k.title}
              title={k.title}
              value={k.value}
              tag={k.tag}
              delta={k.delta}
              deltaLabel="هفته قبل"
              status={k.status}
              statusTone={k.tone}
            />
          ))}
        </Box>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>دسترسی سریع</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {[
              ['/health', 'سلامت سرویس‌ها'],
              ['/tenants', 'لیست Tenant'],
              ['/monitoring', 'مانیتورینگ'],
              ['/audit', 'گزارش ممیزی'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:border-primary/50 hover:bg-muted/50"
              >
                {label}
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>آخرین رویدادها</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <Box className="flex justify-between gap-4 border-b pb-2">
              <span>ثبت‌نام Tenant جدید</span>
              <span className="shrink-0 text-xs">۲ ساعت پیش</span>
            </Box>
            <Box className="flex justify-between gap-4 border-b pb-2">
              <span>ارتقای پلن · demo-company</span>
              <span className="shrink-0 text-xs">۵ ساعت پیش</span>
            </Box>
            <Box className="flex justify-between gap-4">
              <span>پرداخت موفق درگاه</span>
              <span className="shrink-0 text-xs">دیروز</span>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={props.className}>{props.children}</div>;
}
