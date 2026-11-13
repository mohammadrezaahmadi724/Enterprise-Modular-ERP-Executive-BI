'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Calendar, Clock, Columns3, ListChecks, Plus, Search } from 'lucide-react';
import {
  ACTIVITY_TOTAL_HINT,
  ACTIVITY_TYPE_FA,
  SALES_ACTIVITIES,
  filterActivities,
  type ActivityTimeTab,
  type ActivityType,
  type ActivityTypeFilter,
  type SalesActivity,
} from '../../lib/sales-activities-demo';

type RowDensity = 'compact' | 'normal' | 'comfortable';

const TIME_TABS: Array<{ id: ActivityTimeTab; label: string }> = [
  { id: 'today', label: 'امروز' },
  { id: 'overdue', label: 'عقب‌افتاده' },
  { id: 'week', label: 'این هفته' },
  { id: 'done', label: 'انجام‌شده' },
];

const TYPE_FILTERS: Array<{ id: ActivityTypeFilter; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'task', label: 'کار' },
  { id: 'meeting', label: 'جلسه' },
  { id: 'call', label: 'تماس' },
];

const DENSITY: Array<{ id: RowDensity; label: string }> = [
  { id: 'compact', label: 'فشرده' },
  { id: 'normal', label: 'عادی' },
  { id: 'comfortable', label: 'راحت' },
];

