'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge, Button, Card, CardContent } from '@repo/ui';
import { ClipboardList, Plus, Trash2 } from 'lucide-react';
import { cn } from '@repo/ui';
import { DEMO_PURCHASE_REQUESTS, type PrStatus } from '../../lib/procurement-demo';
import {
  approvePurchaseRequest,
  createPurchaseRequest,
  fetchProcurementThresholds,
  fetchPurchaseRequests,
  type PurchaseRequestApi,
} from '../../lib/procurement-api';
import {
  ProcurementGridToolbar,
  ProcurementListCardHeader,
  PrStatusBadge,
  StatusFilterTabs,
  rowPadding,
  type RowDensity,
} from './procurement-screen-bits';
import { PROCUREMENT_LIST_META } from './ProcurementHubOverviewClient';
import { DEFAULT_PR_APPROVAL_TOMAN } from '../../lib/procurement-thresholds';
import { formatToman } from '../../lib/finance-receivables-demo';

type LineRow = { sku: string; description: string; quantity: string; unit: string; estimatedUnitToman: string };

const STATUS_OPTIONS: Array<{ id: PrStatus | 'all'; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'draft', label: 'پیش‌نویس' },
  { id: 'sent', label: 'ارسال‌شده' },
  { id: 'approved', label: 'تأیید‌شده' },
  { id: 'rejected', label: 'رد‌شده' },
  { id: 'canceled', label: 'لغو‌شده' },
];

