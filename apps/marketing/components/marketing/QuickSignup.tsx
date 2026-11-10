'use client';

import { useState } from 'react';
import { submitLead } from '@/lib/api';

export function QuickSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = await submitLead({
      name: name || 'مهمان',
      email,
      message: 'ثبت‌نام سریع Home',
      source: 'home-cta',
      idempotencyKey: `home-${email}`,
    });
    setMsg(r.ok ? 'ثبت شد — ایمیل تأیید ارسال می‌شود.' : 'خطا در ارسال');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h2 className="text-xl font-bold text-center">ثبت‌نام سریع</h2>
      <input className="w-full border rounded px-3 py-2 text-sm" placeholder="نام" value={name} onChange={(e) => setName(e.target.value)} />
      <input required type="email" className="w-full border rounded px-3 py-2 text-sm" placeholder="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" className="w-full rounded-lg bg-blue-600 text-white py-2 text-sm">
        ارسال
      </button>
      {msg && <p className="text-xs text-center text-green-700">{msg}</p>}
    </form>
  );
}
