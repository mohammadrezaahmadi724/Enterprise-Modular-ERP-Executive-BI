'use client';

import { useState } from 'react';

export default function AiSettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [saved, setSaved] = useState(false);

  return (
    <main className="p-6 space-y-4 max-w-lg" dir="rtl">
      <h1 className="text-2xl font-bold">تنظیمات هوش مصنوعی</h1>
      <p className="text-xs text-muted-foreground">کلید API با AES-256-GCM (KMS) در سمت سرور ذخیره می‌شود.</p>
      <label className="block text-sm">
        مدل پیش‌فرض
        <input
          className="mt-1 w-full border rounded px-2 py-1"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        کلید API
        <input
          type="password"
          className="mt-1 w-full border rounded px-2 py-1"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
        />
      </label>
      <button
        type="button"
        className="border rounded px-3 py-1 text-sm"
        onClick={() => setSaved(true)}
      >
        ذخیره (رمزنگاری‌شده)
      </button>
      {saved && <p className="text-green-700 text-sm">ذخیره شد (نمونه UI)</p>}
    </main>
  );
}
