'use client';

import { Footer } from '@/components/marketing/Footer';
import { submitLead } from '@/lib/api';

export default function ContactPage() {
  return (
    <main className="py-12 max-w-3xl mx-auto px-4 grid md:grid-cols-2 gap-8" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold mb-4">تماس</h1>
        <p className="text-sm text-muted-foreground">تهران، خیابان مثال (نقشه Placeholder)</p>
        <div className="mt-6 h-40 rounded border bg-muted flex items-center justify-center text-xs">نقشه</div>
      </div>
      <form
        className="space-y-3 text-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          await submitLead({
            name: String(fd.get('name')),
            email: String(fd.get('email')),
            message: String(fd.get('message')),
            source: 'contact',
            idempotencyKey: `contact-${Date.now()}`,
          });
        }}
      >
        <input name="name" required maxLength={80} className="w-full border rounded px-3 py-2" placeholder="نام" />
        <input name="email" type="email" required className="w-full border rounded px-3 py-2" placeholder="ایمیل" />
        <textarea name="message" className="w-full border rounded px-3 py-2" placeholder="پیام" rows={4} />
        <button type="submit" className="w-full rounded-lg border py-2">
          ارسال
        </button>
      </form>
      <Footer />
    </main>
  );
}
