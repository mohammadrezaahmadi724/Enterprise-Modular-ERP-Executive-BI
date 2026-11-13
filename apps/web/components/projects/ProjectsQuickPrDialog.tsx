'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@repo/ui';
import { ClipboardList, X } from 'lucide-react';
import { createPurchaseRequest } from '../../lib/procurement-api';
import type { ProjectContextApi } from '../../lib/projects-api';

type Props = {
  open: boolean;
  ctx: ProjectContextApi;
  onClose: () => void;
  onCreated: () => void;
};

export function ProjectsQuickPrDialog({ open, ctx, onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [estimatedMillion, setEstimatedMillion] = useState('');
  const [needDate, setNeedDate] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ number: string; approvalRequired?: boolean } | null>(null);

  if (!open) return null;

  const projectCode = ctx.project.code;
  const costCenter = ctx.finance.costCenterCode ?? '';
  const defaultTitle = `تأمین مواد — ${ctx.project.name}`.slice(0, 80);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = (title || defaultTitle).trim();
    if (!t) return;
    const millions = Number(estimatedMillion.replace(/,/g, ''));
    const estimatedUnitToman =
      Number.isFinite(millions) && millions > 0 ? Math.round(millions * 1_000_000) : 10_000_000;

    setBusy(true);
    setResult(null);
    try {
      const { request } = await createPurchaseRequest({
        title: t,
        purpose: `پروژه ${projectCode}`,
        project: projectCode,
        costCenter: costCenter || undefined,
        requestDate: '۱۴۰۵/۰۸/۱۲',
        needDate: needDate.trim() || ctx.project.deadline,
        note: note.trim() || `ثبت از زمینه پروژه ${projectCode}`,
        lines: [
          {
            description: t,
            quantity: 1,
            unit: 'بسته',
            estimatedUnitToman,
          },
        ],
      });
      setResult({ number: request.number, approvalRequired: request.approvalRequired });
      onCreated();
    } finally {
      setBusy(false);
    }
  }

  const fullFormHref = `/procurement/purchase-requests?project=${encodeURIComponent(projectCode)}&costCenter=${encodeURIComponent(costCenter)}&openForm=1&prefillTitle=${encodeURIComponent(title || defaultTitle)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <ManualForm
        busy={busy}
        costCenter={costCenter}
        defaultTitle={defaultTitle}
        estimatedMillion={estimatedMillion}
        fullFormHref={fullFormHref}
        needDate={needDate}
        note={note}
        onClose={onClose}
        projectCode={projectCode}
        result={result}
        setEstimatedMillion={setEstimatedMillion}
        setNeedDate={setNeedDate}
        setNote={setNote}
        setTitle={setTitle}
        submit={submit}
        title={title}
      />
    </div>
  );
}

function ManualForm({
  busy,
  costCenter,
  defaultTitle,
  estimatedMillion,
  fullFormHref,
  needDate,
  note,
  onClose,
  projectCode,
  result,
  setEstimatedMillion,
  setNeedDate,
  setNote,
  setTitle,
  submit,
  title,
}: {
  busy: boolean;
  costCenter: string;
  defaultTitle: string;
  estimatedMillion: string;
  fullFormHref: string;
  needDate: string;
  note: string;
  onClose: () => void;
  projectCode: string;
  result: { number: string; approvalRequired?: boolean } | null;
  setEstimatedMillion: (v: string) => void;
  setNeedDate: (v: string) => void;
  setNote: (v: string) => void;
  setTitle: (v: string) => void;
  submit: (e: React.FormEvent) => void;
  title: string;
}) {
  return (
    <MotionWrapper>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <ClipboardList className="size-4 text-rose-800" />
          درخواست خرید برای پروژه
        </h3>
        <button type="button" onClick={onClose} className="text-muted-foreground">
          <X className="size-4" />
        </button>
      </div>

      {result ? (
        <TakeSuccess result={result} projectCode={projectCode} onClose={onClose} fullFormHref={fullFormHref} />
      ) : (
        <form onSubmit={submit} className="p-4 space-y-3 text-sm">
          <p className="text-xs text-muted-foreground rounded-md bg-muted/50 px-3 py-2">
            پروژه <span className="font-mono font-medium">{projectCode}</span>
            {costCenter ? (
              <>
                {' '}
                · مرکز هزینه <span className="font-mono">{costCenter}</span>
              </>
            ) : null}{' '}
            — خودکار پر می‌شود؛ نیازی به رفتن به منوی تأمین نیست.
          </p>

          <label className="block">
            <span className="text-xs">عنوان درخواست *</span>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={defaultTitle}
            />
          </label>

          <label className="block">
            <span className="text-xs">برآورد هزینه (میلیون تومان)</span>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2 font-mono"
              inputMode="decimal"
              value={estimatedMillion}
              onChange={(e) => setEstimatedMillion(e.target.value)}
              placeholder="مثلاً ۱۲۰"
            />
          </label>

          <label className="block">
            <span className="text-xs text-muted-foreground">نیاز تا تاریخ (اختیاری)</span>
            <input className="mt-1 w-full rounded-md border px-3 py-2" value={needDate} onChange={(e) => setNeedDate(e.target.value)} placeholder="۱۴۰۵/۰۹/۰۱" />
          </label>

          <label className="block">
            <span className="text-xs text-muted-foreground">یادداشت</span>
            <textarea className="mt-1 w-full rounded-md border px-3 py-2 min-h-[60px]" value={note} onChange={(e) => setNote(e.target.value)} />
          </label>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button type="submit" disabled={busy} className="bg-rose-800">
              ثبت درخواست
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              انصراف
            </Button>
            <Button type="button" variant="ghost" size="sm" asChild className="mr-auto text-xs">
              <Link href={fullFormHref}>فرم کامل با اقلام متعدد</Link>
            </Button>
          </div>
        </form>
      )}
    </MotionWrapper>
  );
}

function TakeSuccess({
  result,
  projectCode,
  onClose,
  fullFormHref,
}: {
  result: { number: string; approvalRequired?: boolean };
  projectCode: string;
  onClose: () => void;
  fullFormHref: string;
}) {
  const listHref = `/procurement/purchase-requests?project=${encodeURIComponent(projectCode)}`;
  return (
    <div className="p-4 space-y-3 text-sm">
      <p className="font-medium text-emerald-800">درخواست {result.number} ثبت شد.</p>
      {result.approvalRequired ? (
        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          مبلغ بالای آستانه است — برای ادامه، تأیید CFO در همان درخواست لازم است.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button size="sm" asChild>
          <Link href={listHref}>مشاهده در لیست تأمین</Link>
        </Button>
        <Button size="sm" variant="outline" onClick={onClose}>
          بستن
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground">
        <Link href={fullFormHref} className="text-primary">
          ویرایش در فرم کامل
        </Link>
      </p>
    </div>
  );
}

function MotionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-md rounded-xl border bg-background shadow-lg">{children}</div>;
}
