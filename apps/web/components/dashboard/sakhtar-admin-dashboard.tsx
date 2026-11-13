'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import {
  fetchTenantDashboardKpis,
  formatBillionsFa,
  formatIntegerFa,
  formatMillionsFa,
  type DashboardKpiMap,
} from '../../lib/tenant-dashboard-kpis';

const NEEDS_ACTION = [
  { text: '۳۸ مشتری ماندهٔ معوق دارند', href: '/finance/receivables' },
  { text: '۵ درخواست خرید در انتظار تأیید', href: '/procurement/purchase-requests' },
  { text: '۲ سند حسابداری پیش‌نویس مانده', href: '/finance/journal-entries' },
  { text: '۱ رسید انبار بدون تطبیق', href: '/wms/receipts' },
];

const TASKS = [
  { title: 'ارائه کاتالوگ و نمونه کالا', overdue: '۲۴۵ روز' },
  { title: 'جلسه مذاکره شرایط پرداخت', overdue: '۴ روز' },
  { title: 'تماس پیگیری نیاز خرید', overdue: '۱ روز' },
];

const QUICK = [
  { label: 'طرف حساب جدید', href: '/sales/customers' },
  { label: 'سفارش فروش جدید', href: '/sales/orders' },
  { label: 'درخواست خرید جدید', href: '/procurement/purchase-requests/new' },
  { label: 'سند حسابداری جدید', href: '/finance/journal-entries' },
];

function greetingFa() {
  const h = new Date().getHours();
  if (h < 12) return 'صبح بخیر';
  if (h < 17) return 'عصر بخیر';
  return 'شب بخیر';
}

function buildKpiCards(kpis: DashboardKpiMap | null) {
  const sales = kpis?.monthly_sales;
  const overdueAr = kpis?.overdue_ar;
  const openOrders = kpis?.open_orders;

  return [
    {
      href: '/sales',
      title: 'فروش خالص ماه',
      value: sales != null ? formatMillionsFa(sales) : '۹۰٫۳',
      unit: 'میلیون تومان',
      delta: sales != null ? 'از read model ماه جاری' : '▼ ۶۸٫۸٪',
      deltaNote: sales != null ? 'projection_sales_summary' : 'نسبت به ماه قبل',
      tone: 'blue' as const,
    },
    {
      href: '/finance/receivables',
      title: 'دریافتنی سررسید گذشته',
      value: overdueAr != null ? formatBillionsFa(overdueAr) : '۱٫۴۸',
      unit: 'میلیارد تومان',
      delta: overdueAr != null ? 'projection_financial_summary' : '۳۸ مشتری بدهکار',
      deltaNote: overdueAr != null ? '' : '۸۵٪ از کل دریافتنی',
      tone: 'green' as const,
    },
    {
      href: '/wms/stock',
      title: 'کالای بدون موجودی قابل استفاده',
      value: '۰',
      unit: '',
      delta: '۶ رزرو فعال',
      deltaNote: '',
      tone: 'amber' as const,
    },
    {
      href: '/workflows',
      title: 'سفارش باز / تأیید معوق',
      value: openOrders != null ? formatIntegerFa(openOrders) : '۷',
      unit: openOrders != null ? 'سفارش' : 'مورد',
      delta: openOrders != null ? 'از projection فروش' : '۵ سفارش · ۲ سند',
      deltaNote: '',
      tone: 'sky' as const,
    },
  ];
}

export function SakhtarAdminDashboard() {
  const [kpis, setKpis] = useState<DashboardKpiMap | null>(null);

  useEffect(() => {
    void fetchTenantDashboardKpis()
      .then(setKpis)
      .catch(() => setKpis(null));
  }, []);

  const kpiCards = useMemo(() => buildKpiCards(kpis), [kpis]);
  const actionCount = kpis?.open_orders ?? 128;

  return (
    <div className="tc-dashboard space-y-5" dir="rtl">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">
            {formatIntegerFa(actionCount)} مورد نیازمند اقدام در سازمان
            {kpis ? ' · KPI از metric_snapshots' : ''}
          </p>
          <h1 className="text-2xl font-bold mt-1">
            {greetingFa()}، <span className="text-primary">مدیرعامل</span>
          </h1>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((k) => (
          <Link key={k.title} href={k.href} className={`tc-kpi-card tc-kpi-${k.tone}`}>
            <span className="tc-kpi-title">{k.title}</span>
            <span className="tc-kpi-value">
              {k.value}
              {k.unit ? <small> {k.unit}</small> : null}
            </span>
            <span className="tc-kpi-delta">{k.delta}</span>
            {k.deltaNote ? <span className="tc-kpi-note">{k.deltaNote}</span> : null}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <Link key={q.href} href={q.href} className="tc-quick-chip">
            + {q.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="tc-panel">
          <h2 className="tc-panel-title">نیازمند اقدام</h2>
          <ul className="space-y-2">
            {NEEDS_ACTION.map((row) => (
              <li key={row.text} className="tc-action-row">
                <CircleAlert className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="flex-1 text-sm">{row.text}</span>
                <Link href={row.href} className="tc-btn-review">
                  بررسی
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="tc-panel">
          <h2 className="tc-panel-title">کارهای من</h2>
          <ul className="space-y-2">
            {TASKS.map((t) => (
              <li key={t.title} className="tc-task-row">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 text-sm">{t.title}</span>
                <span className="text-[10px] text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                  معوق: {t.overdue}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
