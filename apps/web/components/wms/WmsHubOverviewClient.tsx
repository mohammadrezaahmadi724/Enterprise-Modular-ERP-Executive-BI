'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { ArrowUpRight, Boxes, Clock } from 'lucide-react';
import {
  WMS_OVERVIEW_KPIS,
  WMS_RECENT_MOVEMENTS,
  WMS_STOCK_PREVIEW,
  type WmsMovement,
} from '../../lib/wms-demo-data';
import { fetchWmsOverview, type WmsStockRowApi } from '../../lib/wms-api';

export function WmsHubOverviewClient() {
  const [apiHint, setApiHint] = useState<string | null>(null);
  const [kpis, setKpis] = useState(WMS_OVERVIEW_KPIS);
  const [preview, setPreview] = useState(WMS_STOCK_PREVIEW);
  const [movements, setMovements] = useState<WmsMovement[]>(WMS_RECENT_MOVEMENTS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { overview, source } = await fetchWmsOverview();
        if (cancelled) return;
        setKpis({
          activeWarehouses: overview.activeWarehouses,
          recentReservations: overview.recentReservations,
          criticalSkus: overview.criticalSkus,
          expiringLotsWithin30: overview.expiringLotsWithin30 ?? 0,
        });
        setPreview(overview.stockPreview.map(mapStock));
        setMovements(
          overview.recentMovements.map((m) => ({
            id: m.id,
            type: m.type === 'issue' ? 'issue' : m.type === 'receipt' ? 'receipt' : 'issue',
            date: m.date,
            status: 'posted',
          })),
        );
        setApiHint(source.includes('postgresql') ? 'موجودی از پایگاه دادهٔ سازمان خوانده شد.' : 'موجودی نمونهٔ همین نشست نشان داده می‌شود.');
      } catch {
        if (!cancelled) setApiHint(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="flex flex-col gap-4">
      <SakhtarModuleAssistant
        title="انبار‌یار"
        description="مشاور و تحلیل‌گر عملیاتی ساختار برای این بخش — هشدار کمبود، بهر و رزرو را رصد می‌کند."
        upsell="این ویژگی فقط برای خریداران فعال است."
        ctaHref="/settings/subscription"
      />

      {kpis.expiringLotsWithin30 > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-300 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
          <Clock className="size-4" />
          <span>{nf.format(kpis.expiringLotsWithin30)} بهر در ۳۰ روز آینده منقضی می‌شود.</span>
          <Button variant="outline" size="sm" className="mr-auto" asChild>
            <Link href="/wms/batches">مشاهده بهرها</Link>
          </Button>
        </div>
      ) : null}

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="انبارهای دارای موجودی"
          value={nf.format(kpis.activeWarehouses)}
          sub={`${nf.format(kpis.activeWarehouses)} فعال`}
        />
        <SakhtarModuleKpi label="رزروهای فعال اخیر" value={nf.format(kpis.recentReservations)} />
        <SakhtarModuleKpi label="کالای بحرانی" value={nf.format(kpis.criticalSkus)} sub="در ۱۰ ردیف اخیر" />
        <SakhtarModuleKpi
          label="بهر در آستانه انقضا"
          value={nf.format(kpis.expiringLotsWithin30)}
          sub="۳۰ روز آینده"
        />
      </section>
      {apiHint ? <p className="text-[11px] text-muted-foreground">منبع داده: {apiHint}</p> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="finance-aging-card overflow-hidden rounded-xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Boxes className="size-4" />
              موجودی کالا
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/wms/stock">نمای کامل موجودی</Link>
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto px-0 pb-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/50 text-muted-foreground">
                  <th className="py-2 px-2 text-right">کد</th>
                  <th className="py-2 px-2 text-right">کالا</th>
                  <th className="py-2 px-2 text-right">انبار</th>
                  <th className="py-2 px-2 text-right">واقعی</th>
                  <th className="py-2 px-2 text-right">رزرو</th>
                  <th className="py-2 px-2 text-right">مسدود</th>
                  <th className="py-2 px-2 text-right">قابل استفاده</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((r) => (
                  <tr key={`${r.sku}-${r.warehouse}`} className="border-b border-dashed">
                    <td className="py-2 px-2 font-mono">{r.sku}</td>
                    <td className="py-2 px-2">{r.name}</td>
                    <td className="py-2 px-2 font-mono">{r.warehouse}</td>
                    <td className="py-2 px-2 tabular-nums">{r.onHand.toLocaleString('fa-IR')}</td>
                    <td className="py-2 px-2 tabular-nums">{r.reserved}</td>
                    <td className="py-2 px-2 tabular-nums">{r.blocked}</td>
                    <td className="py-2 px-2 tabular-nums font-medium bg-amber-500/10">
                      {r.available.toLocaleString('fa-IR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="finance-aging-card rounded-xl border shadow-sm">
          <CardHeader className="py-3">
            <CardTitle className="text-base">حرکات اخیر</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {movements.map((m) => (
              <div key={m.id} className="flex items-center justify-between gap-2 text-sm border-b border-dashed pb-2">
                <div>
                  <Link
                    href={`/wms/documents/${encodeURIComponent(m.id)}`}
                    className="font-mono text-xs text-rose-800 hover:underline"
                  >
                    {m.id}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {m.type === 'issue' ? 'خروج' : 'رسید'} · {m.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-600 text-[10px]">ثبت‌شده</Badge>
                  {m.type === 'issue' ? <ArrowUpRight className="size-4 text-sky-600" /> : null}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function mapStock(r: WmsStockRowApi) {
  return {
    sku: r.sku,
    name: r.name,
    warehouse: r.warehouse,
    onHand: r.onHand,
    reserved: r.reserved,
    blocked: r.blocked,
    available: r.available,
    status: r.status,
  };
}
