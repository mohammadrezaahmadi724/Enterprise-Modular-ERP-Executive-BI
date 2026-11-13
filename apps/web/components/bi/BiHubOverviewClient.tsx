'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { BarChart3, Radar } from 'lucide-react';
import { fetchTenantDashboardKpis, formatIntegerFa } from '../../lib/tenant-dashboard-kpis';

const DEMO_KPIS = {
  revenue: 42800000000,
  openOrders: 214,
  arOverdue: 6100000000,
  inventoryTurns: 2.4,
};

export function BiHubOverviewClient() {
  const [kpis, setKpis] = useState(DEMO_KPIS);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const map = await fetchTenantDashboardKpis();
        if (cancelled) return;
        setKpis({
          revenue: map.month_revenue ?? map.revenue_month ?? DEMO_KPIS.revenue,
          openOrders: map.open_sales_orders ?? DEMO_KPIS.openOrders,
          arOverdue: map.ar_overdue ?? DEMO_KPIS.arOverdue,
          inventoryTurns: map.inventory_turns ?? DEMO_KPIS.inventoryTurns,
        });
        setSource('metric_snapshots /api/bi/kpis');
      } catch {
        if (!cancelled) setSource(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="تحلیل‌یار مدیرعامل"
        description="شاخص‌ها فقط از projection و metric_snapshots خوانده می‌شوند — بدون تجمع مستقیم روی OLTP."
        active
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi variant="primary" label="فروش ماه (نمونه)" value={formatBillions(kpis.revenue)} sub="میلیارد تومان" />
        <SakhtarModuleKpi label="سفارش باز" value={formatIntegerFa(kpis.openOrders)} />
        <SakhtarModuleKpi label="مطالبات معوق" value={formatBillions(kpis.arOverdue)} />
        <SakhtarModuleKpi label="گردش موجودی" value={`${kpis.inventoryTurns.toLocaleString('fa-IR')}×`} />
      </section>
      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="size-4" />
              داشبورد مدیریتی
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>KPI مدیرعامل، دیوار شاخص و پنل قابل تنظیم.</p>
            <Button className="bg-rose-800 hover:bg-rose-900" asChild>
              <Link href="/bi/dashboard">ورود به داشبورد</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-xl border shadow-sm">
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Radar className="size-4" />
              رادار ریسک
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>هشدار بین‌ماژولی و رویدادهای زنده API ریسک.</p>
            <Button variant="outline" asChild>
              <Link href="/bi/risk-radar">باز کردن رادار</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function formatBillions(amount: number): string {
  const billions = amount / 10_000_000_000;
  return new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 1 }).format(billions);
}
