'use client';

import { useEffect, useState } from 'react';
import { Button, Card } from '@repo/ui';
import { Bell, X } from 'lucide-react';
import { createReminder, fetchReminders, type ReminderApi } from '../../lib/projects-api';

export function ProjectsRemindersScreen() {
  const [rows, setRows] = useState<ReminderApi[]>([]);
  const [dialog, setDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [scheduleAt, setScheduleAt] = useState('۱۴۰۵/۰۸/۱۲ ۱۰:۰۰');
  const [channel, setChannel] = useState<'panel' | 'email'>('panel');

  useEffect(() => {
    (async () => {
      try {
        const { reminders } = await fetchReminders();
        setRows(reminders);
      } catch {
        /* */
      }
    })();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { reminder } = await createReminder({ title: title.trim(), scheduleAt, channel });
    setRows((prev) => [reminder, ...prev]);
    setDialog(false);
    setTitle('');
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-3 items-start">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Bell className="size-5 text-sky-600" />
            یادآورها
          </h1>
          <p className="text-xs text-muted-foreground">{rows.length.toLocaleString('fa-IR')} مورد زمان‌بندی شده</p>
        </div>
        <Button className="bg-rose-800" onClick={() => setDialog(true)}>
          + یادآوری جدید
        </Button>
      </div>

      <Card className="divide-y">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
            <div className="flex-1 min-w-0">
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {r.scheduleAt} · {r.channel === 'email' ? 'ایمیل' : 'داخل پنل'}
              </p>
            </div>
            {r.pastDue ? (
              <span className="text-xs rounded-full bg-rose-100 text-rose-800 px-2 py-0.5">زمان گذشته</span>
            ) : null}
            <Button type="button" variant="ghost" size="sm">
              ویرایش
            </Button>
            <Button type="button" variant="ghost" size="sm">
              لغو
            </Button>
          </div>
        ))}
      </Card>

      {dialog ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border bg-background shadow-lg">
            <div className="flex justify-between border-b px-4 py-3">
              <h3 className="font-semibold text-sm">یادآوری جدید</h3>
              <button type="button" onClick={() => setDialog(false)}>
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={submit} className="p-4 space-y-3 text-sm">
              <label className="block">
                <span className="text-xs">عنوان *</span>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </label>
              <label className="block">
                <span className="text-xs">زمان *</span>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} required />
              </label>
              <label className="block">
                <span className="text-xs">کانال</span>
                <select className="mt-1 w-full rounded-md border px-3 py-2 bg-background" value={channel} onChange={(e) => setChannel(e.target.value as 'panel' | 'email')}>
                  <option value="panel">داخل پنل</option>
                  <option value="email">ایمیل</option>
                </select>
              </label>
              <div className="flex gap-2 pt-2">
                <Button type="submit" className="bg-rose-800">
                  ثبت یادآوری
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialog(false)}>
                  انصراف
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
