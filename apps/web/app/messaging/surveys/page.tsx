'use client';

import { Card, Title } from '@tremor/react';

const mockResults = [
  { name: 'رضایت', value: 78 },
  { name: 'پاسخ‌دهی', value: 62 },
];

export default function SurveysPage() {
  return (
    <main className="p-6 space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">نظرسنجی‌ها</h1>
      <p className="text-xs text-muted-foreground">CRUD نظرسنجی + نتایج (Tremor)</p>
      <Card>
        <Title>خلاصه نتایج نمونه</Title>
        <ul className="mt-2 text-sm space-y-1">
          {mockResults.map((r) => (
            <li key={r.name}>
              {r.name}: {r.value}%
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}
