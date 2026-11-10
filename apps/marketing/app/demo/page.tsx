'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/api';
import { Footer } from '@/components/marketing/Footer';

export default function DemoPage() {
  const [status, setStatus] = useState('');
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = await submitLead({
      name: String(fd.get('name')),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email')),
      phone: String(fd.get('phone') || ''),
      message: String(fd.get('message') || ''),
      source: 'demo',
      idempotencyKey: `demo-${String(fd.get('email'))}`,
    });
    setStatus(r.ok ? 'درخواست ثبت شد.' : 'خطا');
  }
  return (
    <main className="py-12 max-w-lg mx-auto px-4" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">درخواست دمو</h1>
      <form onSubmit={onSubmit} className="space-y-3 text-sm">
        {['name', 'company', 'email', 'phone', 'message'].map((f) => (
          <input
            key={f}
            name={f}
            required={f === 'name' || f === 'email'}
            className="w-full border rounded px-3 py-2"
            placeholder={f}
          />
        ))}
        <button type="submit" className="w-full rounded-lg bg-blue-600 text-white py-2">
          ارسال
        </button>
      </form>
      {status && <p className="mt-3 text-green-700 text-sm">{status}</p>}
      <Footer />
    </main>
  );
}
