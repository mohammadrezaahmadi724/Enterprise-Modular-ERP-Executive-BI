'use client';

import { Button } from '@repo/ui';
import { cn } from '@repo/ui';
import { Columns3, Search } from 'lucide-react';

export type RowDensity = 'compact' | 'normal' | 'comfortable';

const DENSITY: Array<{ id: RowDensity; label: string }> = [
  { id: 'compact', label: 'فشرده' },
  { id: 'normal', label: 'عادی' },
  { id: 'comfortable', label: 'راحت' },
];

export function SalesListCardHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b">
      <div className="flex items-center gap-2 min-w-0">
        <span className="grid size-9 place-items-center rounded-lg bg-violet-500/10 text-violet-700 dark:text-violet-300 shrink-0">
          {icon}
        </span>
        <div>
          <p className="font-semibold text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Button type="button" size="sm" variant="outline">
        <Columns3 className="size-4 ml-1" />
        ستون‌ها
      </Button>
    </div>
  );
}

export function SalesGridToolbar({
  search,
  onSearch,
  placeholder,
  density,
  onDensity,
  children,
}: {
  search: string;
  onSearch: (v: string) => void;
  placeholder: string;
  density: RowDensity;
  onDensity: (v: RowDensity) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b">
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {children}
      <div className="mr-auto flex items-center gap-1 text-xs">
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

export function rowPadding(density: RowDensity): string {
  if (density === 'compact') return 'py-1.5';
  if (density === 'comfortable') return 'py-3';
  return 'py-2';
}