export function ProcurementPurchaseRequestsScreen() {
  const searchParams = useSearchParams();
  const projectFromUrl = searchParams.get('project')?.trim() ?? '';
  const prHighlight = searchParams.get('pr')?.trim() ?? '';
  const costCenterFromUrl = searchParams.get('costCenter')?.trim() ?? '';
  const prefillTitle = searchParams.get('prefillTitle')?.trim() ?? '';
  const openForm = searchParams.get('openForm') === '1';

  const [showForm, setShowForm] = useState(true);
  const [rows, setRows] = useState<PurchaseRequestApi[]>(DEMO_PURCHASE_REQUESTS as PurchaseRequestApi[]);
  const [statusFilter, setStatusFilter] = useState<PrStatus | 'all'>('all');
  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [project, setProject] = useState('');
  const [costCenter, setCostCenter] = useState('');
  const [requestDate, setRequestDate] = useState('۱۴۰۵/۰۸/۱۲');
  const [needDate, setNeedDate] = useState('');
  const [note, setNote] = useState('');
  const [lines, setLines] = useState<LineRow[]>([{ sku: '', description: '', quantity: '1', unit: 'عدد', estimatedUnitToman: '' }]);
  const [prThresholdToman, setPrThresholdToman] = useState(DEFAULT_PR_APPROVAL_TOMAN);

  useEffect(() => {
    if (!projectFromUrl && !prefillTitle && !costCenterFromUrl && !prHighlight) return;
    if (projectFromUrl) setProject(projectFromUrl);
    if (costCenterFromUrl) setCostCenter(costCenterFromUrl);
    if (prefillTitle) setTitle(prefillTitle);
    if (prHighlight) setSearch(prHighlight);
    if (openForm || projectFromUrl) setShowForm(true);
  }, [projectFromUrl, costCenterFromUrl, prefillTitle, openForm, prHighlight]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { thresholds } = await fetchProcurementThresholds();
        if (!cancelled) setPrThresholdToman(thresholds.prApprovalToman);
      } catch {
        /* default */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { requests } = await fetchPurchaseRequests();
        if (!cancelled && requests.length) setRows(requests);
      } catch {
        /* demo */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (projectFromUrl && (r.project ?? '').trim() !== projectFromUrl) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (!search.trim()) return true;
      const q = search.trim();
      return r.number.includes(q) || r.title.includes(q);
    });
  }, [rows, statusFilter, search, projectFromUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setMessage('عنوان الزامی است');
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      const { request: created } = await createPurchaseRequest({
        title: title.trim(),
        purpose: purpose.trim() || undefined,
        warehouse: warehouse.trim() || undefined,
        project: project.trim() || undefined,
        costCenter: costCenter.trim() || undefined,
        requestDate: requestDate.trim(),
        needDate: needDate.trim() || undefined,
        note: note.trim() || undefined,
        lines: lines.map((l) => ({
          sku: l.sku.trim() || undefined,
          description: l.description.trim() || undefined,
          quantity: Number(l.quantity) || 1,
          unit: l.unit.trim() || 'عدد',
          estimatedUnitToman: l.estimatedUnitToman ? Number(l.estimatedUnitToman) : undefined,
        })),
      });
      setRows((prev) => [created, ...prev]);
      if (created.approvalRequired) {
        setMessage(
          `درخواست ${created.number} ثبت شد — بالای آستانه تأیید؛ workflow ${created.workflowInstanceId ?? ''} منتظر CFO است`,
        );
      } else {
        setMessage(`درخواست ${created.number} ثبت شد`);
      }
      setTitle('');
      setPurpose('');
      setNote('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'خطا در ثبت');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        آستانه تأیید CFO برای درخواست خرید:{' '}
        <span className="font-semibold tabular-nums">{formatToman(prThresholdToman)} تومان</span>
      </p>
      {projectFromUrl ? (
        <p className="text-xs flex flex-wrap items-center gap-2 rounded-md border border-sky-200 bg-sky-50/60 px-3 py-2">
          <Badge variant="secondary" className="font-mono">
            پروژه {projectFromUrl}
          </Badge>
          فقط درخواست‌های این پروژه نمایش داده می‌شود.
          <Link href="/procurement/purchase-requests" className="text-primary mr-auto">
            حذف فیلتر
          </Link>
          <Link href={`/projects/projects/${encodeURIComponent(projectFromUrl)}`} className="text-primary">
            بازگشت به زمینه پروژه
          </Link>
        </p>
      ) : null}
      {showForm ? (
        <Card className="border-violet-200/60 bg-violet-50/30 dark:bg-violet-950/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">درخواست خرید جدید</h2>
                <p className="text-xs text-muted-foreground">نیاز عملیاتی با خطوط کالا / خدمت</p>
              </div>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                بستن فرم
              </Button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="عنوان*" value={title} onChange={setTitle} required />
                <Field label="هدف / شرح نیاز" value={purpose} onChange={setPurpose} />
                <Field label="انبار مقصد" value={warehouse} onChange={setWarehouse} placeholder="WH-THR" />
                <Field label="پروژه" value={project} onChange={setProject} placeholder="بدون پروژه" />
                <Field label="مرکز هزینه" value={costCenter} onChange={setCostCenter} />
                <Field label="تاریخ درخواست*" value={requestDate} onChange={setRequestDate} required />
                <Field label="موعد نیاز" value={needDate} onChange={setNeedDate} placeholder="انتخاب تاریخ" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">اقلام درخواست</p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setLines((prev) => [...prev, { sku: '', description: '', quantity: '1', unit: 'عدد', estimatedUnitToman: '' }])
                    }
                  >
                    <Plus className="size-4 ml-1" />
                    افزودن قلم
                  </Button>
                </div>
                <LinesTable lines={lines} onChange={setLines} />
              </div>

              <label className="block text-sm">
                <span className="text-muted-foreground">یادداشت</span>
                <textarea className="mt-1 w-full rounded-md border bg-background p-2 text-sm min-h-[72px]" value={note} onChange={(e) => setNote(e.target.value)} />
              </label>

              {message ? <p className="text-xs text-muted-foreground">{message}</p> : null}
              <Button type="submit" disabled={submitting} className="bg-rose-800 hover:bg-rose-900">
                ثبت درخواست
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button type="button" onClick={() => setShowForm(true)} className="bg-rose-800 hover:bg-rose-900">
          <Plus className="size-4 ml-1" />
          درخواست خرید جدید
        </Button>
      )}

      <Card className="overflow-hidden">
        <ProcurementListCardHeader
          icon={<ClipboardList className="size-5" />}
          title="درخواست‌های خرید"
          subtitle={`${PROCUREMENT_LIST_META.toLocaleString('fa-IR')} درخواست در دسترس شما`}
        />
        <ProcurementGridToolbar search={search} onSearch={setSearch} placeholder="شماره یا عنوان" density={density} onDensity={setDensity}>
          <StatusFilterTabs value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
        </ProcurementGridToolbar>
        <SelectAllSubheader label="تراکم ردیف" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/40 text-muted-foreground">
                <th className="py-2 px-3 text-right">شماره</th>
                <th className="py-2 px-3 text-right">عنوان</th>
                <th className="py-2 px-3 text-right">انبار مقصد</th>
                <th className="py-2 px-3 text-right">پروژه / مرکز هزینه</th>
                <th className="py-2 px-3 text-right">تاریخ درخواست</th>
                <th className="py-2 px-3 text-right">موعد نیاز</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.number} className="border-b border-dashed hover:bg-muted/20">
                  <td className={cn('px-3 font-mono text-violet-800', rowPadding(density))}>{r.number}</td>
                  <td className={cn('px-3 max-w-[200px] truncate', rowPadding(density))}>{r.title}</td>
                  <td className={cn('px-3 font-mono text-[11px]', rowPadding(density))}>{r.warehouse ?? '—'}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    {[r.project, r.costCenter].filter(Boolean).join(' / ') || '—'}
                  </td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.requestDate}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.needDate ?? '—'}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    <MotionApprove
                      r={r}
                      thresholdToman={prThresholdToman}
                      onApproved={(pr) => setRows((prev) => prev.map((x) => (x.number === pr.number ? pr : x)))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="text-sm block">
      <span className="text-muted-foreground text-xs">{label}</span>
      <input
        className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function LinesTable({ lines, onChange }: { lines: LineRow[]; onChange: (v: LineRow[]) => void }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b bg-muted/30">
            <th className="py-2 px-2 w-8">#</th>
            <th className="py-2 px-2 text-right">کالا / خدمت *</th>
            <th className="py-2 px-2 text-right">شرح</th>
            <th className="py-2 px-2 text-right">مقدار *</th>
            <th className="py-2 px-2 text-right">واحد *</th>
            <th className="py-2 px-2 text-right">قیمت برآوردی (تومان)</th>
            <th className="w-8" />
          </tr>
        </thead>
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="border-b">
              <td className="px-2 py-1 text-center text-muted-foreground">{i + 1}</td>
              <td className="px-2 py-1">
                <input className="w-full rounded border px-2 py-1.5" value={line.sku} onChange={(e) => patchLine(lines, onChange, i, { sku: e.target.value })} />
              </td>
              <td className="px-2 py-1">
                <input className="w-full rounded border px-2 py-1.5" value={line.description} onChange={(e) => patchLine(lines, onChange, i, { description: e.target.value })} />
              </td>
              <td className="px-2 py-1">
                <input className="w-20 rounded border px-2 py-1.5" value={line.quantity} onChange={(e) => patchLine(lines, onChange, i, { quantity: e.target.value })} />
              </td>
              <td className="px-2 py-1">
                <input className="w-20 rounded border px-2 py-1.5" value={line.unit} onChange={(e) => patchLine(lines, onChange, i, { unit: e.target.value })} />
              </td>
              <td className="px-2 py-1">
                <input className="w-28 rounded border px-2 py-1.5" value={line.estimatedUnitToman} onChange={(e) => patchLine(lines, onChange, i, { estimatedUnitToman: e.target.value })} />
              </td>
              <td className="px-1">
                {lines.length > 1 ? (
                  <button type="button" className="text-muted-foreground hover:text-destructive p-1" onClick={() => onChange(lines.filter((_, j) => j !== i))}>
                    <Trash2 className="size-3.5" />
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function patchLine(lines: LineRow[], onChange: (v: LineRow[]) => void, index: number, patch: Partial<LineRow>) {
  onChange(lines.map((l, i) => (i === index ? { ...l, ...patch } : l)));
}

function MotionApprove({
  r,
  thresholdToman,
  onApproved,
}: {
  r: PurchaseRequestApi;
  thresholdToman: number;
  onApproved: (pr: PurchaseRequestApi) => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex flex-col gap-1 items-start">
      <PrStatusBadge status={r.status} />
      {r.status === 'sent' && r.estimatedToman >= thresholdToman ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-6 text-[10px]"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const { request } = await approvePurchaseRequest(r.number);
              onApproved(request);
            } catch {
              /* */
            } finally {
              setBusy(false);
            }
          }}
        >
          تأیید CFO
        </Button>
      ) : null}
    </div>
  );
}

function SelectAllSubheader({ label }: { label: string }) {
  return (
    <div className="px-4 py-1 text-[11px] text-muted-foreground border-b">
      {label}
    </div>
  );
}
