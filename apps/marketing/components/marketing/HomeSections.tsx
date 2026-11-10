'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MODULES } from '@/lib/modules-catalog';
import { REGISTER_PATH } from '@/lib/constants';
import { reveal } from './motion';
import { BrowserMockup } from '../visuals/BrowserMockup';
import { QuickSignup } from './QuickSignup';
import { FAQItem, StepCard } from '@repo/ui';
import { Hero } from './Hero';
import {
  ErpCompareBand,
  HomeAnswerBand,
  HomeStatsBand,
  PrePurchaseContactBand,
} from './HomeSakhtarBands';
import { MeetingDialog } from './MeetingDialog';

export function HomeSections() {
  return (
    <>
      <Hero />
      <HomeStatsBand />
      <HomeAnswerBand />
      <ErpCompareBand />
      <TrustBar />
      <section className="py-14" dir="rtl">
        <h2 className="text-center text-2xl font-bold mb-8">ماژول‌ها</h2>
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <motion.div key={m.slug} {...reveal} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Link href={`/modules/${m.slug}`} className="block rounded-xl border p-4 hover:shadow-lg">
                <h3 className="font-semibold">{m.titleFa}</h3>
                <p className="text-sm text-muted-foreground mt-1">{m.tagline}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <FeatureGrid />
      <section className="py-14 bg-muted/30" dir="rtl">
        <div className="mx-auto max-w-4xl px-4">
          <BrowserMockup title="داشبورد">
            <p className="text-sm">گزارش‌های مدیریتی از projection — بدون فشار به OLTP</p>
          </BrowserMockup>
        </div>
      </section>
      <section className="py-14 text-center" dir="rtl">
        <p className="text-sm text-muted-foreground mb-2">ویدیو معرفی</p>
        <div className="mx-auto max-w-3xl aspect-video rounded-xl border bg-muted flex items-center justify-center">
          Demo تعاملی (Placeholder)
        </div>
      </section>
      <PricingPreview />
      <Testimonials />
      <HowItWorks />
      <IntegrationsBar />
      <SecuritySection />
      <FAQAccordion />
      <PrePurchaseContactBand />
      <FinalCTA />
      <section className="py-16 bg-primary/5" dir="rtl">
        <div className="mx-auto max-w-md px-4">
          <QuickSignup />
        </div>
      </section>
    </>
  );
}

function TrustBar() {
  const stats = ['+۵۰۰ کسب‌وکار', '+۲M سند مالی', '۹۹.۹٪ آپتایم', '+۹ ماژول'];
  return (
    <section className="py-10 border-b" dir="rtl">
      <p className="text-center text-xs text-muted-foreground mb-4">مورد اعتماد تیم‌های مالی و عملیات</p>
      <div className="mx-auto max-w-6xl px-4 flex flex-wrap justify-center gap-8 text-sm font-medium">
        {stats.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">زرین‌پال • آیدی‌پی • کاوه‌نگار</p>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-14" dir="rtl">
      <h2 className="text-center text-2xl font-bold mb-8">در ۳ قدم شروع کنید</h2>
      <div className="mx-auto max-w-xl space-y-6 px-4">
        <StepCard n={1} title="ثبت‌نام رایگان" desc="۱۴ روز Trial بدون کارت بانکی" />
        <StepCard n={2} title="انتخاب ماژول‌ها" desc="فقط آنچه نیاز دارید را فعال کنید" />
        <StepCard n={3} title="شروع کار" desc="ورود داده یا Migration Engine" />
      </div>
      <div className="text-center mt-6">
        <Link href={REGISTER_PATH} className="text-primary font-medium">
          همین حالا شروع کنید
        </Link>
      </div>
    </section>
  );
}

function IntegrationsBar() {
  const logos = ['زرین‌پال', 'آیدی‌پی', 'تلگرام', 'بله', 'n8n', 'Excel'];
  return (
    <section className="py-12 bg-muted/20" dir="rtl">
      <h2 className="text-center font-bold mb-4">با ابزارهای شما یکپارچه می‌شود</h2>
      <Box className="flex flex-wrap justify-center gap-3 text-xs px-4">
        {logos.map((l) => (
          <span key={l} className="border rounded px-3 py-1">
            {l}
          </span>
        ))}
      </Box>
    </section>
  );
}

function SecuritySection() {
  return (
    <section className="py-14 px-4 max-w-4xl mx-auto" dir="rtl">
      <h2 className="text-center text-2xl font-bold mb-6">امنیت در سطح سازمانی</h2>
      <Box className="grid sm:grid-cols-2 gap-3 text-sm">
        {['AES-256-GCM', 'RLS چندمستأجری', 'Break-Glass دو نفره', 'Backup + Restore Drill'].map((t) => (
          <div key={t} className="border rounded p-3">
            {t}
          </div>
        ))}
      </Box>
      <p className="text-center mt-4 text-sm">
        <Link href="/legal/security" className="text-primary">
          جزئیات امنیت
        </Link>
      </p>
    </section>
  );
}

function FinalCTA() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  return (
    <section className="final-cta-section home-final-cta py-16 text-center bg-gradient-to-b from-primary/10 to-transparent" dir="rtl">
      <h2 className="text-2xl font-bold">برای ERP سازمان خود از برآورد هزینه شروع کنید</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
        ماژول‌ها را انتخاب کنید یا جلسه تحلیل فرآیند رزرو کنید — بدون ساخت حساب ERP برای مشاهده برآورد اولیه.
      </p>
      <div className="conversion-actions flex flex-wrap justify-center gap-3 mt-6">
        <Link href="/pricing/estimate" className="primary-button rounded-md px-4 py-2 text-primary-foreground bg-primary">
          دریافت برآورد هزینه
        </Link>
        <button type="button" className="secondary-button rounded-md border px-4 py-2" onClick={() => setMeetingOpen(true)}>
          رزرو جلسه بررسی فرآیند
        </button>
        <Link href={REGISTER_PATH} className="rounded-md border px-4 py-2 text-sm">
          ERP ابری — ۱۵ روز رایگان
        </Link>
      </div>
      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </section>
  );
}

