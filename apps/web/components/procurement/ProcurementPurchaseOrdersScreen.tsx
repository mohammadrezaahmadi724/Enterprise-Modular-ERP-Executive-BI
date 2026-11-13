'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@repo/ui';
import { Button, Card, CardContent } from '@repo/ui';
import { Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { cn } from '@repo/ui';
import { PO_STATUS_LABEL, type PoStatus } from '../../lib/procurement-demo';
import {
  approvePurchaseOrder,
  createPurchaseOrder,
  fetchApprovedPurchaseRequests,
  fetchProcurementThresholds,
  fetchPurchaseOrders,
  fetchSuppliers,
  type PurchaseOrderApi,
  type PurchaseRequestApi,
  type SupplierApi,
} from '../../lib/procurement-api';
import { formatToman } from '../../lib/finance-receivables-demo';
import {
  PoStatusBadge,
  ProcurementGridToolbar,
  ProcurementListCardHeader,
  StatusFilterTabs,
  rowPadding,
  type RowDensity,
} from './procurement-screen-bits';
import { PROCUREMENT_LIST_META } from './ProcurementHubOverviewClient';
import { DEFAULT_PO_APPROVAL_TOMAN } from '../../lib/procurement-thresholds';

type PoLine = { sku: string; quantity: string; unit: string; unitPriceToman: string };

const PO_STATUS_OPTIONS: Array<{ id: PoStatus | 'all'; label: string }> = [
  { id: 'all', label: 'همه' },
  ...((Object.keys(PO_STATUS_LABEL) as PoStatus[]).map((id) => ({ id, label: PO_STATUS_LABEL[id] }))),
];

export function ProcurementPurchaseOrdersScreen() {
  const searchParams = useSearchParams();
  const supplierFromUrl = searchParams.get('supplier') ?? '';
  const projectFromUrl = searchParams.get('project')?.trim() ?? '';
  const prFromUrl = searchParams.get('pr')?.trim() ?? '';
  const openFormFromUrl = searchParams.get('openForm') === '1';

  const [showForm, setShowForm] = useState(true);
  const [supplierFilter, setSupplierFilter] = useState(supplierFromUrl);
  const [orders, setOrders] = useState<PurchaseOrderApi[]>([]);
  const [approvedPrs, setApprovedPrs] = useState<PurchaseRequestApi[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierApi[]>([]);
  const [statusFilter, setStatusFilter] = useState<PoStatus | 'all'>('all');
  const [density, setDensity] = useState<RowDensity>('normal');
  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [prNumber, setPrNumber] = useState('');
  const [project, setProject] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [orderDate, setOrderDate] = useState('۱۴۰۵/۰۸/۱۲');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [note, setNote] = useState('');
  const [lines, setLines] = useState<PoLine[]>([{ sku: 'PRD-1016', quantity: '1', unit: 'عدد', unitPriceToman: '0' }]);
  const [poThresholdToman, setPoThresholdToman] = useState(DEFAULT_PO_APPROVAL_TOMAN);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { thresholds } = await fetchProcurementThresholds();
        if (!cancelled) setPoThresholdToman(thresholds.poApprovalToman);
      } catch {
        /* default */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (supplierFromUrl) {
      setSupplierFilter(supplierFromUrl);
      setShowForm(false);
    }
  }, [supplierFromUrl]);

  useEffect(() => {
    if (prFromUrl) setPrNumber(prFromUrl);
    if (projectFromUrl) setProject(projectFromUrl);
    if (openFormFromUrl) setShowForm(true);
  }, [prFromUrl, projectFromUrl, openFormFromUrl]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [o, pr, sup] = await Promise.all([fetchPurchaseOrders(), fetchApprovedPurchaseRequests(), fetchSuppliers()]);
        if (cancelled) return;
        if (o.orders.length) setOrders(o.orders);
        setApprovedPrs(pr.requests);
        setSuppliers(sup.suppliers);
        if (pr.requests[0]) setPrNumber(pr.requests[0].number);
        if (sup.suppliers[0]) {
          setSupplierCode(sup.suppliers[0].code);
          setSupplierName(sup.suppliers[0].name);
        }
      } catch {
        /* empty */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const lineTotal = useMemo(() => {
    return lines.reduce((s, l) => s + (Number(l.quantity) || 0) * (Number(l.unitPriceToman) || 0), 0);
  }, [lines]);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (prFromUrl && o.number !== prFromUrl && o.purchaseRequestNumber !== prFromUrl) return false;
      if (projectFromUrl && (o.project ?? '').trim() !== projectFromUrl && o.purchaseRequestNumber !== prFromUrl) {
        const viaPr = approvedPrs.find((p) => p.number === o.purchaseRequestNumber);
        if ((viaPr?.project ?? '').trim() !== projectFromUrl) return false;
      }
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (supplierFilter.trim()) {
        const sc = supplierFilter.trim();
        if (o.supplierCode !== sc && !o.supplierName.includes(sc)) return false;
      }
      if (!search.trim()) return true;
      const q = search.trim();
      return o.number.includes(q) || o.supplierName.includes(q) || o.supplierCode.includes(q);
    });
  }, [orders, statusFilter, search, supplierFilter, projectFromUrl, prFromUrl, approvedPrs]);

  const supplierFilterLabel = useMemo(() => {
    if (!supplierFilter.trim()) return null;
    const match = orders.find((o) => o.supplierCode === supplierFilter.trim());
    return match?.supplierName ?? supplierFilter.trim();
  }, [orders, supplierFilter]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prNumber.trim()) {
      setMessage('درخواست خرید مرتبط الزامی است');
      return;
    }
    if (!supplierCode.trim() || !supplierName.trim()) {
      setMessage('تأمین‌کننده الزامی است');
      return;
    }
    setSubmitting(true);
    setMessage(null);
    try {
      const { order: created } = await createPurchaseOrder({
        purchaseRequestNumber: prNumber.trim(),
        project: project.trim() || undefined,
        supplierCode: supplierCode.trim(),
        supplierName: supplierName.trim(),
        orderDate: orderDate.trim(),
        deliveryDate: deliveryDate.trim() || undefined,
        note: note.trim() || undefined,
        lines: lines.map((l) => ({
          sku: l.sku.trim() || 'ITEM',
          quantity: Number(l.quantity) || 1,
          unit: l.unit.trim() || 'عدد',
          unitPriceToman: Number(l.unitPriceToman) || 0,
        })),
      });
      setOrders((prev) => [created, ...prev]);
      if (created.approvalRequired) {
        setMessage(`سفارش ${created.number} ثبت شد — بالای آستانه؛ منتظر تأیید CFO`);
      } else {
        setMessage(`سفارش ${created.number} ثبت شد`);
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'خطا در ثبت سفارش');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">مدیریت و ثبت مستقیم سفارش‌های خرید از تأمین‌کنندگان</p>
      <p className="text-xs text-muted-foreground">
        آستانه تأیید CFO برای سفارش خرید:{' '}
        <span className="font-semibold tabular-nums">{formatToman(poThresholdToman)} تومان</span>
      </p>

      {supplierFilter.trim() ? (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-xs">
          <span className="text-muted-foreground">فیلتر تأمین‌کننده:</span>
          <Badge variant="secondary" className="font-mono">
            {supplierFilterLabel}
          </Badge>
          <Link href="/procurement/purchase-orders" className="text-primary mr-auto">
            حذف فیلتر
          </Link>
        </div>
      ) : null}

      {projectFromUrl ? (
        <p className="text-xs flex flex-wrap items-center gap-2 rounded-md border border-sky-200 bg-sky-50/60 px-3 py-2">
          <Badge variant="secondary" className="font-mono">
            پروژه {projectFromUrl}
          </Badge>
          {prFromUrl ? <span className="font-mono text-muted-foreground">PR {prFromUrl}</span> : null}
          <Link href={`/projects/projects/${encodeURIComponent(projectFromUrl)}`} className="text-primary mr-auto">
            بازگشت به پروژه
          </Link>
          <Link href="/procurement/purchase-orders" className="text-primary">
            حذف فیلتر
          </Link>
        </p>
      ) : null}

      {showForm ? (
        <Card className="border-violet-200/60 bg-violet-50/30 dark:bg-violet-950/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">سفارش خرید جدید</h2>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
                بستن فرم
              </Button>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="text-sm block">
                  <span className="text-xs text-muted-foreground">درخواست خرید مرتبط*</span>
                  <select
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={prNumber}
                    onChange={(e) => setPrNumber(e.target.value)}
                    required
                  >
                    <option value="">انتخاب درخواست خرید تأیید‌شده</option>
                    {approvedPrs.map((p) => (
                      <option key={p.number} value={p.number}>
                        {p.number} — {p.title.slice(0, 40)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm block">
                  <span className="text-xs text-muted-foreground">پروژه مرتبط</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={project} onChange={(e) => setProject(e.target.value)} placeholder="PRJ-0024 — اختیاری" />
                </label>
                <label className="text-sm block sm:col-span-2">
                  <span className="text-xs text-muted-foreground">تأمین‌کننده*</span>
                  <select
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                    value={supplierCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      setSupplierCode(code);
                      const s = suppliers.find((x) => x.code === code);
                      if (s) setSupplierName(s.name);
                    }}
                    required
                  >
                    <option value="">جستجوی تأمین‌کننده (کد یا نام)</option>
                    {suppliers.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm block">
                  <span className="text-xs text-muted-foreground">تاریخ سفارش*</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
                </label>
                <label className="text-sm block">
                  <span className="text-xs text-muted-foreground">موعد تحویل</span>
                  <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} placeholder="انتخاب تاریخ" />
                </label>
              </div>

              <PoLinesTable lines={lines} onChange={setLines} />

              <MotionTotals total={lineTotal} />

              <label className="block text-sm">
                <span className="text-muted-foreground">یادداشت</span>
                <textarea className="mt-1 w-full rounded-md border p-2 text-sm min-h-[72px]" value={note} onChange={(e) => setNote(e.target.value)} />
              </label>
              {message ? <p className="text-xs">{message}</p> : null}
              <Button type="submit" disabled={submitting} className="bg-rose-800 hover:bg-rose-900">
                ثبت سفارش
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button type="button" onClick={() => setShowForm(true)} className="bg-rose-800 hover:bg-rose-900">
          سفارش خرید جدید
        </Button>
      )}

      <Card className="overflow-hidden">
        <ProcurementListCardHeader
          icon={<ShoppingCart className="size-5" />}
          title="سفارش‌های خرید"
          subtitle={`${PROCUREMENT_LIST_META.toLocaleString('fa-IR')} سفارش در دسترس شما`}
        />
        <ProcurementGridToolbar search={search} onSearch={setSearch} placeholder="شماره یا تأمین‌کننده" density={density} onDensity={setDensity}>
          <StatusFilterTabs value={statusFilter} onChange={setStatusFilter} options={PO_STATUS_OPTIONS} />
        </ProcurementGridToolbar>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/40 text-muted-foreground">
                <th className="py-2 px-3 text-right">شماره</th>
                <th className="py-2 px-3 text-right">تأمین‌کننده</th>
                <th className="py-2 px-3 text-right">درخواست مرتبط</th>
                <th className="py-2 px-3 text-right">تاریخ</th>
                <th className="py-2 px-3 text-right">مبلغ (تومان)</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.number} className="border-b border-dashed hover:bg-muted/20">
                  <td className={cn('px-3 font-mono text-violet-800', rowPadding(density))}>{o.number}</td>
                  <td className={cn('px-3', rowPadding(density))}>{o.supplierName}</td>
                  <td className={cn('px-3 font-mono', rowPadding(density))}>{o.purchaseRequestNumber ?? '—'}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{o.orderDate}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{formatToman(o.totalToman)}</td>
                  <td className={cn('px-3', rowPadding(density))}>
                    <PoApproveCell order={o} thresholdToman={poThresholdToman} onApproved={(order) => setOrders((prev) => prev.map((x) => (x.number === order.number ? order : x)))} />
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

function PoLinesTable({ lines, onChange }: { lines: PoLine[]; onChange: (v: PoLine[]) => void }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <p className="text-sm font-medium">اقلام سفارش</p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onChange([...lines, { sku: '', quantity: '1', unit: 'عدد', unitPriceToman: '0' }])}
        >
          <Plus className="size-4 ml-1" />
          افزودن قلم
        </Button>
      </div>
      <table className="w-full text-xs border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted/40 border-b">
            <th className="py-2 px-2 w-8">#</th>
            <th className="py-2 px-2 text-right">کالا / خدمت *</th>
            <th className="py-2 px-2 text-right">مقدار *</th>
            <th className="py-2 px-2 text-right">واحد *</th>
            <th className="py-2 px-2 text-right">قیمت واحد (تومان)</th>
            <th className="py-2 px-2 text-right">جمع خط (تومان)</th>
            <th className="w-8" />
          </tr>
        </thead>
        <tbody>
          {lines.map((line, i) => {
            const lt = (Number(line.quantity) || 0) * (Number(line.unitPriceToman) || 0);
            return (
              <tr key={i} className="border-b">
                <td className="px-2 text-center">{i + 1}</td>
                <td className="px-2 py-1">
                  <input className="w-full border rounded px-2 py-1.5" value={line.sku} onChange={(e) => patch(lines, onChange, i, { sku: e.target.value })} />
                </td>
                <td className="px-2 py-1">
                  <input className="w-20 border rounded px-2 py-1.5" value={line.quantity} onChange={(e) => patch(lines, onChange, i, { quantity: e.target.value })} />
                </td>
                <td className="px-2 py-1">
                  <input className="w-20 border rounded px-2 py-1.5" value={line.unit} onChange={(e) => patch(lines, onChange, i, { unit: e.target.value })} />
                </td>
                <td className="px-2 py-1">
                  <input className="w-24 border rounded px-2 py-1.5" value={line.unitPriceToman} onChange={(e) => patch(lines, onChange, i, { unitPriceToman: e.target.value })} />
                </td>
                <td className="px-2 py-1 tabular-nums">{formatToman(lt)}</td>
                <td className="px-1">
                  {lines.length > 1 ? (
                    <button type="button" onClick={() => onChange(lines.filter((_, j) => j !== i))} className="p-1 text-muted-foreground">
                      <Trash2 className="size-3.5" />
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function patch(lines: PoLine[], onChange: (v: PoLine[]) => void, i: number, p: Partial<PoLine>) {
  onChange(lines.map((l, j) => (j === i ? { ...l, ...p } : l)));
}

function PoApproveCell({
  order,
  thresholdToman,
  onApproved,
}: {
  order: PurchaseOrderApi;
  thresholdToman: number;
  onApproved: (o: PurchaseOrderApi) => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex flex-col gap-1 items-start">
      <PoStatusBadge status={order.status} />
      {order.status === 'sent' && order.totalToman >= thresholdToman ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-6 text-[10px]"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              const { order: approved } = await approvePurchaseOrder(order.number);
              onApproved(approved);
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

function MotionTotals({ total }: { total: number }) {
  return (
    <div className="rounded-lg bg-violet-900 text-violet-50 px-4 py-2 flex justify-between text-sm">
      <span>مبلغ کل</span>
      <span className="font-bold tabular-nums">{formatToman(total)} تومان</span>
    </div>
  );
}
