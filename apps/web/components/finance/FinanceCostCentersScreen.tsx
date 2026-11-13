'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { FolderKanban, Layers, Plus } from 'lucide-react';
import {
  ANALYTIC_LEVELS,
  COST_CENTERS,
  allFinanceProjects,
  formatToman,
} from '../../lib/finance-cost-centers-demo';

const TABS = [
  { id: 'cc', label: 'مراکز هزینه' },
  { id: 'projects', label: 'پروژه‌ها' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function FinanceCostCentersScreen() {
  const searchParams = useSearchParams();
  const opsProject = searchParams.get('opsProject')?.trim() ?? '';
  const tabFromUrl = searchParams.get('tab');
  const [tab, setTab] = useState<TabId>(tabFromUrl === 'projects' || opsProject ? 'projects' : 'cc');

  useEffect(() => {
    if (tabFromUrl === 'projects' || opsProject) setTab('projects');
  }, [tabFromUrl, opsProject]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        مراکز هزینه و پروژه‌ها — تفکیک هزینه و درآمد در دفتر مدیریتی؛ هر سند حسابداری می‌تواند به چند سطح تفصیلی
        (مرکز هزینه، پروژه، شعبه، قرارداد) ارجاع دهد.
      </p>
      {opsProject ? (
        <p className="text-xs rounded-md border border-sky-200 bg-sky-50/60 px-3 py-2">
          فیلتر از ماژول پروژه: <span className="font-mono font-semibold">{opsProject}</span>
          {' — '}
          <Link href={`/projects/projects/${encodeURIComponent(opsProject)}`} className="text-primary">
            بازگشت به زمینه پروژه
          </Link>
        </p>
      ) : null}

      <Card className="finance-aging-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Layers className="size-4" />
            سطوح تفصیلی فعال
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {ANALYTIC_LEVELS.map((l) => (
            <Badge key={l} variant="outline" className="px-3 py-1">
              {l}
            </Badge>
          ))}
          <Button size="sm" variant="outline" className="mr-auto">
            <Plus className="size-3.5 ml-1" />
            پروژه
          </Button>
          <Button size="sm" variant="outline">
            + شعبه
          </Button>
          <Button size="sm" variant="outline">
            + قرارداد
          </Button>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 border-b w-full sm:w-auto" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={cn(
                'shrink-0 border-b-2 px-3 py-2 text-sm transition-colors -mb-px',
                tab === t.id
                  ? 'border-primary font-semibold text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Button size="sm">
          <Plus className="size-4 ml-1" />
          {tab === 'cc' ? 'مرکز هزینه جدید' : 'پروژه جدید'}
        </Button>
      </div>

      {tab === 'cc' ? <CostCentersTable /> : <ProjectsTable highlightCode={opsProject || undefined} />}
    </div>
  );
}

function CostCentersTable() {
  return (
    <Card className="finance-aging-card">
      <CardHeader>
        <CardTitle className="text-base">فهرست مراکز هزینه</CardTitle>
        <p className="text-xs text-muted-foreground">بودجه و مصرف سال جاری — مقایسه با دفتر مدیریتی</p>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground text-xs">
              <th className="py-2 text-right">کد</th>
              <th className="py-2 text-right">عنوان</th>
              <th className="py-2 text-right">مسئول</th>
              <th className="py-2 text-right">بودجه YTD</th>
              <th className="py-2 text-right">مصرف YTD</th>
              <th className="py-2 text-right">انحراف</th>
              <th className="py-2 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {COST_CENTERS.map((c) => {
              const delta = c.actualYtdToman - c.budgetYtdToman;
              const over = delta > 0;
              return (
                <tr key={c.id} className="border-b border-dashed hover:bg-muted/30">
                  <td className="py-2.5 font-mono text-xs">{c.code}</td>
                  <td className="py-2.5">{c.name}</td>
                  <td className="py-2.5">{c.manager}</td>
                  <td className="py-2.5">{formatToman(c.budgetYtdToman)}</td>
                  <td className="py-2.5 font-medium">{formatToman(c.actualYtdToman)}</td>
                  <td className={cn('py-2.5', over ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400')}>
                    {over ? '+' : ''}
                    {formatToman(Math.abs(delta))}
                    {over ? ' بیش‌مصرف' : ' مازاد'}
                  </td>
                  <td className="py-2.5">
                    <Badge variant={c.active ? 'default' : 'secondary'}>{c.active ? 'فعال' : 'غیرفعال'}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function ProjectsTable({ highlightCode }: { highlightCode?: string }) {
  const rows = allFinanceProjects();
  return (
    <Card className="finance-aging-card">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <FolderKanban className="size-4" />
          پروژه‌ها و قراردادهای سرمایه‌ای
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground text-xs">
              <th className="py-2 text-right">کد پروژه</th>
              <th className="py-2 text-right">عنوان</th>
              <th className="py-2 text-right">مرکز هزینه</th>
              <th className="py-2 text-right">پیشرفت</th>
              <th className="py-2 text-right">بودجه</th>
              <th className="py-2 text-right">هزینه‌شده</th>
              <th className="py-2 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.id}
                className={cn('border-b border-dashed', highlightCode === p.code && 'bg-sky-50/80 ring-1 ring-sky-200')}
              >
                <td className="py-2 font-mono text-xs">{p.code}</td>
                <td className="py-2">{p.name}</td>
                <td className="py-2 text-muted-foreground">{p.costCenterCode}</td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 max-w-[80px] rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${p.progressPct}%` }} />
                    </div>
                    <span className="text-xs">{p.progressPct}٪</span>
                  </div>
                </td>
                <td className="py-2">{formatToman(p.budgetToman)}</td>
                <td className="py-2 font-medium">{formatToman(p.spentToman)}</td>
                <td className="py-2">
                  <Badge variant={p.status === 'باز' ? 'default' : 'secondary'}>{p.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
