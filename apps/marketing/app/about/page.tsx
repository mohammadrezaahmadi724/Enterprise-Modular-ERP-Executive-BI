'use client';

import Link from 'next/link';
import { PhoneBar } from '@/components/marketing/PhoneBar';
import { useSiteContent } from '@/lib/use-site-content';

export default function AboutPage() {
  const site = useSiteContent();
  return (
    <main className="sk-page flex-1 px-4 py-10" dir="rtl">
      <section className="sk-panel mx-auto max-w-4xl px-6 py-12 space-y-4">
        <p className="sk-badge inline-flex">{site.aboutKicker}</p>
        <h1 className="sk-display">{site.aboutTitle}</h1>
        <p className="sk-lead max-w-3xl">{site.aboutBody}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/pricing" className="sk-btn sk-btn-primary">
            برآورد هزینه
          </Link>
          <Link href="/faq" className="sk-btn sk-btn-ghost">
            پرسش‌ها
          </Link>
        </div>
      </section>
      <section className="mx-auto mt-4 grid max-w-4xl gap-3 md:grid-cols-3">
        {site.aboutPoints.map((point) => (
          <article key={point.title} className="sk-panel px-5 py-6">
            <h2 className="text-lg font-bold">{point.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{point.body}</p>
          </article>
        ))}
      </section>
      <PhoneBar />
    </main>
  );
}
