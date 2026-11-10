'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type AlertRow = {
  id: string;
  titleFa: string;
  bodyFa: string;
  severity: string;
  moduleCode: string;
  category: string;
  seenAt?: string;
  acknowledgedAt?: string;
  createdAt: string;
};

export default function AlertCenterPage() {
  const [rows, setRows] = useState<AlertRow[]>([]);
  const [severity, setSeverity] = useState('');
  const [moduleCode, setModuleCode] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    const res = await fetch('/api/alerts');
    const data = await res.json();
    setRows(data.items ?? []);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (severity && r.severity !== severity) return false;
      if (moduleCode && r.moduleCode !== moduleCode) return false;
      return true;
    });
  }, [rows, severity, moduleCode]);

  async function bulk(action: string) {
    await fetch('/api/alerts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ids: [...selected] }),
    });
    setSelected(new Set());
    await load();
  }

  return (
    <main className="p-6 space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">مرکز اعلان‌ها</h1>
      <div className="flex flex-wrap gap-2 text-sm">
        <select className="border rounded px-2" value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">شدت</option>
          <option value="info">info</option>
          <option value="warning">warning</option>
          <option value="critical">critical</option>
        </select>
        <input
          className="border rounded px-2"
          placeholder="ماژول"
          value={moduleCode}
          onChange={(e) => setModuleCode(e.target.value)}
        />
        <button type="button" className="border rounded px-2" onClick={() => bulk('seen')}>
          Seen
        </button>
        <button type="button" className="border rounded px-2" onClick={() => bulk('ack')}>
          Acknowledge
        </button>
        <button type="button" className="border rounded px-2" onClick={() => bulk('dismiss')}>
          Dismiss
        </button>
      </div>
      <table className="w-full text-sm border" style={{ fontFamily: 'Vazirmatn, Tahoma, sans-serif' }}>
        <thead className="bg-muted">
          <tr>
            <th className="p-2" />
            <th className="p-2 text-right">عنوان</th>
            <th className="p-2 text-right">شدت</th>
            <th className="p-2 text-right">ماژول</th>
            <th className="p-2 text-right">تأیید</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selected.has(r.id)}
                  onChange={(e) => {
                    const next = new Set(selected);
                    if (e.target.checked) next.add(r.id);
                    else next.delete(r.id);
                    setSelected(next);
                  }}
                />
              </td>
              <td className="p-2">{r.titleFa}</td>
              <td className="p-2">{r.severity}</td>
              <td className="p-2">{r.moduleCode}</td>
              <td className="p-2">{r.acknowledgedAt ? '✓' : r.seenAt ? 'seen' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
