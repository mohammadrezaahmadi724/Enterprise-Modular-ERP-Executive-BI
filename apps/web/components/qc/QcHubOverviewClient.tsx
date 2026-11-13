'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { SakhtarModuleAssistant, SakhtarModuleKpi } from '@repo/ui';
import { ClipboardCheck } from 'lucide-react';
import { QC_HUB_KPIS, QC_INSPECTIONS_PREVIEW } from '../../lib/qc-demo';
import { fetchQcOverview, type QcInspectionRowApi } from '../../lib/qc-api';

export function QcHubOverviewClient() {
  const nf = new Intl.NumberFormat('fa-IR');
  const [kpis, setKpis] = useState(QC_HUB_KPIS);
  const [preview, setPreview] = useState(
    QC_INSPECTIONS_PREVIEW.map((r) => ({
      code: r.code,
      workOrderNumber: r.workOrder,
      productLabel: r.product,
      resultFa: r.result,
      inspectionDate: r.date,
    })),
  );
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { overview, source: src } = await fetchQcOverview();
        if (cancelled) return;
        setKpis(overview.kpis);
        if (overview.preview?.length) {
          setPreview(
            overview.preview.map((r) => ({
              code: r.code,
              workOrderNumber: r.workOrderNumber,
              productLabel: r.productLabel,
              resultFa: r.resultFa,
              inspectionDate: formatInspectionDate(r),
            })),
          );
        }
        setSource(src);
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
        title="QC‌یار"
        description="نرخ پذیرش، نگه‌داری و ارتباط با سفارش کار — بدون تغییر مستقیم روی اسناد Posted."
        upsell="چک‌لیست پویا و نمونه‌گیری AQL در پلن کارخانه‌ای."
      />

      <section className="smh-kpi-grid">
        <SakhtarModuleKpi
          variant="primary"
          label="نرخ پذیرش"
          value={`${nf.format(kpis.passRatePct)}٪`}
          sub="۳۰ روز اخیر"
        />
        <SakhtarModuleKpi label="بازرسی امروز" value={nf.format(kpis.inspectionsToday)} />
        <SakhtarModuleKpi label="در نگه‌داری" value={nf.format(kpis.onHold)} sub="منتظر تصمیم" />
        <SakhtarModuleKpi label="ردیف مردود" value={nf.format(kpis.failedLots)} />
      </section>
      {source ? <p className="text-[11px] text-muted-foreground">منبع داده: {source}</p> : null}

      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardCheck className="size-4" />
            بازرسی‌های اخیر
          </CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/qc/inspections">همه بازرسی‌ها</Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50 text-muted-foreground">
                <th className="py-2 px-2 text-right">کد</th>
                <th className="py-2 px-2 text-right">سفارش کار</th>
                <th className="py-2 px-2 text-right">محصول</th>
                <th className="py-2 px-2 text-right">نتیجه</th>
                <th className="py-2 px-2 text-right">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((r) => (
                <tr key={r.code} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2 px-2 font-mono">
                    <Link href="/qc/inspections" className="hover:text-primary">
                      {r.code}
                    </Link>
                  </td>
                  <td className="py-2 px-2 font-mono text-[11px]">{r.workOrderNumber}</td>
                  <td className="py-2 px-2">{r.productLabel}</td>
                  <td className="py-2 px-2">
                    <ResultBadge result={r.resultFa} />
                  </td>
                  <td className="py-2 px-2 tabular-nums">{r.inspectionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

function formatInspectionDate(r: QcInspectionRowApi): string {
  if (!r.inspectionDate.includes('T')) return r.inspectionDate;
  try {
    return new Intl.DateTimeFormat('fa-IR').format(new Date(r.inspectionDate));
  } catch {
    return r.inspectionDate;
  }
}

function ResultBadge({ result }: { result: string }) {
  const tone =
    result === 'قبول' ? 'bg-emerald-100 text-emerald-900' : result === 'نگه‌داری' ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900';
  return (
    <Badge variant="secondary" className={`font-normal ${tone}`}>
      {result}
    </Badge>
  );
}
