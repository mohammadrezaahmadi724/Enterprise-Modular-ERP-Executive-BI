'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ErpModuleCode } from '@repo/contracts';
import { CORE_PLATFORM_FEE_IRR } from '@repo/contracts';
import { fetchPricingCatalog, postEstimate, type CatalogModule, type EstimateResult } from '@/lib/pricing-api';
import { MeetingDialog } from '@/components/marketing/MeetingDialog';
import { PricingTrustRow } from '@/components/marketing/PricingLandingBands';

const fmt = (n: number) => new Intl.NumberFormat('fa-IR').format(n);

export default function PricingEstimatePage() {
  const [modules, setModules] = useState<CatalogModule[]>([]);
  const [selected, setSelected] = useState<Set<ErpModuleCode>>(new Set());
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meetingOpen, setMeetingOpen] = useState(false);

  useEffect(() => {
    void fetchPricingCatalog()
      .then((c) => setModules(c.modules))
      .catch((e: Error) => setError(e.message));
  }, []);

  const toggle = (code: ErpModuleCode) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
    setEstimate(null);
  };

  const codes = useMemo(() => [...selected], [selected]);

  const modulesSubtotal = useMemo(
    () => modules.filter((m) => selected.has(m.code)).reduce((s, m) => s + m.listPriceIrr, 0),
    [modules, selected],
  );

  const previewTotal = CORE_PLATFORM_FEE_IRR + modulesSubtotal;

  const runEstimate = async () => {
    if (!codes.length) return;
    setLoading(true);
    setError(null);
    try {
      const r = await postEstimate(codes);
      setEstimate(r);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('last_estimate_id', r.estimateId);
        sessionStorage.setItem('last_estimate_modules', JSON.stringify(codes));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="est-root flex-1" dir="rtl">
      <section className="pl est-landing py-10 md:py-12">
        <div className="estimate-layout">
          <div className="estimate-main">
            <Link href="/pricing" className="text-sm text-primary mb-4 inline-block hover:underline">
              ← بازگشت به راهنمای قیمت
            </Link>
            <span className="est-eyebrow inline-flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span className="est-eyebrow-dot size-2 rounded-full" />
              برآورد آنلاین ERP
            </span>
            <h1 className="text-3xl font-bold mb-2">ماژول‌های موردنیاز را انتخاب کنید</h1>
            <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
              قیمت‌ها از کاتالوگ نسخه‌دار ادمین خوانده می‌شوند. جمع سایدبار فقط راهنمای سریع است؛ بازه رسمی بعد از
              «محاسبه برآورد» از API می‌آید.
            </p>

            {error ? <p className="text-destructive text-sm mb-4">{error}</p> : null}

            <div className="est-module-strip grid gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-6">
              {modules.map((m) => {
                const on = selected.has(m.code);
                return (
                  <button
                    key={m.code}
                    type="button"
                    onClick={() => toggle(m.code)}
                    className={`est-module-mini text-right rounded-xl border p-4 transition-all ${
                      on ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'hover:border-muted-foreground/40'
                    }`}
                    style={{ borderTopColor: m.color, borderTopWidth: on ? 3 : 1 }}
                  >
                    <p className="est-module-mini-title font-semibold">{m.nameFa}</p>
                    <p className="est-module-mini-sub text-xs text-muted-foreground mt-1">{m.subtitle}</p>
                    <p className="text-xs mt-2 opacity-80">{fmt(m.listPriceIrr)} ریال</p>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={!codes.length || loading}
                onClick={() => void runEstimate()}
                className="est-primary rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'در حال محاسبه…' : 'محاسبه برآورد هزینه'}
              </button>
              <button type="button" className="rounded-xl border px-6 py-3 text-sm" onClick={() => setMeetingOpen(true)}>
                رزرو جلسه
              </button>
            </div>

            {estimate ? (
              <article className="mt-10 rounded-2xl border bg-card/80 p-6 space-y-4">
                <h2 className="text-xl font-bold">نتیجه برآورد رسمی</h2>
                <ul className="text-sm space-y-2">
                  {estimate.lines.map((line, i) => (
                    <li key={`${line.nameFa}-${i}`} className="flex justify-between gap-4 border-b border-dashed pb-2">
                      <span>{line.nameFa}</span>
                      <span dir="ltr">{fmt(line.amountIrr)}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold flex justify-between gap-2">
                  <span>بازه تقریبی</span>
                  <span className="text-left">
                    {fmt(estimate.rangeMinIrr)} — {fmt(estimate.rangeMaxIrr)} ریال
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  اعتبار تا {new Date(estimate.validUntil).toLocaleDateString('fa-IR')} · کاتالوگ v
                  {estimate.catalogVersion}
                </p>
              </article>
            ) : null}
          </div>

          <aside className="estimate-sidebar space-y-4" aria-label="خلاصه برآورد">
            <h2 className="text-sm font-semibold">خلاصه انتخاب شما</h2>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="flex justify-between gap-2 border-b pb-2">
                <span>هسته پلتفرم</span>
                <span dir="ltr">{fmt(CORE_PLATFORM_FEE_IRR)}</span>
              </li>
              {modules
                .filter((m) => selected.has(m.code))
                .map((m) => (
                  <li key={m.code} className="flex justify-between gap-2">
                    <span>{m.nameFa}</span>
                    <span dir="ltr">{fmt(m.listPriceIrr)}</span>
                  </li>
                ))}
              {!codes.length ? (
                <li className="text-center py-4">حداقل یک ماژول انتخاب کنید</li>
              ) : null}
            </ul>
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-1">جمع راهنما (قبل از ضرایب بازه)</p>
              <p className="text-lg font-bold" dir="ltr">
                {fmt(previewTotal)} <span className="text-sm font-normal">ریال</span>
              </p>
            </div>
            <button
              type="button"
              disabled={!codes.length}
              className="w-full rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
              onClick={() => setMeetingOpen(true)}
            >
              رزرو جلسه با همین انتخاب
            </button>
          </aside>
        </div>
      </section>
      <PricingTrustRow />
      <MeetingDialog
        open={meetingOpen}
        onClose={() => setMeetingOpen(false)}
        selectedModules={codes}
        estimateId={estimate?.estimateId}
      />
    </main>
  );
}