function FeatureGrid() {
  const items = ['چند‌مستأجری امن', 'دفتر کل تضمین‌شده', 'CQRS و Outbox', 'هشدار real-time', 'RTL کامل', 'ISO-ready'];
  return (
    <section className="py-14" dir="rtl">
      <h2 className="text-center text-2xl font-bold mb-8">ویژگی‌های کلیدی</h2>
      <div className="mx-auto grid max-w-4xl gap-4 px-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((t) => (
          <motion.div key={t} {...reveal} className="rounded-lg border p-4 text-sm">
            {t}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PricingPreview() {
  const plans = ['Starter', 'Growth', 'Enterprise'];
  return (
    <section className="py-14" dir="rtl" id="pricing-preview">
      <h2 className="text-center text-2xl font-bold mb-6">پیش‌نمایش قیمت</h2>
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4 px-4">
        {plans.map((p) => (
          <div key={p} className="w-52 rounded-xl border p-4 text-center">
            <p className="font-semibold">{p}</p>
            <Link href="/pricing/estimate" className="text-xs text-primary mt-2 inline-block">
              برآورد ماژول
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { n: 'سارا', c: 'تولیدی آرتا', q: 'پیاده‌سازی سریع ماژول مالی عالی بود.' },
    { n: 'رضا', c: 'پخش نوین', q: 'BI بدون کند کردن سیستم عملیاتی.' },
    { n: 'مینا', c: 'خرده‌فروشی کهربا', q: 'POS یکپارچه با حسابداری.' },
  ];
  return (
    <section className="py-14 bg-muted/20" dir="rtl">
      <h2 className="text-center text-2xl font-bold mb-8">نظر مشتریان</h2>
      <div className="mx-auto grid max-w-5xl gap-4 px-4 md:grid-cols-3">
        {t.map((x) => (
          <blockquote key={x.n} className="rounded-lg border p-4 text-sm">
            <p>«{x.q}»</p>
            <footer className="mt-2 text-muted-foreground">
              {x.n} — {x.c}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function FAQAccordion() {
  const faqs = [
    ['آیا نیاز به نصب دارم؟', 'خیر، کاملاً ابری است.'],
    ['Trial نیاز به کارت دارد؟', 'خیر، ۱۴ روز رایگان.'],
    ['داده من امن است؟', 'RLS + رمزنگاری + پشتیبان روزانه.'],
    ['تخفیف سالانه؟', '۲۰٪ برای پرداخت سالانه.'],
  ];
  return (
    <section className="py-14" dir="rtl">
      <h2 className="text-center text-2xl font-bold mb-6">سوالات متداول</h2>
      <Box className="mx-auto max-w-2xl space-y-2 px-4">
        {faqs.map(([q, a]) => (
          <FAQItem key={q} q={q} a={a} />
        ))}
      </Box>
    </section>
  );
}

function Box(props: React.PropsWithChildren<{ className?: string }>) {
  return <div className={props.className}>{props.children}</div>;
}
