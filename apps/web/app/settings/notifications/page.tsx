'use client';

import { useState } from 'react';

export default function NotificationPreferencesPage() {
  const [channels, setChannels] = useState({ InApp: true, Email: true, SMS: false, WebPush: false });
  const [quiet, setQuiet] = useState({ start: '22:00', end: '07:00' });

  return (
    <main className="p-6 space-y-4 max-w-lg" dir="rtl">
      <h1 className="text-2xl font-bold">ترجیحات اعلان</h1>
      {(Object.keys(channels) as (keyof typeof channels)[]).map((k) => (
        <label key={k} className="flex items-center justify-between border rounded p-3 text-sm">
          <span>{k}</span>
          <input
            type="checkbox"
            checked={channels[k]}
            onChange={(e) => setChannels({ ...channels, [k]: e.target.checked })}
          />
        </label>
      ))}
      <fieldset className="border rounded p-3 text-sm space-y-2">
        <legend>ساعات سکوت</legend>
        <input type="time" value={quiet.start} onChange={(e) => setQuiet({ ...quiet, start: e.target.value })} />
        <span className="mx-2">تا</span>
        <input type="time" value={quiet.end} onChange={(e) => setQuiet({ ...quiet, end: e.target.value })} />
      </fieldset>
      <p className="text-xs text-muted-foreground">critical همیشه همه کانال‌ها را فعال می‌کند.</p>
    </main>
  );
}
