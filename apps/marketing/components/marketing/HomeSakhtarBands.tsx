'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MeetingDialog } from './MeetingDialog';
import { BRAND_NAME } from '@/lib/brand';

export function HomeStatsBand() {
  const stats = [
    { label: 'تحویل نسخه اول ERP اختصاصی', value: '۲۰ روز کاری' },
    { label: 'ماژول قابل پیاده‌سازی', value: '۹ خانواده' },
    { label: 'استفاده رایگان ERP ابری', value: '۱۵ روز' },
  ];
  return (
    <section className="home-stats border-b py-10" aria-label="شاخص‌های کلیدی">
      <dl className="home-stats-grid mx-auto grid max-w-4xl gap-6 px-4 text-center sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="home-stat">
            <dt className="text-xs text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 text-lg font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function HomeAnswerBand() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  return (
    <section className="section-band home-answer py-14" aria-labelledby="home-answer-title">
      <div className="home-answer-grid container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
        <article className="home-answer-copy">
          <p className="eyebrow mb-2 text-xs text-primary">پاسخ کوتاه</p>
          <h2 id="home-answer-title" className="section-title mb-3 text-2xl font-bold">
            {BRAND_NAME} چیست؟
          </h2>
          <p className="home-answer-lead text-sm leading-relaxed text-muted-foreground">
            {BRAND_NAME} پلتفرم ماژولار ERP برای کسب‌وکارهای در حال رشد است.{' '}
            <Link href="/pricing" className="text-primary hover:underline">
              ERP ابری
            </Link>{' '}
            برای شروع سریع و ERP اختصاصی برای فرآیند واقعی سازمان طراحی می‌شود.
          </p>
          <button
            type="button"
            className="secondary-button compact-button mt-4 rounded-lg border px-4 py-2 text-sm"
            onClick={() => setMeetingOpen(true)}
          >
            رزرو جلسه بررسی فرآیند
          </button>
        </article>
        <div className="home-path-grid grid gap-4">
          <Link
            href="/pricing/estimate"
            className="home-path-card rounded-xl border p-5 transition-colors hover:border-primary"
          >
            <h3 className="font-semibold">ERP اختصاصی</h3>
            <p className="mt-1 text-sm text-muted-foreground">برآورد ماژول‌به‌ماژول از کاتالوگ قیمت ادمین</p>
            <span className="card-link-inline mt-2 inline-block text-xs text-primary">شروع برآورد ←</span>
          </Link>
          <Link href="/demo" className="home-path-card rounded-xl border p-5 transition-colors hover:border-primary">
            <h3 className="font-semibold">ERP ابری</h3>
            <p className="mt-1 text-sm text-muted-foreground">۱۵ روز رایگان — بدون سرور داخلی</p>
            <span className="card-link-inline mt-2 inline-block text-xs text-primary">مشاهده دمو ←</span>
          </Link>
        </div>
      </div>
      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </section>
  );
}

export function ErpCompareBand() {
  const rows = [
    ['مناسب برای', 'کسب‌وکار زیر ۳۰ نفر', 'فرآیند خاص و چندواحدی'],
    ['نوع', 'SaaS آماده', 'پروژه اختصاصی'],
    ['ماژول‌ها', 'انتخاب از کاتالوگ استاندارد', '۹ خانواده + سفارشی‌سازی'],
    ['قیمت', 'اشتراک ماهانه', 'برآورد پروژه‌ای'],
    ['شروع', '۱۵ روز رایگان', 'جلسه تحلیل + برآورد'],
  ];
  return (
    <section className="section-band home-surface bg-muted/25 py-14" id="erp-cloud-vs-custom">
      <div className="container mx-auto max-w-5xl px-4">
        <p className="eyebrow mb-2 text-xs text-primary">مقایسه دو مسیر</p>
        <h2 className="section-title mb-4 text-2xl font-bold">ERP ابری در برابر ERP اختصاصی</h2>
        <div className="erp-compare-scroll overflow-x-auto rounded-xl border bg-card">
          <table className="erp-compare-table w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="p-3 text-right">معیار</th>
                <th className="p-3 text-right">ERP ابری</th>
                <th className="p-3 text-right">ERP اختصاصی</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cloud, custom]) => (
                <tr key={label} className="border-b last:border-0">
                  <th className="erp-compare-row-label p-3 text-right font-medium">{label}</th>
                  <td className="p-3 text-muted-foreground">{cloud}</td>
                  <td className="p-3 text-muted-foreground">{custom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function PrePurchaseContactBand() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  return (
    <section className="pre-purchase-contact-section border-t py-14" aria-label="مشاوره قبل از خرید">
      <article className="pre-purchase-contact-box mx-auto grid max-w-5xl items-center gap-8 rounded-2xl border bg-card p-8 px-4 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-2 text-xs text-primary">مشاوره قبل از خرید</p>
          <h2 className="mb-2 text-xl font-bold">قبل از خرید با ما صحبت کنید</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            مسیر شروع، دامنه اولیه پروژه و قدم بعدی همکاری را در یک گفت‌وگوی کوتاه شفاف می‌کنیم.
          </p>
          <ul className="mb-4 space-y-1 text-sm text-muted-foreground">
            <li>• بررسی نیاز واقعی سازمان</li>
            <li>• پیشنهاد مسیر مرحله‌ای</li>
            <li>• پاسخ‌گویی مستقیم تیم {BRAND_NAME}</li>
          </ul>
          <a href="tel:02128428842" dir="ltr" className="font-medium text-primary">
            ۰۲۱ ۲۸۴۲۸۸۴۲
          </a>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
              onClick={() => setMeetingOpen(true)}
            >
              رزرو جلسه
            </button>
            <Link href="/pricing/estimate" className="rounded-lg border px-4 py-2 text-sm">
              برآورد هزینه
            </Link>
          </div>
        </div>
        <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted/30 text-sm text-muted-foreground">
          جلسه تحلیل فرآیند با تیم مشتری
        </div>
      </article>
      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </section>
  );
}
