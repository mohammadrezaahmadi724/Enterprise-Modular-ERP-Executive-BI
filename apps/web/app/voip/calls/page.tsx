'use client';

import { useEffect, useState } from 'react';

type Call = {
  id: string;
  direction: string;
  fromNumber: string;
  toNumber: string;
  durationSec: number;
  transcript?: string;
  recordingUrl?: string;
};

export default function VoipCallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [active, setActive] = useState<Call | null>(null);

  useEffect(() => {
    fetch('/api/voip/calls')
      .then((r) => r.json())
      .then((d) => {
        setCalls(d.calls ?? []);
        setActive((d.calls ?? [])[0] ?? null);
      });
  }, []);

  return (
    <main className="p-6 space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">تاریخچه تماس</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <ul className="border rounded p-3 text-sm space-y-2">
          {calls.map((c) => (
            <li key={c.id}>
              <button type="button" className="hover:underline w-full text-right" onClick={() => setActive(c)}>
                {c.direction} {c.toNumber} ({c.durationSec}s)
              </button>
            </li>
          ))}
        </ul>
        <div className="border rounded p-4 text-sm space-y-2">
          {active ? (
            <>
              <p>رکورد: {active.recordingUrl ?? '—'}</p>
              <p className="font-medium">رونوشت (STT)</p>
              <p>{active.transcript ?? '—'}</p>
            </>
          ) : (
            <p className="text-muted-foreground">تماسی انتخاب نشده</p>
          )}
        </div>
      </div>
    </main>
  );
}
