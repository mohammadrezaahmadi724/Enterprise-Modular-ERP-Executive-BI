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
import { PhoneBar } from '@/components/marketing/PhoneBar';
import { useSiteContent } from '@/lib/use-site-content';

export default function PricingPage() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  const site = useSiteContent();

  return (
    <main className="est-root est-root--landing flex-1" dir="rtl">
      <section className="sk-page px-4 py-8">
        <div className="sk-panel mx-auto max-w-4xl px-6 py-12 text-center space-y-4">
          <span className="sk-badge inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            {site.pricingBadge}
          </span>
          <h1 className="sk-display">
            {site.pricingTitle}
            <br />
            <span className="text-primary">{site.pricingAccent}</span>
          </h1>
          <p className="sk-lead mx-auto max-w-2xl">{site.pricingBody}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/pricing/estimate" className="sk-btn sk-btn-primary">
              شروع برآورد هزینه
            </Link>
            <button type="button" className="sk-btn sk-btn-ghost" onClick={() => setMeetingOpen(true)}>
              رزرو جلسه
            </button>
          </div>
          <p className="text-xs text-muted-foreground">حدود ۲ دقیقه · بدون ساخت حساب ERP · قیمت از پنل سوپر ادمین</p>
        </div>
      </section>
      <PhoneBar />

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
