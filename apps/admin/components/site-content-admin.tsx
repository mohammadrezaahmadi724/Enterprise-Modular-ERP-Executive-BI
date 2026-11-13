'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_MARKETING_SITE, type MarketingSiteContent } from '@repo/contracts';
import { Button, PageHeader } from '@repo/ui';
import { fetchMarketingSite, saveMarketingSite } from '../lib/pricing-admin-api';
import { CommercialDeskNav } from './commercial-desk-nav';

export function SiteContentAdmin() {
  const [site, setSite] = useState<MarketingSiteContent>(DEFAULT_MARKETING_SITE);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void fetchMarketingSite()
      .then(setSite)
      .catch((e: Error) => setError(e.message));
  }, []);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      setSite(await saveMarketingSite(site));
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  const setProof = (index: number, value: string) => {
    setSite((prev) => {
      const heroProofs = [...prev.heroProofs];
      heroProofs[index] = value;
      return { ...prev, heroProofs };
    });
  };

  return (
    <div className="space-y-4" dir="rtl">
      <CommercialDeskNav />
      <PageHeader
        title="محتوای سایت"
        description="متن صفحه اصلی، برآورد، درباره رشد و پرسش‌ها. قیمت ماژول و اشتراک از دو صفحهٔ کناری همین نوار می‌آید."
      />
      {error ? <p className="rounded-lg border border-destructive/40 px-3 py-2 text-sm text-destructive">{error}</p> : null}
      {saved ? <p className="text-sm text-emerald-700">ذخیره شد. صفحهٔ مارکتینگ با تازه‌سازی همین متن را نشان می‌دهد.</p> : null}

      <section className="grid gap-3 rounded-3xl border bg-card p-4 shadow-sm">
        <h2 className="font-bold">تماس</h2>
        <label className="text-sm">
          شماره نمایشی
          <input className="mt-1 w-full rounded-lg border px-3 py-2" value={site.phoneDisplay} onChange={(e) => setSite({ ...site, phoneDisplay: e.target.value })} />
        </label>
        <label className="text-sm">
          شماره تماس tel
          <input className="mt-1 w-full rounded-lg border px-3 py-2" dir="ltr" value={site.phoneTel} onChange={(e) => setSite({ ...site, phoneTel: e.target.value })} />
        </label>
      </section>

      <section className="grid gap-3 rounded-3xl border bg-card p-4 shadow-sm">
        <h2 className="font-bold">صفحه اصلی</h2>
        <Field label="نشان" value={site.heroBadge} onChange={(heroBadge) => setSite({ ...site, heroBadge })} />
        <Field label="سطر عنوان" value={site.heroTitleLead} onChange={(heroTitleLead) => setSite({ ...site, heroTitleLead })} />
        <Field label="عبارت رنگی" value={site.heroTitleAccent} onChange={(heroTitleAccent) => setSite({ ...site, heroTitleAccent })} />
        <Field label="ادامه عنوان" value={site.heroTitleRest} onChange={(heroTitleRest) => setSite({ ...site, heroTitleRest })} />
        <Area label="توضیح" value={site.heroBody} onChange={(heroBody) => setSite({ ...site, heroBody })} />
        {site.heroProofs.map((proof, index) => (
          <Field key={index} label={`نکته ${index + 1}`} value={proof} onChange={(value) => setProof(index, value)} />
        ))}
      </section>

      <section className="grid gap-3 rounded-3xl border bg-card p-4 shadow-sm">
        <h2 className="font-bold">برآورد هزینه</h2>
        <Field label="نشان" value={site.pricingBadge} onChange={(pricingBadge) => setSite({ ...site, pricingBadge })} />
        <Field label="عنوان" value={site.pricingTitle} onChange={(pricingTitle) => setSite({ ...site, pricingTitle })} />
        <Field label="عبارت رنگی" value={site.pricingAccent} onChange={(pricingAccent) => setSite({ ...site, pricingAccent })} />
        <Area label="توضیح" value={site.pricingBody} onChange={(pricingBody) => setSite({ ...site, pricingBody })} />
      </section>

      <section className="grid gap-3 rounded-3xl border bg-card p-4 shadow-sm">
        <h2 className="font-bold">درباره</h2>
        <Field label="نشان" value={site.aboutKicker} onChange={(aboutKicker) => setSite({ ...site, aboutKicker })} />
        <Field label="عنوان" value={site.aboutTitle} onChange={(aboutTitle) => setSite({ ...site, aboutTitle })} />
        <Area label="متن" value={site.aboutBody} onChange={(aboutBody) => setSite({ ...site, aboutBody })} />
        {site.aboutPoints.map((point, index) => (
          <div key={index} className="grid gap-2 rounded-2xl border p-3">
            <Field
              label={`کارت ${index + 1}`}
              value={point.title}
              onChange={(title) => {
                const aboutPoints = site.aboutPoints.map((row, i) => (i === index ? { ...row, title } : row));
                setSite({ ...site, aboutPoints });
              }}
            />
            <Area
              label="شرح"
              value={point.body}
              onChange={(body) => {
                const aboutPoints = site.aboutPoints.map((row, i) => (i === index ? { ...row, body } : row));
                setSite({ ...site, aboutPoints });
              }}
            />
          </div>
        ))}
      </section>

      <section className="grid gap-3 rounded-3xl border bg-card p-4 shadow-sm">
        <h2 className="font-bold">پرسش‌ها</h2>
        <Field label="عنوان" value={site.faqTitle} onChange={(faqTitle) => setSite({ ...site, faqTitle })} />
        <Area label="مقدمه" value={site.faqIntro} onChange={(faqIntro) => setSite({ ...site, faqIntro })} />
        {site.faq.map((item, index) => (
          <div key={index} className="grid gap-2 rounded-2xl border p-3">
            <Field
              label={`پرسش ${index + 1}`}
              value={item.q}
              onChange={(q) => {
                const faq = site.faq.map((row, i) => (i === index ? { ...row, q } : row));
                setSite({ ...site, faq });
              }}
            />
            <Area
              label="پاسخ"
              value={item.a}
              onChange={(a) => {
                const faq = site.faq.map((row, i) => (i === index ? { ...row, a } : row));
                setSite({ ...site, faq });
              }}
            />
          </div>
        ))}
      </section>

      <Button type="button" onClick={() => void save()} disabled={saving}>
        {saving ? 'در حال ذخیره…' : 'ذخیره محتوای سایت'}
      </Button>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm">
      {label}
      <input className="mt-1 w-full rounded-lg border px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm">
      {label}
      <textarea className="mt-1 min-h-24 w-full rounded-lg border px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
