'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, Boxes, CalendarCheck, Sparkles, Wallet } from 'lucide-react';
import { submitLead } from '@/lib/api';

const POINTS = [
  { icon: Wallet, title: 'مالی و خزانه', text: 'سند، چک و گزارش روی دادهٔ آزمایشی' },
  { icon: Boxes, title: 'فروش و انبار', text: 'سفارش، موجودی و گردش کالا' },
  { icon: BarChart3, title: 'داشبورد مدیریت', text: 'شاخص‌ها بدون کوئری روی تراکنش زنده' },
  { icon: CalendarCheck, title: 'جلسهٔ بعد از دمو', text: 'اگر فرآیندتان فرق دارد، جلسه جدا می‌گذاریم' },
];

const FIELDS = [
  { name: 'name', label: 'نام و نام خانوادگی', required: true, type: 'text', autoComplete: 'name' },
  { name: 'company', label: 'نام سازمان', required: false, type: 'text', autoComplete: 'organization' },
  { name: 'email', label: 'ایمیل کاری', required: true, type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'شماره تماس', required: false, type: 'tel', autoComplete: 'tel' },
] as const;

export default function DemoPage() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'sending'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('sending');
    const r = await submitLead({
      name: String(fd.get('name')),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email')),
      phone: String(fd.get('phone') || ''),
      message: String(fd.get('message') || ''),
      source: 'demo',
      idempotencyKey: `demo-${String(fd.get('email'))}`,
    });
    setStatus(r.ok ? 'ok' : 'err');
    if (r.ok) form.reset();
  }

  return (
    <main className="sk-hero py-10 md:py-16" dir="rtl">
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-[1.05fr_0.95fr]">
        <section>
          <p className="sk-badge inline-flex items-center gap-2">
            <Sparkles size={14} aria-hidden />
            محیط آزمایشی ERP Roshd
          </p>
          <h1 className="sk-display mt-4">
            دمو را روی
            <span className="text-primary"> فرآیند سازمان خودتان </span>
            ببینید
          </h1>
          <p className="sk-lead mt-4">
            فرم را بفرستید تا دسترسی محیط آزمایشی و زمان یک مرور کوتاه برایتان هماهنگ شود. دادهٔ دمو
            از اسناد واقعی سازمان جداست.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.title} className="rounded-2xl border border-[#e6e9f2] bg-white/80 p-4 shadow-sm">
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} aria-hidden />
                  </span>
                  <p className="font-semibold">{point.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{point.text}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            اگر فقط بازهٔ قیمت می‌خواهید،{' '}
            <Link href="/pricing/estimate" className="font-medium text-primary hover:underline">
              برآورد هزینه
            </Link>{' '}
            بدون ساخت حساب در دسترس است.
          </p>
        </section>

        <form onSubmit={onSubmit} className="sk-panel space-y-4 p-6 md:p-8">
          <div>
            <h2 className="text-xl font-bold">درخواست دسترسی دمو</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              حدود یک روز کاری برای هماهنگی وقت.
            </p>
          </div>
          {FIELDS.map((field) => (
            <label key={field.name} className="block text-sm">
              <span className="mb-1.5 block font-medium">
                {field.label}
                {field.required ? <span className="text-primary"> *</span> : null}
              </span>
              <input
                name={field.name}
                type={field.type}
                required={field.required}
                maxLength={field.name === 'name' ? 80 : 120}
                autoComplete={field.autoComplete}
                className="w-full rounded-xl border border-[#e4e7f0] bg-white px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          ))}
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">فرآیندی که می‌خواهید در دمو ببینید</span>
            <textarea
              name="message"
              rows={4}
              className="w-full resize-y rounded-xl border border-[#e4e7f0] bg-white px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="مثلاً فروش، انبار و خزانه برای یک شرکت پخش"
            />
          </label>
          <button type="submit" className="sk-btn sk-btn-primary w-full" disabled={status === 'sending'}>
            {status === 'sending' ? 'در حال ارسال…' : 'ثبت درخواست دمو'}
          </button>
          {status === 'ok' ? (
            <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
              درخواست ثبت شد. برای هماهنگی دمو با شما تماس می‌گیریم.
            </p>
          ) : null}
          {status === 'err' ? (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-800" role="alert">
              ارسال انجام نشد. اتصال API را بررسی کنید و دوباره تلاش کنید.
            </p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
