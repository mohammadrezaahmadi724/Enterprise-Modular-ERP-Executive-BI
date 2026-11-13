'use client';

import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { FileSpreadsheet, FileText, Monitor, Search } from 'lucide-react';
import { FINANCE_REPORTS, REPORT_CATEGORIES, type FinanceReportDef } from '../../lib/finance-reports-demo';
import { FinanceReadyReports } from './FinanceReadyReports';

type CategoryFilter = FinanceReportDef['category'] | 'all';

const FORMAT_LABELS = {
  pdf: { Icon: FileText, label: 'PDF' },
  xlsx: { Icon: FileSpreadsheet, label: 'اکسل' },
  'on-screen': { Icon: Monitor, label: 'صفحه' },
} as const;

export function FinanceReportsScreen() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    return FINANCE_REPORTS.filter((r) => {
      if (category !== 'all' && r.category !== category) return false;
      if (query.trim()) {
        const q = query.trim();
        return r.title.includes(q) || r.subtitle.includes(q);
      }
      return true;
    });
  }, [category, query]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        گزارش‌ها — خروجی‌های مدیریتی از read model و projection خوانده می‌شوند؛ برای دوره‌های بسته، داده OLTP تجمیع
        نمی‌شود. واحد نمایش: تومان (ریال در دیتابیس).
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,280px)_1fr]">
        <Card className="finance-aging-card h-fit">
          <CardContent className="pt-6">
            <FinanceReadyReports />
          </CardContent>
        </Card>

        <Card className="finance-aging-card">
          <CardHeader className="space-y-3">
            <CardTitle className="text-base">کاتالوگ گزارش</CardTitle>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="جستجو در عنوان…"
                  className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1" role="tablist">
              <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
                همه
              </FilterChip>
              {(Object.keys(REPORT_CATEGORIES) as FinanceReportDef['category'][]).map((c) => (
                <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {REPORT_CATEGORIES[c]}
                </FilterChip>
              ))}
            </div>
          </CardHeader>
          <CardContent className="divide-y">
            {rows.map((r) => (
              <ReportRow key={r.id} report={r} />
            ))}
            {rows.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">گزارشی با این فیلتر یافت نشد.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">پارامترهای پیش‌فرض اجرا</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <ParamBlock label="سال مالی" value="۱۴۰۵" />
          <ParamBlock label="دوره" value="آبان ۱۴۰۵" />
          <ParamBlock label="دفتر" value="قانونی (STATUTORY)" />
          <ParamBlock label="سطح تفصیل" value="گروه حساب" />
        </CardContent>
      </Card>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-md border px-2.5 py-1 text-xs transition-colors',
        active ? 'bg-background border-primary font-semibold shadow-sm' : 'border-transparent text-muted-foreground hover:bg-muted/50',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ReportRow({ report }: { report: FinanceReportDef }) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-3 first:pt-0">
      <div className="flex-1 min-w-[180px]">
        <p className="font-medium text-sm">{report.title}</p>
        <p className="text-xs text-muted-foreground">{report.subtitle}</p>
        <Badge variant="outline" className="mt-1 text-[10px]">
          {REPORT_CATEGORIES[report.category]}
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground shrink-0">
        آخرین اجرا: {report.lastRun ?? '—'}
      </div>
      <div className="flex flex-wrap gap-1">
        {report.formats.map((f) => {
          const { Icon, label } = FORMAT_LABELS[f];
          return (
            <Button key={f} variant="ghost" size="sm" className="h-8 gap-1 text-xs">
              <Icon className="size-3.5" />
              {label}
            </Button>
          );
        })}
      </div>
      <Button size="sm">اجرا</Button>
    </div>
  );
}

function ParamBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border px-3 py-2">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
