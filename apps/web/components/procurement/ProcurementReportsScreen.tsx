'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { BarChart3, FileSpreadsheet } from 'lucide-react';
import { PROCUREMENT_HUB_KPIS, PROCUREMENT_MONTHLY_TREND } from '../../lib/procurement-demo';
import { fetchProcurementReports, type ProcurementReportsApi } from '../../lib/procurement-api';
import { formatToman } from '../../lib/finance-receivables-demo';

const REPORT_LINKS = [
  { title: 'خلاصه خرید — نمای کلی', href: '/procurement', tag: 'on-screen' },
  { title: 'درخواست‌های در جریان', href: '/procurement/purchase-requests', tag: 'on-screen' },
  { title: 'سفارش‌های باز', href: '/procurement/purchase-orders', tag: 'on-screen' },
  { title: 'مقایسه استعلام‌ها', href: '/procurement/rfq', tag: 'on-screen' },
  { title: 'رسید خرید / انبار', href: '/procurement/receipts', tag: 'bridge' },
] as const;

export function ProcurementReportsScreen() {
  const [data, setData] = useState<ProcurementReportsApi | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rep = await fetchProcurementReports();
        if (!cancelled) setData(rep);
      } catch {
        if (!cancelled) {
          setData({
            kpis: {
              ...PROCUREMENT_HUB_KPIS,
              pendingRequestIds: PROCUREMENT_HUB_KPIS.pendingRequestIds,
            },
            monthlyTrend: PROCUREMENT_MONTHLY_TREND,
            counts: {
              purchaseRequests: 4,
              purchaseOrders: 2,
              openRfqs: 1,
              awardedRfqs: 0,
              suppliers: 3,
            },
            supplierOpenPo: [],
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const maxTrend = useMemo(
    () => Math.max(...(data?.monthlyTrend ?? PROCUREMENT_MONTHLY_TREND).map((p) => p.orderToman), 1),
    [data],
  );

  const kpis = data?.kpis ?? {
    ...PROCUREMENT_HUB_KPIS,
    pendingRequestIds: PROCUREMENT_HUB_KPIS.pendingRequestIds,
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">گزارش‌های تدارکات — فقط از projection و read-model (بدون تجمع OLTP)</p>
      {data?.source ? <p className="text-[11px] text-muted-foreground">منبع: {data.source}</p> : null}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <Stat label="درخواست خرید" value={data?.counts.purchaseRequests ?? '—'} />
        <Stat label="سفارش خرید" value={data?.counts.purchaseOrders ?? '—'} />
        <Stat label="استعلام باز" value={data?.counts.openRfqs ?? '—'} />
        <Stat label="استعلام منجر به PO" value={data?.counts.awardedRfqs ?? '—'} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="size-4" />
              شاخص‌های مدیریتی
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 tabular-nums">
            <Row label="در انتظار تأیید (تومان)" value={formatToman(kpis.pendingRequestToman)} />
            <Row label="سفارش باز (تومان)" value={formatToman(kpis.openPoToman)} />
            <Row label="PO دیرکرد" value={kpis.overduePoCount.toLocaleString('fa-IR')} />
            <Row label="دریافت ناقص" value={kpis.incompleteReceiptCount.toLocaleString('fa-IR')} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">روند ثبت سفارش (ماهانه)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1.5 h-32">
              {(data?.monthlyTrend ?? PROCUREMENT_MONTHLY_TREND).map((b) => (
                <div key={b.period} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <div
                    className="w-full rounded-t bg-violet-500/80"
                    style={{ height: `${Math.round((b.orderToman / maxTrend) * 100)}%`, minHeight: 3 }}
                  />
                  <span className="text-[9px] text-muted-foreground">{b.period.slice(-2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {data?.supplierOpenPo.length ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">تعهد باز به تأمین‌کننده</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto px-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40 text-muted-foreground">
                  <th className="py-2 px-3 text-right">تأمین‌کننده</th>
                  <th className="py-2 px-3 text-right">تعداد سفارش باز</th>
                  <th className="py-2 px-3 text-right">مبلغ (تومان)</th>
                </tr>
              </thead>
              <tbody>
                {data.supplierOpenPo.map((r) => (
                  <tr key={r.supplierCode} className="border-b border-dashed">
                    <td className="py-2 px-3">
                      <Link href={`/procurement/purchase-orders?supplier=${encodeURIComponent(r.supplierCode)}`} className="text-primary">
                        {r.supplierName}
                      </Link>
                    </td>
                    <td className="py-2 px-3 tabular-nums">{r.openOrderCount.toLocaleString('fa-IR')}</td>
                    <td className="py-2 px-3 tabular-nums">{formatToman(r.openToman)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <FileSpreadsheet className="size-4" />
            گزارش‌های آماده
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          {REPORT_LINKS.map((r) => (
            <Link key={r.href} href={r.href} className="rounded-lg border px-3 py-2 text-sm hover:bg-muted/40 flex justify-between gap-2">
              <span>{r.title}</span>
              <span className="text-[10px] text-muted-foreground">{r.tag}</span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Card>
      <CardContent className="pt-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold tabular-nums mt-1">
          {typeof value === 'number' ? value.toLocaleString('fa-IR') : value}
        </p>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed pb-2">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
