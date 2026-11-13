'use client';

import { useState } from 'react';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { AlertTriangle, Boxes } from 'lucide-react';
import { createWmsAdjustment } from '../../lib/wms-api';

export function WmsAdjustmentsScreen() {
  const [reason, setReason] = useState('شمارش دوره‌ای — اختلاف جزئی');
  const [counted, setCounted] = useState('100');
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
        حساس‌ترین صفحهٔ انبار — دلیل الزامی است و ثبت با نام شما در سابقه می‌ماند.
      </p>
      <Card className="border-rose-200/60 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold">اصلاح جدید</h3>
          <Badge variant="outline" className="gap-1 text-amber-700 border-amber-300">
            <AlertTriangle className="size-3" />
            اقدام حساس
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <Field label="کالا *" select />
          <Field label="انبار *" select />
          <Field label="محل انبار *" select disabledHint="ابتدا انبار و کالا را انتخاب کنید" />
          <Field label="تاریخ *" placeholder="انتخاب تاریخ" />
          <Field label="موجودی شمارش‌شده *" type="number" />
          <Field label="بچ" />
          <Field label="سریال" />
          <Field label="ارزش ریالی واحد" hint="اختیاری در کسری، الزامی در اضافات" />
        </div>
        <label className="text-xs flex flex-col gap-1">
          دلیل اصلاح *
          <textarea
            className="min-h-[80px] rounded-md border border-rose-300 px-3 py-2 text-sm"
            placeholder="ذکر دلیل اصلاح موجودی الزامی است."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <label className="text-xs flex flex-col gap-1 max-w-xs">
          موجودی شمارش‌شده *
          <input className="rounded-md border px-3 py-2" type="number" value={counted} onChange={(e) => setCounted(e.target.value)} />
        </label>
        {error ? <p className="text-xs text-amber-600">{error}</p> : null}
        {msg ? <p className="text-xs text-emerald-700">{msg}</p> : null}
        <Button
          className="bg-rose-700 hover:bg-rose-800 w-fit"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            setError(null);
            setMsg(null);
            try {
              const res = await createWmsAdjustment({
                sku: 'PRD-1016',
                warehouse: 'WH-ESF',
                countedQty: Number(counted),
                reason,
                unitValueRial: Number(counted) > 0 ? 1_200_000 : undefined,
              });
              setMsg(`ثبت شد — دلتا: ${res.delta}`);
            } catch (e) {
              setError(e instanceof Error ? e.message : 'خطا');
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? 'ثبت…' : 'ثبت اصلاح (API)'}
        </Button>
      </Card>

      <Card className="finance-aging-card">
        <CardContent className="py-12 text-center space-y-2">
          <Boxes className="size-10 mx-auto text-muted-foreground/50" />
          <p className="font-semibold">اصلاح‌های موجودی · ۰ سند</p>
          <p className="text-sm text-muted-foreground">اصلاحی ثبت نشده — اصلاح موجودی جدید را از فرم بالا ثبت کنید.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  select,
  type,
  placeholder,
  hint,
  disabledHint,
}: {
  label: string;
  select?: boolean;
  type?: string;
  placeholder?: string;
  hint?: string;
  disabledHint?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs">
      {label}
      {select ? (
        <select className="rounded-md border px-3 py-2 text-sm">
          <option>{disabledHint ?? 'انتخاب'}</option>
        </select>
      ) : (
        <input type={type ?? 'text'} placeholder={placeholder} className="rounded-md border px-3 py-2 text-sm" />
      )}
      {hint ? <span className="text-[10px] text-muted-foreground">{hint}</span> : null}
    </label>
  );
}
