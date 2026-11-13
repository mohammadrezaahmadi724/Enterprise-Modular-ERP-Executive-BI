'use client';

import { Badge, cn } from '@repo/ui';
import {
  PO_STATUS_LABEL,
  PR_STATUS_LABEL,
  type PoStatus,
  type PrStatus,
} from '../../lib/procurement-demo';

export { SalesGridToolbar as ProcurementGridToolbar, SalesListCardHeader as ProcurementListCardHeader, rowPadding, type RowDensity } from '../sales/sales-screen-bits';

const PR_STATUS_CLASS: Record<PrStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  sent: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200',
  approved: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
  rejected: 'bg-red-100 text-red-900',
  canceled: 'bg-slate-100 text-slate-600',
};

const PO_STATUS_CLASS: Record<PoStatus, string> = {
  draft: 'bg-muted text-muted-foreground',
  sent: 'bg-orange-100 text-orange-900',
  approved: 'bg-emerald-100 text-emerald-900',
  partial_receipt: 'bg-amber-100 text-amber-900',
  full_receipt: 'bg-emerald-100 text-emerald-800',
  canceled: 'bg-slate-100 text-slate-600',
};

export function PrStatusBadge({ status }: { status: string }) {
  const s = (status in PR_STATUS_LABEL ? status : 'draft') as PrStatus;
  return (
    <Badge variant="secondary" className={cn('font-normal', PR_STATUS_CLASS[s])}>
      {PR_STATUS_LABEL[s]}
    </Badge>
  );
}

export function PoStatusBadge({ status }: { status: string }) {
  const s = (status in PO_STATUS_LABEL ? status : 'draft') as PoStatus;
  return (
    <Badge variant="secondary" className={cn('font-normal', PO_STATUS_CLASS[s])}>
      {PO_STATUS_LABEL[s]}
    </Badge>
  );
}

export function StatusFilterTabs<T extends string>({
  value,
  onChange,
  options,
  label = 'وضعیت',
}: {
  value: T | 'all';
  onChange: (v: T | 'all') => void;
  options: Array<{ id: T | 'all'; label: string }>;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted-foreground shrink-0">{label}</span>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={cn(
            'rounded-full border px-3 py-1',
            value === o.id ? 'bg-violet-900 text-white border-violet-900' : 'text-muted-foreground border-transparent hover:border-border',
          )}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
