'use client';

import { useEffect, useState } from 'react';
import type { CloudSubscriptionRates, ErpModuleCode, ModuleCatalogEntry } from '@repo/contracts';
import { DEFAULT_CLOUD_SUBSCRIPTION_RATES } from '@repo/contracts';
import { Badge, Button, Card, CardContent, Input, PageHeader } from '@repo/ui';
import {
  clearCloudSubscriptionRates,
  fetchCloudSubscriptionRates,
  fetchModuleCatalog,
  saveCloudSubscriptionRates,
} from '../lib/pricing-admin-api';
import { CommercialDeskNav } from './commercial-desk-nav';

const fmt = (n: number) => new Intl.NumberFormat('fa-IR').format(n);

export function CloudSubscriptionAdmin() {
  const [rates, setRates] = useState<CloudSubscriptionRates>(DEFAULT_CLOUD_SUBSCRIPTION_RATES);
  const [catalog, setCatalog] = useState<ModuleCatalogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void Promise.all([fetchCloudSubscriptionRates(), fetchModuleCatalog()])
      .then(([r, c]) => {
        setRates(r);
        setCatalog(c.modules);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  const setModuleTomans = (code: ErpModuleCode, value: number) => {
    setRates((prev) => ({
      ...prev,
      moduleMonthlyTomans: { ...prev.moduleMonthlyTomans, [code]: value },
    }));
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const next = await saveCloudSubscriptionRates({
        baseMonthlyTomans: rates.baseMonthlyTomans,
        includedSeats: rates.includedSeats,
        extraSeatTomans: rates.extraSeatTomans,
        maxSeats: rates.maxSeats,
        moduleMonthlyTomans: rates.moduleMonthlyTomans,
        planCode: rates.planCode,
      });
      setRates(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  const resetOverrides = async () => {
    if (!confirm('تنظیمات ذخیره‌شده پاک شود و فقط پلن/پیش‌فرض اعمال شود؟')) return;
    setSaving(true);
    try {
      const next = await clearCloudSubscriptionRates();
      setRates(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <CommercialDeskNav />
      <PageHeader
        title="تعرفه اشتراک و صندلی"
        description="مبالغ تومان ماهانه — در برآوردگر سایت و پیشنهاد «شروع ابری» استفاده می‌شود. اولویت: این صفحه، بعد پلن CLOUD_PLAN_CODE، بعد پیش‌فرض contracts."
      />
      {error ? (
        <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">منبع فعلی: {rates.source}</Badge>
        {rates.planCode ? <Badge variant="outline">پلن: {rates.planCode}</Badge> : null}
      </div>

      <Card>
        <CardContent className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm">
            <span className="text-muted-foreground block mb-1">پایه ماهانه (تومان)</span>
            <Input
              type="number"
              value={rates.baseMonthlyTomans}
              onChange={(e) => setRates((p) => ({ ...p, baseMonthlyTomans: Number(e.target.value) }))}
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground block mb-1">صندلی شامل</span>
            <Input
              type="number"
              value={rates.includedSeats}
              onChange={(e) => setRates((p) => ({ ...p, includedSeats: Number(e.target.value) }))}
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground block mb-1">هر صندلی اضافه (تومان)</span>
            <Input
              type="number"
              value={rates.extraSeatTomans}
              onChange={(e) => setRates((p) => ({ ...p, extraSeatTomans: Number(e.target.value) }))}
            />
          </label>
          <label className="text-sm">
            <span className="text-muted-foreground block mb-1">سقف کاربران ابری</span>
            <Input
              type="number"
              value={rates.maxSeats}
              onChange={(e) => setRates((p) => ({ ...p, maxSeats: Number(e.target.value) }))}
            />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="font-bold">تعرفه ماژول ماهانه (تومان)</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {catalog.map((m) => {
              const price = rates.moduleMonthlyTomans[m.code] ?? 0;
              return (
                <label key={m.code} className="rounded-xl border p-3 flex flex-col gap-2">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="size-2.5 rounded-full" style={{ background: m.color }} />
                    {m.nameFa}
                    <span className="text-xs text-muted-foreground font-normal">({m.code})</span>
                  </span>
                  <Input type="number" value={price} onChange={(e) => setModuleTomans(m.code, Number(e.target.value))} />
                  <span className="text-xs text-muted-foreground">نمایش: {fmt(price)} تومان/ماه</span>
                </label>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => void save()} disabled={saving}>
          {saving ? 'ذخیره…' : 'ذخیره تعرفه ابری'}
        </Button>
        <Button variant="outline" onClick={() => void resetOverrides()} disabled={saving}>
          پاک کردن override (برگشت به پلن/پیش‌فرض)
        </Button>
      </div>
    </div>
  );
}
