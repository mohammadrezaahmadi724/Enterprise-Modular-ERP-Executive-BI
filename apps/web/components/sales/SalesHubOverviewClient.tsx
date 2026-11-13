'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { fetchSalesFulfillmentKpis } from '../../lib/sales-api';
import {
  OPEN_LEADS_META_COUNT,
  SALES_DASHBOARD_TILES,
} from '../../lib/sales-hub-config';
import { formatToman } from '../../lib/finance-receivables-demo';
import { QUOTES_TOTAL } from '../../lib/sales-quotes-demo';
import { ORDERS_TOTAL } from '../../lib/sales-orders-demo';
import { INVOICES_TOTAL } from '../../lib/sales-invoices-demo';
import { TEAM_TARGET_PCT, TEAM_MONTH_TOMAN } from '../../lib/sales-team-demo';

export function SalesHubOverviewClient() {
  const [openLeads, setOpenLeads] = useState<number | null>(null);
  const [fulfillKpis, setFulfillKpis] = useState<{
    ready: number;
    shipped: number;
    awaiting: number;
    returnsPosted: number;
    restockReceipts: number;
    returnCreditToman: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/sales/leads');
        const data = (await res.json()) as { openCount?: number };
        if (!cancelled && typeof data.openCount === 'number') setOpenLeads(data.openCount);
      } catch {
        /* fallback constant */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { kpis } = await fetchSalesFulfillmentKpis();
        if (!cancelled) {
          setFulfillKpis({
            ready: kpis.ordersReadyToShip,
            shipped: kpis.ordersShipped,
            awaiting: kpis.ordersAwaitingSupply,
            returnsPosted: kpis.returnsPostedMonth,
            restockReceipts: kpis.restockReceiptsMonth,
            returnCreditToman: kpis.returnCreditTomanMonth,
          });
        }
      } catch {
        /* demo tiles only */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="space-y-4">
      <SakhtarModuleAssistant
        title="فروش‌یار"
        description="از سرنخ تا سفارش — قیف، تعهد تحویل و برگشت را خلاصه می‌کند."
        upsell="پیش‌بینی فروش و اتصال مودیان در پلن سازمانی."
        ctaHref="/sales/assistant"
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="فروش ماه تیم"
          value={formatToman(TEAM_MONTH_TOMAN)}
          sub={`تحقق هدف ${TEAM_TARGET_PCT}٪ · تومان`}
        />
        <SakhtarModuleKpi
          label="سرنخ در جریان"
          value={nf.format(openLeads ?? OPEN_LEADS_META_COUNT)}
          sub={openLeads != null ? 'فایل tenant leads' : 'قیف پیش‌فرض'}
        />
        <SakhtarModuleKpi label="پیش‌فاکتور" value={nf.format(QUOTES_TOTAL)} sub="کل پرونده" />
        <SakhtarModuleKpi
          label="سفارش / فاکتور"
          value={`${nf.format(ORDERS_TOTAL)} / ${nf.format(INVOICES_TOTAL)}`}
          sub="ماه جاری"
        />
      </section>

      {fulfillKpis ? (
        <section className="smh-kpi-grid">
          <SakhtarModuleKpi label="آماده تحویل" value={nf.format(fulfillKpis.ready)} sub="projection_sales_fulfillment" />
          <SakhtarModuleKpi label="تحویل‌شده" value={nf.format(fulfillKpis.shipped)} sub="BI snapshot" />
          <SakhtarModuleKpi label="در انتظار تأمین" value={nf.format(fulfillKpis.awaiting)} sub="بدون کوئری OLTP" />
        </section>
      ) : null}

      {fulfillKpis ? (
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">تدارک معکوس (برگشت → انبار)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">برگشت ثبت‌شده (ماه)</p>
              <p className="text-lg font-bold tabular-nums">{fulfillKpis.returnsPosted.toLocaleString('fa-IR')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">رسید ورود WMS</p>
              <p className="text-lg font-bold tabular-nums">{fulfillKpis.restockReceipts.toLocaleString('fa-IR')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">بستانکار برگشت (تومان)</p>
              <p className="text-lg font-bold tabular-nums">{formatToman(fulfillKpis.returnCreditToman)}</p>
            </div>
            <Link href="/sales/returns" className="text-primary text-xs font-medium sm:col-span-3">
              مدیریت اعلامیه‌های برگشت ←
            </Link>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">مسیر فروش</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 text-xs">
            {[
              { label: 'سرنخ', href: '/sales/leads', count: openLeads ?? OPEN_LEADS_META_COUNT },
              { label: 'پیش‌فاکتور', href: '/sales/quotes', count: QUOTES_TOTAL },
              { label: 'سفارش', href: '/sales/orders', count: ORDERS_TOTAL },
              { label: 'فاکتور', href: '/sales/invoices', count: INVOICES_TOTAL },
            ].map((step, i, arr) => (
              <span key={step.href} className="flex items-center gap-2">
                <Link href={step.href} className="rounded-lg border px-3 py-2 hover:bg-muted/50">
                  <span className="font-semibold">{step.label}</span>
                  <span className="text-muted-foreground mr-1">({step.count.toLocaleString('fa-IR')})</span>
                </Link>
                {i < arr.length - 1 ? <span className="text-muted-foreground">←</span> : null}
              </span>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">نیازمند اقدام</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span>پیگیری سرنخ معوق</span>
              <Badge className="bg-red-600 hover:bg-red-600">۱۴</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>پیش‌فاکتور در انتظار پاسخ</span>
              <Badge variant="outline">۲۸</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>سفارش بدون رزرو انبار</span>
              <Badge variant="outline">۹</Badge>
            </div>
            <Link href="/sales/activities" className="text-primary text-sm font-medium inline-block pt-2">
              فعالیت‌ها و پیگیری‌ها ←
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">میان‌برها</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SALES_DASHBOARD_TILES.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-lg border px-4 py-3 hover:bg-muted/40 transition-colors">
              <p className="font-semibold text-sm">{t.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.subtitle}</p>
            </Link>
          ))}
          <Link href="/sales/contacts" className="rounded-lg border px-4 py-3 hover:bg-muted/40">
            <p className="font-semibold text-sm">پایگاه تماس</p>
            <p className="text-xs text-muted-foreground mt-0.5">مخاطب و رضایت PII</p>
          </Link>
          <Link href="/sales/sms" className="rounded-lg border px-4 py-3 hover:bg-muted/40">
            <p className="font-semibold text-sm">پیامک</p>
            <p className="text-xs text-muted-foreground mt-0.5">کمپین و قالب</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
