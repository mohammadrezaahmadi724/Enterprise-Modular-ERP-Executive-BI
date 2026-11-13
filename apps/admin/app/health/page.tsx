'use client';

import { useCallback, useEffect, useState } from 'react';

type ProdRuntime = {
  persistence: { finance: boolean; crm: boolean; wms: boolean };
  smtp: { configured: boolean; mode: string };
  kms: { configured: boolean; keyVersion: string };
  backup: { policy: string; lastRun?: string };
};

type OpsSnapshot = {
  database: {
    connected: boolean;
    database?: string;
    schemas: Array<{ name: string; tables: number; totalRows: number }>;
    error?: string;
  };
  redis: { mode: string; status?: string; memoryHuman?: string; connectedClients?: number };
  queues: Array<{ name: string; waiting: number; active: number; delayed: number; failed: number }>;
  tenancy: {
    tenants: number;
    subscriptions: Array<{
      tenantName: string;
      slug: string;
      status: string;
      seats: number;
      usedSeats: number;
      seatPressurePercent: number;
    }>;
  };
};

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';

export default function HealthPage() {
  const [data, setData] = useState<OpsSnapshot | null>(null);
  const [runtime, setRuntime] = useState<ProdRuntime | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [monitorRes, runtimeRes] = await Promise.all([
        fetch(`${API}/api/v1/platform/ops/monitor`, { headers: { 'x-super-admin': 'true' } }),
        fetch(`${API}/api/v1/platform/ops/runtime`, { headers: { 'x-super-admin': 'true' } }),
      ]);
      if (!monitorRes.ok) throw new Error(`monitor HTTP ${monitorRes.status}`);
      setData((await monitorRes.json()) as OpsSnapshot);
      if (runtimeRes.ok) {
        setRuntime((await runtimeRes.json()) as ProdRuntime);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const t = setInterval(() => void load(), 15_000);
    return () => clearInterval(t);
  }, [load]);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-bold">مانیتورینگ پلتفرم</h1>
        <button type="button" onClick={() => void load()} className="text-sm border rounded px-3 py-1" disabled={loading}>
          بروزرسانی
        </button>
      </div>

      {error && <p className="text-sm text-red-600">API: {error} — مطمئن شوید `pnpm --filter @repo/api dev` روی پورت ۳۰۰۰ است.</p>}

      {runtime ? (
        <section className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Persistence ERP (runtime)</h2>
          <ul className="text-sm flex flex-wrap gap-3">
            <PersistBadge label="Finance" on={runtime.persistence.finance} />
            <PersistBadge label="CRM" on={runtime.persistence.crm} />
            <PersistBadge label="WMS" on={runtime.persistence.wms} />
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            WMS: <code>WMS_PERSISTENCE</code> + جداول <code>wms_stock_documents</code> / <code>wms_reservations</code>
          </p>
        </section>
      ) : null}

      {data && (
        <>
          <section className="grid md:grid-cols-2 gap-4">
            <Card title="PostgreSQL">
              {data.database.connected ? (
                <ul className="text-sm space-y-1">
                  <li>
                    دیتابیس: <strong>{data.database.database}</strong>
                  </li>
                  <li className="text-xs text-muted-foreground">
                    در pgAdmin به schemaهای <code>platform</code> و <code>platform_outbox</code> نگاه کنید — جدول‌های <code>public</code> معمولاً خالی‌اند.
                  </li>
                  {data.database.schemas.map((s) => (
                    <li key={s.name}>
                      {s.name}: {new Intl.NumberFormat('fa-IR').format(s.tables)} جدول — ~{new Intl.NumberFormat('fa-IR').format(s.totalRows)} ردیف
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-red-600">{data.database.error ?? 'قطع'}</p>
              )}
            </Card>
            <Card title="Redis / صف‌ها">
              <p className="text-sm">
                Redis: <strong>{data.redis.mode}</strong> {data.redis.status && `(${data.redis.status})`}
              </p>
              {data.redis.memoryHuman && <p className="text-xs">حافظه: {data.redis.memoryHuman}</p>}
              <p className="text-xs text-muted-foreground mt-2">REDIS_URL پیش‌فرض dev: redis://127.0.0.1:6379</p>
              <table className="w-full text-xs mt-3 border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-start py-1">صف</th>
                    <th>منتظر</th>
                    <th>فعال</th>
                    <th>شکست</th>
                  </tr>
                </thead>
                <tbody>
                  {data.queues.map((q) => (
                    <tr key={q.name} className="border-b">
                      <td className="py-1 font-mono">{q.name}</td>
                      <td className="text-center">{q.waiting}</td>
                      <td className="text-center">{q.active}</td>
                      <td className="text-center">{q.failed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          <section>
            <h2 className="font-semibold mb-2">فشار اشتراک و صندلی</h2>
            <p className="text-sm text-muted-foreground mb-2">
              مستأجران: {new Intl.NumberFormat('fa-IR').format(data.tenancy.tenants)}
              {data.tenancy.tenants === 0 ? (
                <>
                  {' '}
                  — اگر صفر است: <code className="text-xs">pnpm db:push && pnpm db:seed</code>
                </>
              ) : null}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-2 text-start">مستأجر</th>
                    <th>وضعیت</th>
                    <th>صندلی</th>
                    <th>مصرف</th>
                  </tr>
                </thead>
                <tbody>
                  {data.tenancy.subscriptions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        ردیفی نیست — seed را اجرا کنید
                      </td>
                    </tr>
                  ) : (
                    data.tenancy.subscriptions.map((s) => (
                      <tr key={s.slug} className="border-t">
                        <td className="p-2">
                          {s.tenantName}
                          <span className="text-xs text-muted-foreground block">{s.slug}</span>
                        </td>
                        <td className="p-2 text-center">{s.status}</td>
                        <td className="p-2 text-center">
                          {new Intl.NumberFormat('fa-IR').format(s.usedSeats)} / {new Intl.NumberFormat('fa-IR').format(s.seats)}
                        </td>
                        <td className="p-2">
                          <div className="h-2 bg-muted rounded overflow-hidden">
                            <div
                              title={`${s.seatPressurePercent}%`}
                              className={`h-full ${s.seatPressurePercent >= 80 ? 'bg-amber-500' : 'bg-primary'}`}
                              style={{ width: `${s.seatPressurePercent}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function PersistBadge({ label, on }: { label: string; on: boolean }) {
  return (
    <li className={`rounded px-2 py-1 text-xs border ${on ? 'bg-emerald-50 border-emerald-200' : 'bg-muted'}`}>
      {label}: <strong>{on ? 'PostgreSQL' : 'memory'}</strong>
    </li>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Legacy className="border rounded-lg p-4">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </Legacy>
  );
}

function Legacy(props: React.HTMLAttributes<HTMLDivElement>) {
  return <HealthBox {...props} />;
}

function HealthBox(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
