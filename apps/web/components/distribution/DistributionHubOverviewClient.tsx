'use client';

import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { Truck } from 'lucide-react';
import { DIST_DELIVERIES_PREVIEW, DIST_HUB_KPIS } from '../../lib/distribution-demo';

export function DistributionHubOverviewClient() {
  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="پخش‌یار"
        description="تأخیر تحویل، مانده تسویه ویزیتور و مسیرهای پرترافیک را گزارش می‌دهد."
        upsell="مسیریابی هوشمند و بهینه‌سازی بار در اشتراک حرفه‌ای."
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="تحویل به‌موقع"
          value={`${nf.format(DIST_HUB_KPIS.onTimePct)}٪`}
          sub="۳۰ روز اخیر"
        />
        <SakhtarModuleKpi label="مسیر فعال" value={nf.format(DIST_HUB_KPIS.activeRoutes)} />
        <SakhtarModuleKpi label="تحویل معوق" value={nf.format(DIST_HUB_KPIS.pendingDeliveries)} />
        <SakhtarModuleKpi label="تسویه باز" value={nf.format(DIST_HUB_KPIS.openSettlements)} />
      </section>

      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Truck className="size-4" />
            تحویل‌های امروز
          </CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/distribution/deliveries">همه تحویل‌ها</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50 text-muted-foreground">
                <th className="py-2 px-2 text-right">کد</th>
                <th className="py-2 px-2 text-right">مسیر</th>
                <th className="py-2 px-2 text-right">تعداد</th>
                <th className="py-2 px-2 text-right">خودرو</th>
                <th className="py-2 px-2 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {DIST_DELIVERIES_PREVIEW.map((r) => (
                <tr key={r.code} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2 px-2 font-mono">
                    <Link href="/distribution/deliveries" className="hover:text-primary">
                      {r.code}
                    </Link>
                  </td>
                  <td className="py-2 px-2">{r.route}</td>
                  <td className="py-2 px-2 tabular-nums">{nf.format(r.qty)}</td>
                  <td className="py-2 px-2 font-mono text-[11px]">{r.vehicle}</td>
                  <td className="py-2 px-2">
                    <Badge variant="secondary" className="font-normal">
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
