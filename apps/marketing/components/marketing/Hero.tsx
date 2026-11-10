'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MeetingDialog } from './MeetingDialog';
import { ModuleNetworkVisual } from '../visuals/ModuleNetworkVisual';
import { BRAND_NAME } from '@/lib/brand';

export function Hero() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  return (
    <section className="sakhtar-home-hero bg-gradient-to-b from-background to-muted/30 py-12 md:py-20" dir="rtl">
      <motion.div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="sakhtar-home-hero-content order-2 lg:order-1">
          <p className="sakhtar-hero-badge mb-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="sakhtar-hero-badge-dot size-2 rounded-full bg-primary" />
            {BRAND_NAME} — ERP ماژولار ابری و اختصاصی
          </p>
          <h1 className="sakhtar-home-hero-heading text-3xl font-bold leading-snug md:text-4xl">
            <span className="text-primary">ERP ابری</span> و ERP اختصاصی
            <br />
            متناسب با فرآیند واقعی شما
          </h1>
          <p className="sakhtar-hero-subtitle mt-4 text-sm text-muted-foreground md:text-base">
            فروش، مالی، انبار، تولید، BI و AI در یک سیستم ماژولار. برآورد آنلاین از قیمت کاتالوگ ادمین یا رزرو جلسه
            مشاوره.
          </p>
          <ul className="sakhtar-hero-proof mt-6 space-y-2 text-sm">
            {['تحویل MVP اختصاصی در ۲۰ روز کاری', '۱۵ روز ERP ابری رایگان', 'هوش مصنوعی در تحلیل و گزارش مدیریتی'].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-primary" aria-hidden>
                    ✓
                  </span>
                  {t}
                </li>
              ),
            )}
          </ul>
          <div className="sakhtar-hero-ctas mt-8 flex flex-wrap gap-3">
            <Link
              href="/pricing/estimate"
              className="btn-grad rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              برآورد هزینه
            </Link>
            <button
              type="button"
              className="btn-white rounded-xl border px-6 py-3 text-sm"
              onClick={() => setMeetingOpen(true)}
            >
              رزرو جلسه
            </button>
          </div>
          <div className="sakhtar-hero-secondary-links mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="/demo" className="hover:text-primary">
              ERP ابری ←
            </Link>
            <Link href="/pricing" className="hover:text-primary">
              راهنمای قیمت ←
            </Link>
            <Link href="/modules/finance" className="hover:text-primary">
              ماژول‌ها ←
            </Link>
          </div>
        </div>
        <div className="sakhtar-home-hero-visual order-1 lg:order-2">
          <ModuleNetworkVisual />
        </div>
      </motion.div>
      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </section>
  );
}
