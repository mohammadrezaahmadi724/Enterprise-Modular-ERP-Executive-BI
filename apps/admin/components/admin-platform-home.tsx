import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  Building2,
  CreditCard,
  Package,
  Shield,
  Sparkles,
  Ticket,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Badge, Button, Card, CardContent, GradientText, KPICard } from '@repo/ui';

const QUICK_LINKS: { href: string; title: string; desc: string; icon: LucideIcon; accent: string }[] = [
  {
    href: '/tenants',
    title: 'مستأجران',
    desc: 'Provisioning، دامنه و صورتحساب',
    icon: Users,
    accent: 'from-blue-500/20 to-primary/5',
  },
  {
    href: '/subscriptions',
    title: 'اشتراک‌ها',
    desc: 'تمدید، ارتقا و seat',
    icon: CreditCard,
    accent: 'from-violet-500/20 to-primary/5',
  },
  {
    href: '/plans',
    title: 'پلن‌ها',
    desc: 'قیمت‌گذاری ماژولار',
    icon: Package,
    accent: 'from-amber-500/15 to-primary/5',
  },
  {
    href: '/cloud-pricing',
    title: 'تعرفه ابری',
    desc: 'برآوردگر مارکتینگ و اشتراک ماهانه',
    icon: CreditCard,
    accent: 'from-sky-500/15 to-primary/5',
  },
  {
    href: '/tickets',
    title: 'تیکت‌ها',
    desc: 'پشتیبانی SaaS',
    icon: Ticket,
    accent: 'from-rose-500/15 to-primary/5',
  },
  {
    href: '/modules',
    title: 'ماژول‌ها',
    desc: 'Entitlement و نسخه',
    icon: Sparkles,
    accent: 'from-emerald-500/15 to-primary/5',
  },
  {
    href: '/break-glass',
    title: 'Break-Glass',
    desc: 'دسترسی اضطراری ثبت‌شده',
    icon: Shield,
    accent: 'from-red-500/10 to-primary/5',
  },
];

const ACTIVITY = [
  { text: 'ثبت‌نام Tenant · arman-industry', time: '۱۲ دقیقه پیش', tone: 'default' as const },
  { text: 'پرداخت موفق · پلن Enterprise', time: '۴۵ دقیقه پیش', tone: 'ok' as const },
  { text: 'تیکت #۴۸۱ · اولویت بالا', time: '۲ ساعت پیش', tone: 'warn' as const },
];

const BAR_HEIGHTS = [42, 68, 55, 82, 61, 74, 48, 88, 70, 58];

