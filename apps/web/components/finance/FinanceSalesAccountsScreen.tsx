'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { Percent, Plus, Store, Wallet } from 'lucide-react';
import {
  COMMISSION_SETTLEMENTS,
  SALES_OUTLETS,
  formatToman,
} from '../../lib/finance-sales-accounts-demo';

const TABS = [
  { id: 'outlets', label: 'حساب‌های فروشگاهی' },
  { id: 'settlements', label: 'تسویه پورسانت' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function FinanceSalesAccountsScreen() {
  const [tab, setTab] = useState<TabId>('outlets');

  const kpis = useMemo(() => {
    const salesMtd = SALES_OUTLETS.reduce((s, o) => s + o.salesMtdToman, 0);
    const accrued = SALES_OUTLETS.reduce((s, o) => s + o.commissionAccruedToman, 0);
    const unsettled = SALES_OUTLETS.reduce((s, o) => s + o.unsettledToman, 0);
    return { salesMtd, accrued, unsettled, count: SALES_OUTLETS.length };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        حساب‌های فروش و پورسانت — تعریف کانال فروش، نرخ پورسانت نماینده و سند تسویه؛ پس از ثبت قطعی، مانده به حساب‌های
        کنترلی فروش و پرداختنی منتقل می‌شود.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Store} label="فروش ماه جاری" value={formatToman(kpis.salesMtd)} hint={`${kpis.count} کانال`} />
        <KpiCard icon={Percent} label="پورسانت تعهدی" value={formatToman(kpis.accrued)} hint="همه کانال‌ها" />
        <KpiCard icon={Wallet} label="پورسانت معوق تسویه" value={formatToman(kpis.unsettled)} hint="در انتظار حواله/چک" />
        <KpiCard icon={Store} label="آخرین تسویه" value={COMMISSION_SETTLEMENTS[0]?.date ?? '—'} hint={COMMISSION_SETTLEMENTS[0]?.id ?? ''} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 border-b w-full sm:w-auto" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={cn(
                'shrink-0 border-b-2 px-3 py-2 text-sm transition-colors -mb-px',
                tab === t.id
                  ? 'border-primary font-semibold text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Button size="sm">
          <Plus className="size-4 ml-1" />
          کانال فروش جدید
        </Button>
      </div>

      {tab === 'outlets' ? <OutletsTable /> : <SettlementsTable />}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Store;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="finance-aging-card">
      <CardContent className="pt-4 flex gap-3">
        <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-base font-semibold truncate">{value}</p>
          {hint ? <p className="text-[10px] text-muted-foreground mt-0.5">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

function OutletsTable() {
  return (
    <Card className="finance-aging-card">
      <CardHeader>
        <CardTitle className="text-base">فهرست حساب‌های فروشگاهی و نمایندگی</CardTitle>
        <p className="text-xs text-muted-foreground">نرخ پورسانت روی فروش خالص ماه · مانده تسویه‌نشده</p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground text-xs">
              <th className="py-2 text-right font-medium">کد</th>
              <th className="py-2 text-right font-medium">عنوان</th>
              <th className="py-2 text-right font-medium">نماینده</th>
              <th className="py-2 text-right font-medium">٪ پورسانت</th>
              <th className="py-2 text-right font-medium">فروش ماه</th>
              <th className="py-2 text-right font-medium">تعهدی</th>
              <th className="py-2 text-right font-medium">معوق</th>
              <th className="py-2 text-right font-medium">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {SALES_OUTLETS.map((o) => (
              <tr key={o.id} className="border-b border-dashed hover:bg-muted/30">
                <td className="py-2.5 font-mono text-xs">{o.code}</td>
                <td className="py-2.5 max-w-[200px]">{o.name}</td>
                <td className="py-2.5">{o.representative}</td>
                <td className="py-2.5">{o.commissionPct}٪</td>
                <td className="py-2.5 font-medium">{formatToman(o.salesMtdToman)}</td>
                <td className="py-2.5">{formatToman(o.commissionAccruedToman)}</td>
                <td className="py-2.5">{formatToman(o.unsettledToman)}</td>
                <td className="py-2.5">
                  <Badge variant={o.status === 'فعال' ? 'default' : 'secondary'}>{o.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function SettlementsTable() {
  return (
    <Card className="finance-aging-card">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div>
          <CardTitle className="text-base">تسویه‌های پورسانت</CardTitle>
          <p className="text-xs text-muted-foreground">سند مالی پس از ثبت قطعی — غیرقابل حذف؛ اصلاح با سند معکوس</p>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="size-4 ml-1" />
          ثبت تسویه
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground text-xs">
              <th className="py-2 text-right">شماره</th>
              <th className="py-2 text-right">تاریخ</th>
              <th className="py-2 text-right">نماینده</th>
              <th className="py-2 text-right">مبلغ</th>
              <th className="py-2 text-right">روش</th>
              <th className="py-2 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {COMMISSION_SETTLEMENTS.map((s) => (
              <tr key={s.id} className="border-b border-dashed">
                <td className="py-2 font-mono text-xs">{s.id}</td>
                <td className="py-2">{s.date}</td>
                <td className="py-2">{s.representative}</td>
                <td className="py-2 font-medium">{formatToman(s.amountToman)}</td>
                <td className="py-2">{s.method}</td>
                <td className="py-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-600">{s.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
