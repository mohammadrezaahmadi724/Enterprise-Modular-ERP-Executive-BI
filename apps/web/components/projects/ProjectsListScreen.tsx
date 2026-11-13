'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { DEMO_PROJECTS } from '../../lib/projects-demo';
import { createProject, fetchProjects, type ProjectApi } from '../../lib/projects-api';
import { SalesGridToolbar, rowPadding, type RowDensity } from '../sales/sales-screen-bits';

export function ProjectsListScreen() {
  const [rows, setRows] = useState<ProjectApi[]>(DEMO_PROJECTS);
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [density, setDensity] = useState<RowDensity>('normal');

  useEffect(() => {
    (async () => {
      try {
        const { projects } = await fetchProjects();
        if (projects.length) setRows(projects);
      } catch {
        /* demo */
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      const q = search.trim();
      if (!q) return true;
      return r.name.includes(q) || r.code.includes(q);
    });
  }, [rows, search, statusFilter]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const { project } = await createProject({ name: name.trim(), deadline: deadline.trim() || undefined });
      setRows((prev) => [project, ...prev]);
      setName('');
      setDeadline('');
    } catch {
      /* */
    }
  }

  return (
    <div className="space-y-4">
      <Card className="border-sky-100 bg-sky-50/30 p-4">
        <h2 className="font-semibold text-sm mb-3">پروژه جدید</h2>
        <form onSubmit={onCreate} className="grid gap-3 sm:grid-cols-3 items-end">
          <label className="text-sm sm:col-span-2">
            <span className="text-xs text-muted-foreground">نام*</span>
            <input className="mt-1 w-full rounded-md border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="text-sm">
            <span className="text-xs text-muted-foreground">سررسید</span>
            <input className="mt-1 w-full rounded-md border px-3 py-2" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="انتخاب تاریخ" />
          </label>
          <Button type="submit" className="bg-rose-800 sm:col-span-3 sm:w-auto sm:mr-auto">
            ثبت پروژه
          </Button>
        </form>
      </Card>

      <Card className="overflow-hidden">
        <p className="px-4 py-2 text-xs text-muted-foreground border-b">
          {rows.length.toLocaleString('fa-IR')} پروژه در دسترس شما
        </p>
        <SalesGridToolbar search={search} onSearch={setSearch} placeholder="نام یا کد پروژه" density={density} onDensity={setDensity}>
          <select className="rounded-md border text-xs px-2 py-1" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">همهٔ وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="on_hold">متوقف</option>
            <option value="completed">تکمیل</option>
          </select>
        </SalesGridToolbar>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/40 text-muted-foreground border-b">
              <th className="py-2 px-3 text-right">پروژه</th>
              <th className="py-2 px-3 text-right">وضعیت</th>
              <th className="py-2 px-3 text-right">سررسید</th>
              <th className="py-2 px-3 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.code} className="border-b border-dashed">
                <td className={cn('px-3', rowPadding(density))}>
                  <p className="font-medium text-rose-900 dark:text-rose-200">{r.name}</p>
                  <Link href={`/projects/projects/${encodeURIComponent(r.code)}`} className="font-mono text-[11px] text-primary">
                    {r.code}
                  </Link>
                </td>
                <td className={cn('px-3', rowPadding(density))}>
                  <ProjectStatusBadge status={r.status} />
                </td>
                <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.deadline ?? '—'}</td>
                <td className={cn('px-3', rowPadding(density))}>
                  <Button type="button" size="sm" variant="outline" asChild>
                    <Link href={`/projects/projects/${encodeURIComponent(r.code)}`}>زمینه پروژه</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function ProjectStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    active: { label: 'فعال', className: 'bg-emerald-100 text-emerald-900' },
    on_hold: { label: 'متوقف', className: 'bg-amber-100 text-amber-900' },
    completed: { label: 'تکمیل', className: 'bg-sky-100 text-sky-900' },
    canceled: { label: 'لغو', className: 'bg-muted text-muted-foreground' },
  };
  const m = map[status] ?? map.active!;
  return <Badge className={`${m.className} font-normal`}>{m.label}</Badge>;
}
