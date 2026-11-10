'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ErpModuleCode, ModuleCatalogEntry } from '@repo/contracts';
import { Badge, Button, Card, CardContent, Input, PageHeader } from '@repo/ui';
import {
  fetchModuleCatalog,
  fetchPlansWithModules,
  updatePlanModules,
  type PlanModulesRow,
} from '../lib/pricing-admin-api';

const fmt = (n: number) => new Intl.NumberFormat('fa-IR').format(n);

export function PlansModulesAdmin() {
  const [catalog, setCatalog] = useState<ModuleCatalogEntry[]>([]);
  const [plans, setPlans] = useState<PlanModulesRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const selected = useMemo(() => plans.find((p) => p.id === selectedId) ?? plans[0], [plans, selectedId]);

  useEffect(() => {
    void Promise.all([fetchModuleCatalog(), fetchPlansWithModules()])
      .then(([c, p]) => {
        setCatalog(c.modules);
        setPlans(p);
        if (p[0]) setSelectedId(p[0].id);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  const toggleModule = (code: ErpModuleCode) => {
    if (!selected) return;
    const has = selected.includedModules.includes(code);
    const includedModules = has
      ? selected.includedModules.filter((c) => c !== code)
      : [...selected.includedModules, code];
    setPlans((prev) => prev.map((p) => (p.id === selected.id ? { ...p, includedModules } : p)));
  };

  const setModulePrice = (code: ErpModuleCode, price: number) => {
    if (!selected) return;
    setPlans((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? { ...p, modulePrices: { ...p.modulePrices, [code]: price } }
          : p,
      ),
    );
  };

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    setError(null);
    try {
      const { plan } = await updatePlanModules(selected.id, {
        includedModules: selected.includedModules,
        modulePrices: selected.modulePrices,
      });
      setPlans((prev) => prev.map((p) => (p.id === plan.id ? plan : p)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="پلن‌ها و ماژول‌های اشتراک"
        description="هم‌تراز با برآورد مارکتینگ: ماژول‌های شامل هر پلن و قیمت اختصاصی. کاتالوگ پایه از صفحه «قیمت ماژول‌ها»."
      />
      {error ? (
        <p className="text-sm text-destructive rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {plans.map((p) => (
          <Button
            key={p.id}
            variant={selected?.id === p.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedId(p.id)}
          >
            {p.nameFa}
            <Badge variant="secondary" className="mr-2">
              {p.includedModules.length} ماژول
            </Badge>
          </Button>
        ))}
      </div>

      {selected ? (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">{selected.nameFa}</h2>
                <p className="text-sm text-muted-foreground">
                  پایه ماهانه: {selected.basePrice ? `${fmt(selected.basePrice)} ریال` : 'سفارشی'} · نسخه{' '}
                  {selected.version}
                </p>
              </div>
              <Button onClick={() => void save()} disabled={saving}>
                {saving ? 'ذخیره…' : 'ذخیره تنظیمات پلن'}
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {catalog.map((m) => {
                const included = selected.includedModules.includes(m.code);
                const override = selected.modulePrices[m.code];
                const displayPrice = override ?? m.listPriceIrr;
                return (
                  <label
                    key={m.code}
                    className={`flex flex-col gap-2 rounded-xl border p-3 cursor-pointer transition-colors ${
                      included ? 'border-primary bg-primary/5' : 'opacity-80 hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input type="checkbox" checked={included} onChange={() => toggleModule(m.code)} />
                      <span className="size-2.5 rounded-full" style={{ background: m.color }} />
                      <span className="font-medium">{m.nameFa}</span>
                    </span>
                    <div className="text-xs text-muted-foreground pl-6">کاتالوگ: {fmt(m.listPriceIrr)} ریال</div>
                    <div className="pl-6">
                      <span className="text-xs text-muted-foreground block mb-1">قیمت در این پلن (ریال)</span>
                      <Input
                        type="number"
                        value={displayPrice}
                        onChange={(e) => setModulePrice(m.code, Number(e.target.value))}
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
