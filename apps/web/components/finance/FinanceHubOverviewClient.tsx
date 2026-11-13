'use client';

import Link from 'next/link';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { FinanceAgingBars } from './FinanceAgingBars';
import { FinanceDocumentStatusCycle } from './FinanceDocumentStatusCycle';
import { FinanceReadyReports } from './FinanceReadyReports';
import { DEMO_JOURNALS } from '../../lib/finance-demo-data';
import { irrToTomanDisplay, formatIrrTable } from '../../lib/finance-format';
import { useFinanceHub } from './use-finance-hub';

const MARKETING_ESTIMATE =
  `${process.env.NEXT_PUBLIC_MARKETING_URL ?? 'http://localhost:3003'}`.replace(/\/$/, '') + '/pricing/estimate';

export function FinanceHubOverviewClient() {
  const { hub, error, loading } = useFinanceHub();

  const receivables = hub ? irrToTomanDisplay(hub.kpis.receivablesIrr) : null;
  const payables = hub ? irrToTomanDisplay(hub.kpis.payablesIrr) : null;
  const treasury = hub ? irrToTomanDisplay(hub.kpis.treasuryIrr) : null;
  const overdue = hub ? irrToTomanDisplay(hub.kpis.overdueArIrr) : null;
  const overduePct =
    hub && hub.kpis.receivablesIrr > 0
      ? Math.round((hub.kpis.overdueArIrr / hub.kpis.receivablesIrr) * 100)
      : 85;

  const journals =
    hub && hub.recentJournals.length > 0
      ? hub.recentJournals.map((j) => ({
          id: j.id,
          number: j.number.slice(-4),
          date: j.date.replaceAll('-', '/'),
          description: j.description,
          debit: formatIrrTable(Number(j.debitIrr)),
          credit: formatIrrTable(Number(j.creditIrr)),
          status: j.status,
        }))
      : DEMO_JOURNALS.map((j) => ({
          id: j.id,
          number: j.number,
          date: j.date,
          description: j.description,
          debit: j.debit,
          credit: j.credit,
          status: j.status,
        }));

  return (
    <div className="space-y-4">
      {loading ? <p className="text-xs text-muted-foreground">بارگذاری نمای کلی از API…</p> : null}
      {error ? (
        <p className="text-xs text-amber-600">خواندن از API: {error} — نمایش دادهٔ نمونه</p>
      ) : hub ? (
        <p className="text-xs text-muted-foreground">
          KPI از {hub.sources.join(' · ')} — اسناد اخیر از journal
        </p>
      ) : null}

      <SakhtarModuleAssistant
        title="مالی‌یار"
        description="پایش اقلام باز، مغایرت و هشدار — فقط با اشتراک ERP Roshd فعال می‌شود."
        upsell="می‌خواهم ERP خودم را بسازم"
        ctaHref={MARKETING_ESTIMATE}
        ctaLabel="برآورد آنلاین"
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="حساب‌های دریافتنی"
          value={receivables?.billions ?? '۱٫۷۲'}
          sub={`${overdue?.billions ?? '۱٫۴۷'} میلیارد سررسید گذشته · میلیارد تومان`}
        />
        <SakhtarModuleKpi
          label="حساب‌های پرداختنی"
          value={payables?.billions ?? '۴٫۱۶'}
          sub="میلیارد تومان"
        />
        <SakhtarModuleKpi
          label="موجودی خزانه"
          value={treasury?.billions ?? '۱۶٫۱۵'}
          sub="میلیارد تومان"
        />
        <SakhtarModuleKpi
          label="اسناد منتظر تأیید"
          value={String(hub?.kpis.pendingApprovalCount ?? 2)}
          sub="از ۴ سند موقت"
        />
      </section>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">اسناد حسابداری</CardTitle>
          <Link href="/finance/journal-entries" className="text-sm text-primary">
            همه اسناد ←
          </Link>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm finance-hub-table">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 text-right">شماره سند</th>
                <th className="py-2 text-right">تاریخ</th>
                <th className="py-2 text-right">شرح</th>
                <th className="py-2 text-left">بدهکار (تومان)</th>
                <th className="py-2 text-left">بستانکار (تومان)</th>
                <th className="py-2 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {journals.map((row) => (
                <tr key={row.id} className="border-b border-dashed last:border-0">
                  <td className="py-2 font-mono">
                    <Link href="/finance/journal-entries" className="text-primary hover:underline">
                      {row.number}
                    </Link>
                  </td>
                  <td className="py-2">{row.date}</td>
                  <td className="py-2 max-w-xs">{row.description}</td>
                  <td className="py-2 text-left tabular-nums">{row.debit}</td>
                  <td className="py-2 text-left tabular-nums">{row.credit}</td>
                  <td className="py-2">
                    <Badge className="bg-emerald-600/90">{row.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardContent className="pt-6">
            <FinanceDocumentStatusCycle counts={hub?.journalStatus} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <FinanceReadyReports />
          </CardContent>
        </Card>
      </div>

      <FinanceAgingBars
        mode="both"
        receivable={hub?.agingReceivable}
        payable={hub?.agingPayable}
      />
    </div>
  );
}