export function SalesActivitiesScreen() {
  const [rows, setRows] = useState(SALES_ACTIVITIES);
  const [timeTab, setTimeTab] = useState<ActivityTimeTab>('today');
  const [typeFilter, setTypeFilter] = useState<ActivityTypeFilter>('all');
  const [search, setSearch] = useState('');
  const [density, setDensity] = useState<RowDensity>('compact');

  const [draftTitle, setDraftTitle] = useState('');
  const [draftType, setDraftType] = useState<ActivityType>('call');
  const [draftDate, setDraftDate] = useState('');
  const [draftTime, setDraftTime] = useState('');

  const filtered = useMemo(
    () =>
      filterActivities(rows, {
        timeTab,
        typeFilter,
        search,
        includeCancelled: false,
      }),
    [rows, timeTab, typeFilter, search],
  );

  const markDone = (id: string) => {
    setRows((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'done', dueBucket: 'done' } : a)),
    );
  };

  const cancelActivity = (id: string) => {
    setRows((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)));
  };

  const addActivity = () => {
    if (!draftTitle.trim()) return;
    const dueAt =
      draftDate || draftTime
        ? `${draftDate || '۱۴۰۵/۰۸/۲۶'} ${draftTime || '۱۲:۰۰'}`
        : '۱۴۰۵/۰۸/۲۶ ۱۲:۰۰';
    setRows((prev) => [
      {
        id: `ACT-${Date.now().toString().slice(-6)}`,
        type: draftType,
        subject: draftTitle.trim(),
        relatedLabel: 'بدون ارتباط',
        dueAt,
        dueBucket: 'today',
        status: 'scheduled',
      },
      ...prev,
    ]);
    setDraftTitle('');
    setDraftDate('');
    setDraftTime('');
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="bg-muted/30 border-dashed">
        <div className="p-4 flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end">
            <label className="flex flex-col gap-1 text-xs">
              <span>
                عنوان <span className="text-destructive">*</span>
              </span>
              <input
                className="rounded-md border bg-background px-3 py-2 text-sm"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="عنوان فعالیت"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs">
              <span>نوع</span>
              <select
                className="rounded-md border bg-background px-3 py-2 text-sm"
                value={draftType}
                onChange={(e) => setDraftType(e.target.value as ActivityType)}
              >
                <option value="call">تماس</option>
                <option value="task">کار</option>
                <option value="meeting">جلسه</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs lg:col-span-2">
              <span>موعد</span>
              <div className="flex flex-wrap gap-2">
                <span className="relative flex-1 min-w-[140px]">
                  <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
                    placeholder="انتخاب تاریخ"
                    value={draftDate}
                    onChange={(e) => setDraftDate(e.target.value)}
                  />
                </span>
                <span className="relative flex-1 min-w-[120px]">
                  <Clock className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
                    placeholder="انتخاب ساعت"
                    value={draftTime}
                    onChange={(e) => setDraftTime(e.target.value)}
                  />
                </span>
              </div>
            </label>
          </div>
          <div className="flex justify-end">
            <Button type="button" className="bg-rose-700 hover:bg-rose-800" onClick={addActivity}>
              <Plus className="size-4 ml-1" />
              فعالیت جدید
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-1 rounded-lg border bg-muted/20 p-1 w-fit" role="tablist" aria-label="بازه زمانی">
        {TIME_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={timeTab === t.id}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm transition-colors',
              timeTab === t.id ? 'bg-background font-semibold shadow-sm border' : 'text-muted-foreground hover:bg-muted/50',
            )}
            onClick={() => setTimeTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card className="finance-aging-card overflow-hidden p-0">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b">
          <div className="flex items-center gap-2 min-w-0">
            <span className="grid size-9 place-items-center rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-300 shrink-0">
              <ListChecks className="size-4" />
            </span>
            <div>
              <p className="font-semibold text-sm">فعالیت‌ها</p>
              <p className="text-xs text-muted-foreground">
                {new Intl.NumberFormat('fa-IR').format(ACTIVITY_TOTAL_HINT)} فعالیت در دسترس شما
              </p>
            </div>
          </div>
          <Button type="button" size="sm" variant="outline">
            <Columns3 className="size-4 ml-1" />
            ستون‌ها
          </Button>
        </div>

        <ActivityToolbar
          search={search}
          onSearch={setSearch}
          typeFilter={typeFilter}
          onTypeFilter={setTypeFilter}
          density={density}
          onDensity={setDensity}
        />

        <div className="sk-table-scroll overflow-x-auto max-h-[520px]">
          <table
            className={cn('w-full text-sm', density === 'compact' && 'text-xs', density === 'comfortable' && 'text-[15px]')}
            aria-label="فعالیت‌ها"
          >
            <thead className="sticky top-0 bg-muted/90 backdrop-blur-sm z-[1]">
              <tr className="border-b text-muted-foreground text-xs">
                <th className="py-2 px-3 text-right">نوع</th>
                <th className="py-2 px-3 text-right min-w-[140px]">مرتبط با</th>
                <th className="py-2 px-3 text-right min-w-[220px]">موضوع</th>
                <th className="py-2 px-3 text-right min-w-[130px]">موعد</th>
                <th className="py-2 px-3 text-right">وضعیت</th>
                <th className="py-2 px-3 text-right min-w-[160px]">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <ActivityRow
                  key={row.id}
                  row={row}
                  density={density}
                  onDone={() => markDone(row.id)}
                  onCancel={() => cancelActivity(row.id)}
                />
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">فعالیتی با این فیلتر نیست.</p>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

function ActivityToolbar({
  search,
  onSearch,
  typeFilter,
  onTypeFilter,
  density,
  onDensity,
}: {
  search: string;
  onSearch: (v: string) => void;
  typeFilter: ActivityTypeFilter;
  onTypeFilter: (v: ActivityTypeFilter) => void;
  density: RowDensity;
  onDensity: (v: RowDensity) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
          placeholder="جست‌وجو در فعالیت‌ها"
          aria-label="جست‌وجو در فعالیت‌ها"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-1">
        {TYPE_FILTERS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={cn(
              'rounded-md border px-2.5 py-1 text-xs',
              typeFilter === t.id ? 'bg-muted font-semibold border-primary/40' : 'border-transparent text-muted-foreground',
            )}
            onClick={() => onTypeFilter(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mr-auto flex items-center gap-1 text-xs">
        <span className="text-muted-foreground hidden sm:inline">تراکم</span>
        {DENSITY.map((d) => (
          <button
            key={d.id}
            type="button"
            className={cn(
              'rounded-md border px-2 py-1 text-xs',
              density === d.id ? 'bg-muted font-semibold' : 'text-muted-foreground border-transparent',
            )}
            onClick={() => onDensity(d.id)}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ActivityRow({
  row,
  density,
  onDone,
  onCancel,
}: {
  row: SalesActivity;
  density: RowDensity;
  onDone: () => void;
  onCancel: () => void;
}) {
  const py = density === 'compact' ? 'py-1.5' : density === 'comfortable' ? 'py-3' : 'py-2';

  return (
    <tr className="border-b border-dashed hover:bg-muted/40">
      <td className={cn('px-3', py)}>
        <TypeBadge type={row.type} />
      </td>
      <td className={cn('px-3 text-xs', py)}>
        {row.relatedHref ? (
          <Link href={row.relatedHref} className="text-primary hover:underline">
            {row.relatedLabel}
          </Link>
        ) : (
          row.relatedLabel
        )}
      </td>
      <td className={cn('px-3', py)}>{row.subject}</td>
      <td className={cn('px-3 tabular-nums text-muted-foreground text-xs', py)}>{row.dueAt}</td>
      <td className={cn('px-3', py)}>
        <StatusBadge status={row.status} />
      </td>
      <td className={cn('px-3', py)}>
        {row.status !== 'done' && row.status !== 'cancelled' ? (
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" className="h-8 bg-rose-700 hover:bg-rose-800" onClick={onDone}>
              انجام‌شده
            </Button>
            <Button type="button" size="sm" variant="ghost" className="h-8 text-destructive" onClick={onCancel}>
              لغو
            </Button>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </td>
    </tr>
  );
}

function TypeBadge({ type }: { type: ActivityType }) {
  const dot = type === 'call' ? 'bg-sky-500' : type === 'meeting' ? 'bg-violet-500' : 'bg-amber-500';
  return (
    <Badge variant="outline" className="gap-1.5 font-normal">
      <span className={cn('size-1.5 rounded-full', dot)} aria-hidden />
      {ACTIVITY_TYPE_FA[type]}
    </Badge>
  );
}

function StatusBadge({ status }: { status: SalesActivity['status'] }) {
  if (status === 'overdue') {
    return (
      <Badge className="bg-red-600 hover:bg-red-600 gap-1">
        <span className="size-1.5 rounded-full bg-white/90" aria-hidden />
        عقب‌افتاده
      </Badge>
    );
  }
  if (status === 'done') return <Badge variant="secondary">انجام‌شده</Badge>;
  if (status === 'cancelled') return <Badge variant="outline">لغو‌شده</Badge>;
  return <Badge variant="outline">برنامه‌ریزی‌شده</Badge>;
}
