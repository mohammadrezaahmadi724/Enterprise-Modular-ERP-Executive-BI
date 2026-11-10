'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

type AlertItem = {
  id: string;
  titleFa: string;
  severity: string;
  createdAt: string;
};

const POLL_MS = 30_000;

export function AlertBell() {
  const [unseen, setUnseen] = useState(0);
  const [items, setItems] = useState<AlertItem[]>([]);
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch('/api/alerts');
    const data = await res.json();
    setUnseen(data.unseen ?? 0);
    setItems(data.latest ?? []);
    const critical = (data.latest ?? []).find((a: AlertItem) => a.severity === 'critical');
    if (critical && data._toastCritical) {
      toast.error(critical.titleFa, { description: 'نیاز به تأیید (Acknowledgment)' });
    }
  }, []);

  useEffect(() => {
    void load();
    const t = setInterval(load, POLL_MS);
    return () => clearInterval(t);
  }, [load]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="اعلان‌ها"
        className="relative p-2 rounded hover:bg-muted"
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="w-5 h-5" />
        {unseen > 0 && (
          <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] rounded-full px-1 min-w-[16px]">
            {unseen}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-80 border bg-background shadow-lg rounded z-50 text-sm" dir="rtl">
          <div className="p-2 border-b font-medium">آخرین اعلان‌ها</div>
          <ul className="max-h-64 overflow-auto">
            {items.slice(0, 10).map((a) => (
              <li key={a.id} className="p-2 border-b hover:bg-muted">
                <span className="font-medium">{a.titleFa}</span>
                <span className="text-xs text-muted-foreground block">{a.severity}</span>
              </li>
            ))}
          </ul>
          <Link href="/alerts" className="block p-2 text-center text-primary hover:underline">
            مرکز اعلان‌ها
          </Link>
        </div>
      )}
    </div>
  );
}
