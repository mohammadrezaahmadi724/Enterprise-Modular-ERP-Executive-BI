'use client';

import Link from 'next/link';
import { useState } from 'react';

const TABS = ['خلاصه', 'فاکتورها', 'تراکنش‌ها', 'صندلی‌ها', 'ماژول‌ها', 'Add-onها', 'روش پرداخت', 'تاریخچه'] as const;

export default function SubscriptionSettingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('خلاصه');

  return (
    <main className="mx-auto max-w-5xl px-4 py-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">اشتراک و صورتحساب</h1>
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-6 text-sm">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={t === tab ? 'font-bold text-primary' : 'text-muted-foreground'}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'خلاصه' && (
        <div className="rounded-xl border p-6 space-y-3">
          <p>
            پلن: <strong>حرفه‌ای</strong> <span className="text-xs bg-green-100 text-green-800 px-2 rounded">فعال</span>
          </p>
          <p className="text-sm">صندلی: {new Intl.NumberFormat('fa-IR').format(12)} / {new Intl.NumberFormat('fa-IR').format(25)}</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/checkout/plan/professional?renew=true" className="border rounded px-3 py-1 text-sm">
              تمدید
            </Link>
            <Link href="/checkout/plan/enterprise" className="border rounded px-3 py-1 text-sm">
              ارتقا
            </Link>
          </div>
          <p className="text-xs text-amber-600">۷ روز تا پایان دوره — تمدید را فراموش نکنید.</p>
        </div>
      )}
      {tab === 'صندلی‌ها' && (
        <p className="text-sm text-muted-foreground">لیست کاربران + دکمه افزودن صندلی (POST /api/v1/billing/seats با Idempotency-Key)</p>
      )}
      {tab === 'ماژول‌ها' && (
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          {['finance', 'sales', 'bi-risk'].map((m) => (
            <motion key={m} title={m}>
              <span className="text-green-600 text-xs">فعال</span>
              <Link href={`/${m === 'finance' ? 'finance' : m === 'sales' ? 'sales/orders' : 'bi/dashboard'}`} className="block text-primary text-xs mt-1">
                ورود به ماژول
              </Link>
            </motion>
          ))}
        </div>
      )}
      {tab !== 'خلاصه' && tab !== 'صندلی‌ها' && tab !== 'ماژول‌ها' && (
        <p className="text-sm text-muted-foreground">نمای {tab} — داده از API مستأجر (RLS)</p>
      )}
    </main>
  );
}

function motion(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded p-3">
      <p className="font-medium">{props.title}</p>
      {props.children}
    </div>
  );
}
