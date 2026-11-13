'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiBase } from '../lib/api-base';

type Ops = {
  tenancy: { tenants: number; subscriptions: Array<{ slug: string; status: string; seatPressurePercent: number }> };
  queues: Array<{ name: string; failed: number; waiting: number }>;
  redis: { mode: string; status?: string };
};

function headers() {
  return {
    'x-super-admin': 'true',
    'x-tenant-id': '11111111-1111-4111-8111-111111111111',
    'x-correlation-id': crypto.randomUUID(),
  };
}

export function SakhtarPlatformDashboard() {
  const [ops, setOps] = useState<Ops | null>(null);
  const [tickets, setTickets] = useState(0);
  const [users, setUsers] = useState(0);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const [mon, tRows, uRows] = await Promise.all([
          fetch(`${apiBase()}/api/v1/platform/ops/monitor`, { headers: headers(), cache: 'no-store' }),
          fetch(`${apiBase()}/api/v1/platform/admin/tickets`, { headers: headers(), cache: 'no-store' }),
          fetch(`${apiBase()}/api/v1/platform/admin/users`, { headers: headers(), cache: 'no-store' }),
        ]);
        if (mon.ok) setOps((await mon.json()) as Ops);
        if (tRows.ok) {
          const d = (await tRows.json()) as { rows: unknown[] };
          setTickets(d.rows.filter((r) => {
            const st = (r as { status?: string }).status;
            return st === 'open' || st === 'باز' || st === 'در حال بررسی';
          }).length);
        }
        if (uRows.ok) {
          const d = (await uRows.json()) as { rows: unknown[] };
          setUsers(d.rows.length);
        }
      } catch (e) {
        setErr(e instanceof Error ? e.message : 'خطا در API');
      }
    })();
  }, []);

  const failedJobs = useMemo(
    () => ops?.queues.reduce((s, q) => s + q.failed, 0) ?? 0,
    [ops],
  );

  const nf = new Intl.NumberFormat('fa-IR');

  return (
    <div className="space-y-5" dir="rtl">
      {err ? <p className="text-xs text-amber-700 bg-amber-50 rounded-md px-3 py-2">{err}</p> : null}
      <header>
        <h1 className="text-2xl font-bold">داشبورد Super Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">کنترل SaaS — tenant، کاربر، اشتراک و سلامت سیستم.</p>
      </header>

      <div className="pc-kpi-grid">
        <Link href="/tenants" className="pc-stat-card hover:border-primary/40 transition">
          <span className="text-xs text-muted-foreground">مستأجر</span>
          <strong className="block text-2xl mt-1">{ops ? nf.format(ops.tenancy.tenants) : '—'}</strong>
        </Link>
        <Link href="/users" className="pc-stat-card hover:border-primary/40 transition">
          <span className="text-xs text-muted-foreground">کاربر ثبت‌شده</span>
          <strong className="block text-2xl mt-1">{nf.format(users)}</strong>
        </Link>
        <Link href="/tickets" className="pc-stat-card hover:border-primary/40 transition">
          <span className="text-xs text-muted-foreground">تیکت باز</span>
          <strong className="block text-2xl mt-1">{nf.format(tickets)}</strong>
        </Link>
        <Link href="/health" className="pc-stat-card hover:border-primary/40 transition">
          <span className="text-xs text-muted-foreground">صف failed</span>
          <strong className="block text-2xl mt-1">{nf.format(failedJobs)}</strong>
          <span className="text-[10px] text-muted-foreground">Redis: {ops?.redis.mode ?? '—'}</span>
        </Link>
      </div>

      <section className="pc-stat-card">
        <h2 className="font-semibold text-sm mb-3">فشار صندلی اشتراک‌ها</h2>
        <ul className="space-y-2 text-sm">
          {(ops?.tenancy.subscriptions ?? []).slice(0, 8).map((s) => (
            <li key={s.slug} className="flex justify-between gap-2 border-b border-border/50 pb-2">
              <span>{s.slug}</span>
              <span className="text-muted-foreground">
                {s.status} · {nf.format(s.seatPressurePercent)}٪ صندلی
              </span>
            </li>
          ))}
          {!ops?.tenancy.subscriptions?.length ? (
            <li className="text-muted-foreground text-xs">از API ops/monitor بارگذاری می‌شود.</li>
          ) : null}
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        {[
          ['/users', '+ کاربر جدید'],
          ['/tenants', 'مستأجر جدید'],
          ['/cloud-pricing', 'تعرفه ابری'],
          ['/break-glass', 'Break-Glass'],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="text-xs border rounded-full px-3 py-1.5 hover:bg-muted/50">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
