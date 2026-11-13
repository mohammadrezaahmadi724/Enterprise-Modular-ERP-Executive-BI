'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { CreditCard, Package, ShoppingCart } from 'lucide-react';
import {
  DEMO_PURCHASE_REQUESTS,
  PROCUREMENT_HUB_KPIS,
  PROCUREMENT_MONTHLY_TREND,
  formatProcurementToman,
} from '../../lib/procurement-demo';
import { fetchProcurementOverview, type PurchaseRequestApi } from '../../lib/procurement-api';
import { formatToman } from '../../lib/finance-receivables-demo';
import { PrStatusBadge } from './procurement-screen-bits';

export const PROCUREMENT_LIST_META = 200;

export function ProcurementHubOverviewClient() {
  const [kpis, setKpis] = useState(PROCUREMENT_HUB_KPIS);
  const [trend, setTrend] = useState(PROCUREMENT_MONTHLY_TREND);
  const [requests, setRequests] = useState<PurchaseRequestApi[]>([]);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchProcurementOverview();
        if (cancelled) return;
        setKpis(data.kpis);
        if (data.monthlyTrend?.length) setTrend(data.monthlyTrend);
        if (data.recentRequests?.length) setRequests(data.recentRequests);
        setSource(data.source ?? null);
      } catch {
        setRequests(DEMO_PURCHASE_REQUESTS as unknown as PurchaseRequestApi[]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const maxTrend = useMemo(() => Math.max(...trend.map((t) => t.orderToman), 1), [trend]);
  const tableRows = requests.length ? requests : (DEMO_PURCHASE_REQUESTS as unknown as PurchaseRequestApi[]);

  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="space-y-4">
      <SakhtarModuleAssistant
        title="تأمین‌یار"
        description="درخواست، سفارش خرید و رسید — پل ارتباطی با انبار و مالی."
        upsell="RFQ خودکار و قرارداد تأمین‌کننده در پلن بالاتر."
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="درخواست در انتظار تأیید"
          value={formatToman(kpis.pendingRequestToman)}
          sub="میلیون تومان"
        />
        <SakhtarModuleKpi
          label="سفارش خرید باز"
          value={formatToman(kpis.openPoToman)}
          sub={`${nf.format(kpis.overduePoCount)} دیرکرد · ${nf.format(kpis.dueThisWeekPoCount)} سررسید هفته`}
        />
        <SakhtarModuleKpi
          label="دریافت ناقص"
          value={nf.format(kpis.incompleteReceiptCount)}
          sub={kpis.incompleteReceiptCount === 0 ? 'دریافت ناقصی نیست' : 'نیاز به رسید تکمیلی'}
        />
        <SakhtarModuleKpi
          label="تأمین‌کنندگان فعال"
          value={nf.format(kpis.activeSuppliers)}
          sub={`${nf.format(kpis.newSuppliersThisYear)} جدید امسال`}
        />
      </section>

      <div className="flex flex-wrap gap-1.5">
        {kpis.pendingRequestIds.map((id) => (
          <Link
            key={id}
            href="/procurement/purchase-requests"
            className="text-[11px] font-mono rounded border bg-muted/40 px-1.5 py-0.5 hover:bg-muted"
          >
            {id}
          </Link>
        ))}
      </div>
      {source ? <p className="text-[11px] text-muted-foreground">منبع: {source}</p> : null}

      <Card className="overflow-hidden">
        <CardHeader className="border-b py-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">درخواست‌های خرید</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{PROCUREMENT_LIST_META.toLocaleString('fa-IR')} درخواست در دسترس شما</p>
          </div>
          <Link href="/procurement/purchase-requests" className="text-xs text-primary font-medium">
            همه درخواست‌ها ←
          </Link>
        </CardHeader>
        <CardContent className="px-0 pb-0 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/40 text-muted-foreground">
                <th className="py-2 px-3 text-right font-medium">شماره</th>
                <th className="py-2 px-3 text-right font-medium">موضوع</th>
                <th className="py-2 px-3 text-right font-medium">تاریخ درخواست</th>
                <th className="py-2 px-3 text-right font-medium">مبلغ برآوردی (تومان)</th>
                <th className="py-2 px-3 text-right font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(0, 6).map((r) => (
                <tr key={r.number} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2 px-3 font-mono text-violet-800 dark:text-violet-300">{r.number}</td>
                  <td className="py-2 px-3 max-w-[240px] truncate">{r.title}</td>
                  <td className="py-2 px-3 tabular-nums">{r.requestDate}</td>
                  <td className="py-2 px-3 tabular-nums">{formatToman(r.estimatedToman)}</td>
                  <td className="py-2 px-3">
                    <PrStatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">روند خرید ماهانه</CardTitle>
            <p className="text-xs text-muted-foreground font-normal">نمای غیررسمی — از لیست سفارش‌های در دسترس شما</p>
          </CardHeader>
          <CardContent>
            <p className="text-[11px] text-muted-foreground mb-3">مبلغ سفارش‌های ثبت‌شده، تومان</p>
            <div className="flex items-end gap-2 h-40">
              {trend.map((b) => (
                <div key={b.period} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <div
                    className="w-full rounded-t bg-blue-500/80"
                    style={{ height: `${Math.round((b.orderToman / maxTrend) * 100)}%`, minHeight: 4 }}
                    title={formatProcurementToman(b.orderToman)}
                  />
                  <span className="text-[10px] text-muted-foreground tabular-nums">{b.period}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">مرز اختیارها</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-stretch gap-2 text-xs">
            <FlowStep
              icon={<ShoppingCart className="size-4" />}
              title="خرید و تأمین"
              desc="درخواست، تأیید، سفارش خرید و تعهد به تأمین‌کننده"
              className="bg-violet-600 text-violet-50"
              href="/procurement/purchase-orders"
            />
            <span className="self-center text-muted-foreground">←</span>
            <FlowStep
              icon={<Package className="size-4" />}
              title="انبار"
              desc="دریافت فیزیکی کالا و اثر بر موجودی"
              className="bg-amber-500 text-amber-950"
              href="/procurement/receipts"
            />
            <span className="self-center text-muted-foreground">←</span>
            <FlowStep
              icon={<CreditCard className="size-4" />}
              title="مالی و حسابداری"
              desc="پرداخت و ثبت اسناد حسابداری"
              className="bg-emerald-600 text-emerald-50"
              href="/finance"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FlowStep({
  icon,
  title,
  desc,
  className,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className: string;
  href: string;
}) {
  return (
    <Link href={href} className={`rounded-xl p-3 flex-1 min-w-[140px] hover:opacity-95 transition ${className}`}>
      <h3 className="font-semibold flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <p className="mt-2 opacity-90 leading-relaxed">{desc}</p>
    </Link>
  );
}
