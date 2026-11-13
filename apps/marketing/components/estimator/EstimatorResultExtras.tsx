'use client';

import { useState } from 'react';
import { ChevronDown, CheckCircle2, CircleAlert, Info } from 'lucide-react';
import {
  CLOUD_ONBOARDING_ROADMAP,
  DEFAULT_IMPLEMENTATION_ROADMAP,
  ESTIMATOR_DELIVERY_LABELS,
  type EstimatorDeliveryMode,
  ESTIMATE_OUT_OF_SCOPE,
  ESTIMATE_RECURRING_NOTES,
  ESTIMATOR_WIZARD_MODULES,
  type WizardEstimateResult,
  type EstimatorWizardModuleId,
} from '@repo/contracts';

const fmtM = (tomans: number) =>
  new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(Math.round(tomans / 1_000_000));

type Props = {
  result: WizardEstimateResult;
  deliveryMode?: EstimatorDeliveryMode;
  selectedModuleIds: EstimatorWizardModuleId[];
  estimateId?: string;
  orgSummary?: string;
};

export function EstimatorResultExtras({
  result,
  deliveryMode = result.deliveryMode,
  selectedModuleIds,
  estimateId,
  orgSummary,
}: Props) {
  const roadmap = deliveryMode === 'cloud_saas' ? CLOUD_ONBOARDING_ROADMAP : DEFAULT_IMPLEMENTATION_ROADMAP;
  const [openPhase, setOpenPhase] = useState<string | null>('build');
  const [openBuckets, setOpenBuckets] = useState<Record<string, boolean>>({});

  const inScope = selectedModuleIds
    .map((id) => ESTIMATOR_WIZARD_MODULES.find((m) => m.id === id)?.nameFa)
    .filter(Boolean) as string[];

  const priorityIds: EstimatorWizardModuleId[] = ['sales', 'finance', 'inventory'];
  const suggested = priorityIds.filter((id) => !selectedModuleIds.includes(id));

  return (
    <div className="est-result-extras space-y-6 mt-6">
      <details className="est-hero-disclosure rounded-lg border px-3 py-2 text-sm">
        <summary className="cursor-pointer font-medium flex items-center justify-between gap-2">
          جزئیات برآورد <ChevronDown size={16} />
        </summary>
        <div className="est-hero-meta text-xs text-muted-foreground space-y-1 mt-2 pb-1">
          {estimateId ? (
            <span>
              شناسه برآورد: <span dir="ltr">{estimateId}</span>
            </span>
          ) : null}
          <span>تاریخ برآورد: {new Date().toLocaleDateString('fa-IR')}</span>
          <span>اعتبار تا: {new Date(result.validUntil).toLocaleDateString('fa-IR')}</span>
          <span>
            نسخه قیمت: <span dir="ltr">{result.pricingVersion}</span>
          </span>
          {orgSummary ? <span>{orgSummary}</span> : null}
          <span>مسیر: {ESTIMATOR_DELIVERY_LABELS[deliveryMode]}</span>
        </div>
      </details>

      <section className="est-result-section" aria-label="تفکیک هزینه‌ها">
        <div className="est-result-section-head flex items-center gap-2 font-semibold mb-2">
          <Info size={16} /> تفکیک هزینه‌ها
        </div>
        <div className="est-breakdown-list">
          {result.costBuckets.map((b) => {
            const open = openBuckets[b.key] ?? false;
            const showRange = b.rangeMinTomans != null && b.rangeMaxTomans != null;
            return (
              <div key={b.key} className={`est-breakdown-row ${open ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="est-breakdown-row-head w-full text-right"
                  onClick={() => setOpenBuckets((prev) => ({ ...prev, [b.key]: !open }))}
                >
                  <span className="est-breakdown-row-title flex items-center gap-2 flex-wrap">
                    <span>{b.titleFa}</span>
                    <span className="est-breakdown-tag text-[10px] px-1.5 py-0.5 rounded bg-muted">داخل محدوده</span>
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    {showRange ? (
                      <span>
                        {fmtM(b.rangeMinTomans!)} تا {fmtM(b.rangeMaxTomans!)} میلیون تومان
                      </span>
                    ) : (
                      <span>{fmtM(b.amountTomans)} میلیون تومان</span>
                    )}
                    <em className="est-breakdown-share text-[10px] not-italic opacity-70">{b.sharePct}٪</em>
                    <ChevronDown size={14} className={open ? 'rotate-180' : ''} />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="est-result-fineprint text-xs text-muted-foreground mt-2">
          جمع ردیف‌های «داخل محدوده» با بازه سرمایه‌گذاری هم‌خوان است.
        </p>
      </section>

      <section className="est-priority-modules">
        <div className="font-semibold mb-2">ماژول‌های کلیدی پیاده‌سازی</div>
        <p className="text-sm text-muted-foreground mb-3">
          فروش، حسابداری و انبار ستون‌های اصلی مسیر اجرا هستند.
        </p>
        <div className="est-priority-grid grid gap-2 sm:grid-cols-3">
          {priorityIds.map((id) => {
            const m = ESTIMATOR_WIZARD_MODULES.find((x) => x.id === id);
            if (!m) return null;
            const selected = selectedModuleIds.includes(id);
            return (
              <div
                key={id}
                className={`est-priority-card rounded-xl border p-3 text-sm ${selected ? 'is-selected ring-1 ring-primary/30' : ''}`}
                style={{ ['--module' as string]: m.color }}
              >
                <strong className="block">{m.nameFa}</strong>
                <span className="text-xs text-muted-foreground block mt-1">
                  {id === 'sales'
                    ? 'مسیر سفارش و مشتری'
                    : id === 'finance'
                      ? 'سند و گزارش مالی'
                      : 'انبار و خرید'}
                </span>
                <em className="text-[10px] mt-2 block not-italic opacity-80">
                  {selected ? 'داخل برآورد' : 'پیشنهاد تکمیلی'}
                </em>
              </div>
            );
          })}
        </div>
        {suggested.length > 0 ? (
          <p className="text-xs text-muted-foreground mt-2">
            پیشنهاد تکمیلی: {suggested.map((id) => ESTIMATOR_WIZARD_MODULES.find((m) => m.id === id)?.nameFa).join('، ')}
          </p>
        ) : null}
      </section>

      <section className="est-roadmap" aria-label="برنامه پیشنهادی">
        <RoadmapHead durationMin={result.durationMinDays} durationMax={result.durationMaxDays} />
        <div className="est-roadmap-progress flex gap-0.5 h-2 rounded-full overflow-hidden my-3" role="presentation">
          {roadmap.map((p) => (
            <span
              key={p.id}
              className={`est-roadmap-progress-seg h-full ${p.critical ? 'is-critical' : ''}`}
              style={{ flexGrow: p.weightPct, background: phaseColor(p.id) }}
              title={`${p.titleFa} — ${p.weightPct}٪`}
            />
          ))}
        </div>
        <div className="est-roadmap-track flex flex-col gap-1">
          {roadmap.map((p) => {
            const isOpen = openPhase === p.id;
            return (
              <div key={p.id}>
                <button
                  type="button"
                  className={`est-roadmap-seg w-full text-right rounded-lg border px-3 py-2 flex items-center gap-2 ${p.critical ? 'is-critical' : ''} ${isOpen ? 'is-open border-primary/40' : ''}`}
                  onClick={() => setOpenPhase(isOpen ? null : p.id)}
                >
                  <span className="text-xs font-medium text-muted-foreground">مرحله {p.order}</span>
                  <span className="flex-1 font-medium text-sm">{p.titleFa}</span>
                  <span className="text-xs">
                    {p.daysMin} تا {p.daysMax} روز
                  </span>
                  <span className="text-xs opacity-70">{p.weightPct}٪</span>
                </button>
                {isOpen ? (
                  <div className="est-roadmap-detail border border-t-0 rounded-b-lg px-3 py-2 text-sm text-muted-foreground">
                    <p>{p.descriptionFa}</p>
                    <ul className="mt-2 space-y-1">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-1">
                          <CheckCircle2 size={12} /> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="est-result-section">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <CheckCircle2 size={16} /> موارد داخل محدوده
        </div>
        <ul className="est-scope-list is-in space-y-1 text-sm">
          {inScope.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-primary shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="est-result-section">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <CircleAlert size={16} /> موارد خارج از محدوده
        </div>
        <ul className="est-scope-list is-out space-y-1 text-sm text-muted-foreground">
          {ESTIMATE_OUT_OF_SCOPE.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span aria-hidden>×</span>
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="est-result-section">
        <div className="font-semibold mb-2">هزینه‌های تکرارشونده و سرویس‌های ثالث</div>
        <p className="text-xs text-muted-foreground mb-2">جدا از هزینه اجرای اولیه؛ در بازه بالا لحاظ نشده‌اند.</p>
        <div className="space-y-2">
          {ESTIMATE_RECURRING_NOTES.map((r) => (
            <div key={r.titleFa} className="est-recurring-row text-sm border rounded-lg p-3">
              <span className="font-medium block">{r.titleFa}</span>
              <span className="text-muted-foreground text-xs">{r.noteFa}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="est-lead-card border rounded-xl p-4 bg-muted/20">
        <strong className="block">قدم بعدی: مشاوره با همین برآورد</strong>
        <p className="text-sm text-muted-foreground mt-1">
          نوع جلسه را تلفنی، آنلاین یا حضوری انتخاب کنید؛ همین برآورد به درخواست جلسه ضمیمه می‌شود.
        </p>
      </div>
    </div>
  );
}

function RoadmapHead({ durationMin, durationMax }: { durationMin: number; durationMax: number }) {
  const weeksMin = Math.ceil(durationMin / 5);
  const weeksMax = Math.ceil(durationMax / 5);
  return (
    <RoadmapFragment>
      <span className="text-xs text-primary font-semibold">برنامه پیشنهادی طراحی و پیاده‌سازی</span>
      <h3 className="text-lg font-bold mt-1">مسیر تخمینی طراحی و پیاده‌سازی سیستم شما</h3>
      <div className="text-sm mt-2">
        <span className="text-muted-foreground">زمان تخمینی اجرا: </span>
        <strong>
          {durationMin} تا {durationMax} روز کاری
        </strong>
        <span className="text-muted-foreground text-xs mr-2">
          (حدود {weeksMin} تا {weeksMax} هفته)
        </span>
      </div>
    </RoadmapFragment>
  );
}

function RoadmapFragment({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function phaseColor(id: string): string {
  const map: Record<string, string> = {
    discovery: '#38BDF8',
    'solution-design': '#8B5CF6',
    build: '#6366F1',
    integration: '#F59E0B',
    qa: '#10B981',
    'go-live': '#F43F5E',
  };
  return map[id] ?? '#94a3b8';
}
