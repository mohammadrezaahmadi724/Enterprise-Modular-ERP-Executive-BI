'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MeetingDialog } from '@/components/marketing/MeetingDialog';
import {
  PricingBreakdownTable,
  PricingFaqSection,
  PricingStickyCta,
  PricingTrustRow,
} from '@/components/marketing/PricingLandingBands';
import { DEFAULT_ERP_MODULE_CATALOG } from '@repo/contracts';

export default function PricingPage() {
  const [meetingOpen, setMeetingOpen] = useState(false);

  return (
    <main className="est-root est-root--landing flex-1" dir="rtl">
      <section className="est-hero pl relative py-16 overflow-hidden">
        <div className="est-hero-glow absolute inset-0 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 text-center space-y-4">
          <span className="est-eyebrow inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="est-eyebrow-dot size-2 rounded-full" />
            قیمت و هزینه ERP اختصاصی
          </span>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            برآورد هزینه متناسب با <span className="text-primary">فرآیند سازمان شما</span>
          </h1>
          <p className="est-hero-copy text-muted-foreground text-sm md:text-base">
            قیمت ERP یک عدد ثابت نیست. ماژول‌های انتخابی، تعداد کاربران، سفارشی‌سازی و انتقال داده محدوده نهایی را
            تعیین می‌کنند.
          </p>
          <div className="est-hero-actions flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/pricing/estimate"
              className="est-primary inline-flex rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-medium"
            >
              شروع برآورد هزینه ERP
            </Link>
            <button type="button" className="rounded-xl border px-6 py-3 text-sm hover:bg-muted/50" onClick={() => setMeetingOpen(true)}>
              رزرو جلسه
            </button>
          </div>
          <p className="pl-microcopy text-xs text-muted-foreground">حدود ۲ دقیقه · بدون ساخت حساب ERP</p>
        </div>
      </section>

      <PricingTrustRow />

      <section className="pl-section mx-auto max-w-4xl px-4 py-12" id="methodology">
        <div className="pl-kicker text-xs text-primary mb-2">روش محاسبه</div>
        <h2 className="text-2xl font-bold mb-3">قیمت ERP چگونه محاسبه می‌شود؟</h2>
        <p className="pl-lead text-sm text-muted-foreground mb-6">
          هزینه از ترکیب هسته سیستم، ماژول‌های انتخابی، سطح سفارشی‌سازی، کاربران، انتقال داده، اتصال‌ها و پشتیبانی
          به‌دست می‌آید.
        </p>
        <div className="pl-formula flex flex-wrap gap-2 text-xs md:text-sm justify-center" aria-label="فرمول مفهومی">
          {['هسته', 'ماژول‌ها', 'سفارشی‌سازی', 'کاربران', 'مهاجرت داده', 'Integration', 'آموزش'].map((t, i) => (
            <span key={t} className="inline-flex items-center gap-2">
              {i > 0 ? <span className="pl-formula-op text-muted-foreground">+</span> : null}
              <span className="pl-formula-term rounded-lg border px-2 py-1 bg-muted/40">{t}</span>
            </span>
          ))}
        </div>
      </section>

      <PricingBreakdownTable />

      <section className="pl-cta-band py-14 bg-muted/30 border-y">
        <div className="mx-auto max-w-5xl px-4 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">خانواده‌های ماژول ERP</h2>
            <p className="text-sm text-muted-foreground">۹ ماژول — از مالی تا AI و BI</p>
          </div>
          <div className="est-module-strip grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-right">
            {DEFAULT_ERP_MODULE_CATALOG.map((m) => (
              <Link
                key={m.code}
                href={`/modules/${m.code}`}
                className="est-module-mini rounded-xl border p-3 transition hover:border-primary/40 hover:bg-muted/30"
                style={{ borderColor: `${m.color}44` }}
              >
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full shrink-0" style={{ background: m.color }} />
                  <div className="est-module-mini-title font-medium">{m.nameFa}</div>
                </div>
                <p className="est-module-mini-sub text-xs text-muted-foreground mt-1">{m.subtitle}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/pricing/estimate"
              className="est-primary inline-block rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm"
            >
              شروع برآورد هزینه ERP
            </Link>
          </div>
        </div>
      </section>

      <PricingFaqSection />
      <PricingStickyCta />
      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </main>
  );
}