export function AdminPlatformHome() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-bl from-primary/[0.12] via-background to-background shadow-[var(--shadow-card)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
          }}
        />
        <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1.5 border-0 bg-primary/10 text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Platform Plane
              </Badge>
              <Badge variant="outline">نسخه ۶.۱</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              <GradientText>کنسول مدیریت پلتفرم</GradientText>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              اشتراک، پرداخت، ماژول و پشتیبانی SaaS در یک نما. داده‌های عملیاتی ERP مستأجر فقط از مسیر Break-Glass با مجوز
              زمان‌دار و ثبت کامل audit قابل مشاهده است.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="default" className="shadow-[var(--shadow-soft)]">
                <Link href="/dashboard" className="inline-flex items-center gap-2">
                  داشبورد عملیاتی
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/health" className="inline-flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  سلامت سرویس‌ها
                </Link>
              </Button>
            </div>
            <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-border/80 pt-5">
              {[
                ['۹۹٫۹٪', 'آپتایم ۳۰ روز'],
                ['۲۴۰ms', 'P95 API'],
                ['۰', 'نشست Break-Glass'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-xs text-muted-foreground">{l}</dt>
                  <dd className="mt-0.5 text-lg font-semibold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-violet-500/20 opacity-60 blur-lg" />
            <Card className="relative overflow-hidden border-primary/20 bg-card/90 shadow-[var(--shadow-elevated)] backdrop-blur-sm">
              <div className="border-b border-border/80 bg-muted/30 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Building2 className="h-4 w-4 text-primary" />
                    نمای لحظه‌ای پلتفرم
                  </div>
                  <Badge variant="success">عملیاتی</Badge>
                </div>
              </div>
              <CardContent className="space-y-5 p-4">
                <div className="flex items-end justify-between gap-1.5 h-24 px-1">
                  {BAR_HEIGHTS.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/80 to-primary/30 transition-opacity hover:opacity-100 opacity-90"
                      style={{ height: `${h}%` }}
                      title="نمونه MRR هفتگی"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    ['Tenant جدید امروز', '+۳'],
                    ['Checkout موفق', '۱۷'],
                    ['Worker صف', 'عادی'],
                    ['Outbox lag', '۰.۸s'],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg border bg-background/80 px-3 py-2">
                      <p className="text-muted-foreground">{k}</p>
                      <p className="font-semibold text-foreground">{v}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Tenant فعال"
          value="۵۴۲"
          tag="OPS"
          delta="▴ ۳٪"
          deltaLabel="هفته قبل"
          status="رشد پایدار"
          statusTone="ok"
        />
        <KPICard
          title="MRR"
          value="۱۲۴M"
          tag="BILL"
          hint="ریال · projection"
          delta="▴ ۷٪"
          deltaLabel="ماه قبل"
          statusTone="ok"
        />
        <KPICard
          title="تیکت باز"
          value="۱۲"
          tag="SUP"
          status="۳ بحرانی"
          statusTone="warn"
          delta="▾ ۲"
          deltaLabel="دیروز"
        />
        <KPICard
          title="Break-Glass"
          value="۰"
          tag="SEC"
          status="بدون نشست فعال"
          statusTone="ok"
          delta="—"
          deltaLabel="۲۴h"
        />
      </section>

      <section>
        <Box className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold">میانبرهای مدیریتی</h2>
            <p className="text-sm text-muted-foreground">دسترسی سریع به حوزه‌های پرتکرار Platform Plane</p>
          </div>
          <Link href="/audit" className="text-sm font-medium text-primary hover:underline">
            گزارش ممیزی →
          </Link>
        </Box>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition group-hover:opacity-100`}
                />
                <Box className="relative flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-semibold">
                      {item.title}
                      <ArrowLeft className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-70" />
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{item.desc}</span>
                  </span>
                </Box>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <Card className="border-dashed border-primary/25 bg-primary/[0.03] lg:col-span-2">
          <CardContent className="flex h-full flex-col justify-center gap-3 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">ایزولاسیون مستأجر</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              این کنسول روی schemaهای <code className="rounded bg-muted px-1 text-xs">platform_*</code> کار می‌کند. هر دسترسی
              به داده ERP داخلی مستأجر نیازمند Break-Glass، تایید دومرحله‌ای و لاگ در{' '}
              <code className="rounded bg-muted px-1 text-xs">sensitive_access_logs</code> است.
            </p>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href="/break-glass">سیاست Break-Glass</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">رویدادهای اخیر</h3>
              <Badge variant="secondary">نمونه</Badge>
            </div>
            <ul className="space-y-3">
              {ACTIVITY.map((row) => (
                <li
                  key={row.text}
                  className="flex items-start justify-between gap-4 rounded-lg border border-transparent px-2 py-2 transition hover:border-border hover:bg-muted/40"
                >
                  <span className="text-sm">
                    <span
                      className={
                        row.tone === 'warn'
                          ? 'text-amber-600 dark:text-amber-400'
                          : row.tone === 'ok'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : ''
                      }
                    >
                      ●
                    </span>{' '}
                    {row.text}
                  </span>
                  <time className="shrink-0 text-xs text-muted-foreground">{row.time}</time>
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="mt-4 inline-block text-sm text-primary hover:underline">
              مشاهده همه در داشبورد →
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={props.className}>{props.children}</div>;
}
