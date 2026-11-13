'use client';

import { TEMPLATE_KEYS } from '@repo/db-alerts/templates/keys';
import { renderEmailTemplate } from '@repo/db-alerts/templates/render';
import { useMemo, useState } from 'react';

export default function NotificationTemplatesPage() {
  const [key, setKey] = useState<string>(TEMPLATE_KEYS[0] ?? 'welcome_staff');
  const preview = useMemo(
    () =>
      renderEmailTemplate(key, {
        message: 'پیش‌نمایش زنده قالب',
        footer: 'نسخه ۱',
        amount: 9_876_543,
      }),
    [key],
  );

  return (
    <main style={{ padding: 24 }} dir="rtl">
      <h1>ویرایشگر قالب (RTL)</h1>
      <select value={key} onChange={(e) => setKey(e.target.value)} style={{ marginBottom: 12 }}>
        {TEMPLATE_KEYS.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
      <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, background: '#fff' }}>
        <h2 style={{ marginTop: 0 }}>{preview?.subject}</h2>
        <div dangerouslySetInnerHTML={{ __html: preview?.html ?? '' }} />
      </div>
      <p style={{ fontSize: 12, color: '#666' }}>نسخه‌بندی: v1 فعال — Handlebars-style variables</p>
    </main>
  );
}
