'use client';

import { useState } from 'react';
import { PhoneBar } from '@/components/marketing/PhoneBar';
import { useSiteContent } from '@/lib/use-site-content';

export default function FaqPage() {
  const site = useSiteContent();
  const [open, setOpen] = useState(0);
  return (
    <main className="sk-page flex-1 px-4 py-10" dir="rtl">
      <section className="sk-panel mx-auto max-w-3xl px-6 py-12">
        <h1 className="sk-display">{site.faqTitle}</h1>
        <p className="sk-lead mt-3">{site.faqIntro}</p>
        <div className="mt-8 space-y-2">
          {site.faq.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q} className="sk-faq">
                <button type="button" className="sk-faq-q" aria-expanded={expanded} onClick={() => setOpen(expanded ? -1 : index)}>
                  {item.q}
                </button>
                {expanded ? <p className="sk-faq-a">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
      <PhoneBar />
    </main>
  );
}
