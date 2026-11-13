'use client';

import Link from 'next/link';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { Factory } from 'lucide-react';
import { MFG_HUB_KPIS, MFG_WORK_ORDERS_PREVIEW } from '../../lib/manufacturing-demo';

export function ManufacturingHubOverviewClient() {
  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="کارخانه‌یار"
        description="ظرفیت خطوط، کسری مواد و گلوگاه QC را از projection تولید رصد می‌کند."
        upsell="تحلیل پیشرفته OEE و پیش‌بینی توقف در پلن سازمانی فعال است."
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="سفارش کار باز"
          value={nf.format(MFG_HUB_KPIS.openWorkOrders)}
          sub="در خطوط فعال"
        />
        <SakhtarModuleKpi label="WIP (واحد)" value={nf.format(MFG_HUB_KPIS.wipUnits)} />
        <SakhtarModuleKpi label="OEE تقریبی" value={`${nf.format(MFG_HUB_KPIS.oeePct)}٪`} sub="snapshot ماه" />
        <SakhtarModuleKpi label="نگه‌داری QC" value={nf.format(MFG_HUB_KPIS.qcHold)} sub="منتظر بازرسی" />
      </section>

      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Factory className="size-4" />
            سفارش‌های تولید اخیر
          </CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/manufacturing/orders">همه سفارش‌ها</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50 text-muted-foreground">
                <th className="py-2 px-2 text-right">کد</th>
                <th className="py-2 px-2 text-right">محصول</th>
                <th className="py-2 px-2 text-right">تعداد</th>
                <th className="py-2 px-2 text-right">ایستگاه</th>
                <th className="py-2 px-2 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {MFG_WORK_ORDERS_PREVIEW.map((r) => (
                <tr key={r.code} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2 px-2 font-mono">
                    <Link href="/manufacturing/orders" className="hover:text-primary">
                      {r.code}
                    </Link>
                  </td>
                  <td className="py-2 px-2">{r.product}</td>
                  <td className="py-2 px-2 tabular-nums">{nf.format(r.qty)}</td>
                  <td className="py-2 px-2">{r.workCenter}</td>
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
