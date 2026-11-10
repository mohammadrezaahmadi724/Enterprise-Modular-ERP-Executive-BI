import Link from 'next/link';
import type { ModuleMeta } from '@/lib/modules-catalog';
import { MODULES } from '@/lib/modules-catalog';
import { BrowserMockup } from '../visuals/BrowserMockup';

export function ModulePresentation({ mod }: { mod: ModuleMeta }) {
  const related = MODULES.filter((m) => mod.related.includes(m.slug)).slice(0, 3);
  return (
    <main dir="rtl" className="font-vazir">
      <section className="dark bg-slate-950 text-slate-50 py-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8 px-4 items-center">
          <div>
            <h1 className="text-3xl font-bold">{mod.titleFa}</h1>
            <p className="mt-3 text-slate-300">{mod.tagline}</p>
          </div>
          <BrowserMockup title={mod.slug}>
            <p className="text-xs text-slate-300">پیش‌نمایش {mod.titleFa}</p>
          </BrowserMockup>
        </div>
      </section>
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2">چالش</h2>
        <p className="text-muted-foreground">{mod.problem}</p>
      </section>
      <section className="py-12 bg-muted/20 px-4">
        <h2 className="text-center text-xl font-bold mb-6">ویژگی‌ها</h2>
        <ul className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-2 text-sm">
          {mod.features.map((f) => (
            <li key={f} className="border rounded p-2">
              {f}
            </li>
          ))}
        </ul>
      </section>
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">نحوه کار</h2>
        <ol className="space-y-2">
          {mod.steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm">
              <span className="font-bold">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </section>
      <section className="py-12 px-4 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[1, 2, 3].map((n) => (
          <BrowserMockup key={n} title={`${mod.slug}-${n}`}>
            <span className="text-xs">اسکرین‌شات {n}</span>
          </BrowserMockup>
        ))}
      </section>
      <blockquote className="py-8 text-center text-sm italic max-w-xl mx-auto px-4">
        «با {mod.titleFa} زمان بستن ماه ۴۰٪ کمتر شد.»
      </blockquote>
      <section className="py-8 text-center flex flex-wrap gap-2 justify-center">
        {mod.related.map((s) => (
          <Link key={s} href={`/modules/${s}`} className="text-xs border rounded px-2 py-1">
            {s}
          </Link>
        ))}
      </section>
      <p className="text-center text-sm py-4">پلن پیشنهادی: <strong>{mod.plan}</strong></p>
      <section className="py-12 text-center bg-primary/5">
        <Link href="/demo" className="inline-block rounded-lg bg-blue-600 text-white px-6 py-3 text-sm">
          درخواست دمو
        </Link>
      </section>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-lg font-bold mb-4">ماژول‌های مرتبط</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/modules/${r.slug}`} className="border rounded p-3 text-sm hover:shadow">
              {r.titleFa}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
