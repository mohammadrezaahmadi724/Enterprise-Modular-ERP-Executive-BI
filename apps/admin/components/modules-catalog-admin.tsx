'use client';

import { useEffect, useState } from 'react';
import type { ModuleCatalogEntry } from '@repo/contracts';
import { Badge, Button, Card, CardContent, Input, PageHeader } from '@repo/ui';
import { fetchModuleCatalog, saveModuleCatalog } from '../lib/pricing-admin-api';

const fmt = (n: number) => new Intl.NumberFormat('fa-IR').format(n);

export function ModulesCatalogAdmin() {
  const [modules, setModules] = useState<ModuleCatalogEntry[]>([]);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void fetchModuleCatalog()
      .then((r) => {
        setModules(r.modules);
        setVersion(r.catalogVersion);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  const patch = (code: string, field: keyof ModuleCatalogEntry, value: string | number | boolean) => {
    setModules((prev) =>
      prev.map((m) => (m.code === code ? { ...m, [field]: value } : m)),
    );
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const r = await saveModuleCatalog(modules);
      setModules(r.modules);
      setVersion(r.catalogVersion);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="کاتالوگ ماژول‌های ERP"
        description="قیمت پایه هر ماژول — مستقیماً در /pricing/estimate مارکتینگ و پلن‌ها در صفحه «پلن و برآورد» اعمال می‌شود. درخواست‌های رزرو جلسه در منوی «رزرو جلسه / تیکت»."
        action={
          <Badge variant="secondary" dir="ltr">
            v{version}
          </Badge>
        }
      />
      {error ? (
        <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
          {error}
        </p>
      ) : null}
      <h2 className="text-base font-bold text-left" dir="rtl">
        ماژول‌ها
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {modules.map((m) => (
          <Card key={m.code} className="overflow-hidden">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full shrink-0" style={{ background: m.color }} aria-hidden />
                  <div>
                    <p className="font-semibold">{m.nameFa}</p>
                    <p className="text-xs text-muted-foreground font-mono" dir="ltr">
                      {m.code}
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={m.active}
                    onChange={(e) => patch(m.code, 'active', e.target.checked)}
                  />
                  فعال
                </label>
              </div>
              <Input
                value={m.subtitle}
                onChange={(e) => patch(m.code, 'subtitle', e.target.value)}
                placeholder="زیرعنوان"
              />
              <div>
                <label className="text-xs text-muted-foreground block mb-1">قیمت پیاده‌سازی (ریال)</label>
                <Input
                  type="number"
                  value={m.listPriceIrr}
                  onChange={(e) => patch(m.code, 'listPriceIrr', Number(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">{fmt(m.listPriceIrr)} ریال</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => void save()} disabled={saving}>
          {saving ? 'در حال ذخیره…' : 'ذخیره کاتالوگ'}
        </Button>
      </div>
    </div>
  );
}
