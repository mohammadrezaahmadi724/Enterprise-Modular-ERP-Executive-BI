'use client';

import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { Store } from 'lucide-react';
import { RETAIL_HUB_KPIS, RETAIL_STORES_PREVIEW } from '../../lib/retail-demo';
import { formatToman } from '../../lib/finance-receivables-demo';

export function RetailHubOverviewClient() {
  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="فروش‌یار"
        description="فروش شعب، شیفت‌های باز صندوق و اثر کمپین‌ها را از snapshot خرده‌فروشی نشان می‌دهد."
        upsell="POS چندشعبه‌ای و باشگاه مشتریان یکپارچه در پلن بالاتر."
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="شعب فعال"
          value={nf.format(RETAIL_HUB_KPIS.activeStores)}
          sub="با تراکنش ۷ روز"
        />
        <SakhtarModuleKpi
          label="فروش امروز"
          value={formatToman(RETAIL_HUB_KPIS.todayPosToman)}
          sub="میلیون تومان"
        />
        <SakhtarModuleKpi label="شیفت باز" value={nf.format(RETAIL_HUB_KPIS.openShifts)} />
        <SakhtarModuleKpi label="کمپین جاری" value={nf.format(RETAIL_HUB_KPIS.promoCampaigns)} />
      </section>

      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Store className="size-4" />
            عملکرد شعب
          </CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/retail/stores">همه شعب</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50 text-muted-foreground">
                <th className="py-2 px-2 text-right">کد</th>
                <th className="py-2 px-2 text-right">شعبه</th>
                <th className="py-2 px-2 text-right">فروش روز</th>
                <th className="py-2 px-2 text-right">کانال</th>
                <th className="py-2 px-2 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {RETAIL_STORES_PREVIEW.map((r) => (
                <tr key={r.code} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2 px-2 font-mono">
                    <Link href="/retail/stores" className="hover:text-primary">
                      {r.code}
                    </Link>
                  </td>
                  <td className="py-2 px-2">{r.store}</td>
                  <td className="py-2 px-2 tabular-nums">{r.amount}</td>
                  <td className="py-2 px-2">{r.channel}</td>
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
