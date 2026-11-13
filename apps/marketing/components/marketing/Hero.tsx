'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MeetingDialog } from './MeetingDialog';
import { ModuleNetworkVisual } from '../visuals/ModuleNetworkVisual';
import { PhoneBar } from './PhoneBar';
import { useSiteContent } from '@/lib/use-site-content';

export function Hero() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  const site = useSiteContent();
  return (
    <section className="sakhtar-home-hero sk-hero py-8 md:py-14" dir="rtl">
      <motion.div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div className="sakhtar-home-hero-content order-2 lg:order-1">
          <p className="sk-badge mb-4 inline-flex items-center gap-2">
            <span className="sakhtar-hero-badge-dot size-2 rounded-full bg-primary" />
            {site.heroBadge}
          </p>
          <h1 className="sk-display">
            {site.heroTitleLead}
            <br />
            <span className="text-primary">{site.heroTitleAccent}</span>
            <br />
            {site.heroTitleRest}
          </h1>
          <p className="sk-lead mt-4">{site.heroBody}</p>
          <div className="sakhtar-hero-ctas mt-8 flex flex-wrap gap-3">
            <Link href="/pricing/estimate" className="sk-btn sk-btn-primary">
              برآورد هزینه
            </Link>
            <button type="button" className="sk-btn sk-btn-ghost" onClick={() => setMeetingOpen(true)}>
              رزرو جلسه
            </button>
          </div>
          <ul className="sakhtar-hero-proof mt-6 space-y-2 text-sm">
            {site.heroProofs.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-primary" aria-hidden>
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="sakhtar-hero-secondary-links mt-6 flex flex-wrap gap-2">
            <Link href="/demo" className="sk-chip">
              ERP ابری
            </Link>
            <Link href="/pricing" className="sk-chip">
              برآورد اختصاصی
            </Link>
            <Link href="/modules/finance" className="sk-chip">
              ماژول‌ها
            </Link>
          </div>
        </div>
        <div className="sakhtar-home-hero-visual order-1 lg:order-2">
          <ModuleNetworkVisual />
        </div>
      </motion.div>
      <PhoneBar />
      <MeetingDialog open={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </section>
  );
}
