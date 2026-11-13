'use client';

import { useEffect, useMemo, useState } from 'react';
import { createErpRecord, fetchErpRecords, updateErpRecord } from '../lib/erp-api';
import Link from 'next/link';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  KPICard,
  PageHeader,
  ErpDataTable,
  JalaliDatePicker,
} from '@repo/ui';
import type { ErpField, ErpScreen } from '../lib/erp-module-screens';

function emptyRow(fields: ErpField[]) {
  const row: Record<string, string | number> = { id: crypto.randomUUID() };
  for (const f of fields) row[f.key] = f.type === 'number' ? 0 : '';
  return row;
}

function statusVariant(value: string) {
  const v = value.toLowerCase();
  if (['تأیید', 'تأییدشده', 'فعال', 'تمام', 'پایدار', 'بسته', 'همگام'].some((k) => v.includes(k))) return 'success' as const;
  if (['در جریان', 'هشدار', 'در انتظار', 'در مسیر', 'برنامه'].some((k) => v.includes(k))) return 'warning' as const;
  if (['پیش‌نویس', 'بحرانی'].some((k) => v.includes(k))) return 'default' as const;
  return 'secondary' as const;
}

export function ModuleWorkbench({ screen }: { screen: ErpScreen }) {
  const [rows, setRows] = useState(screen.rows);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    void fetchErpRecords(screen.href)
      .then((r) => {
        if (r.length) setRows(r.map(showSavedFields));
      })
      .catch((e: Error) => setApiError(e.message));
  }, [screen.href]);
  const [draft, setDraft] = useState<Record<string, string | number> | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const tableColumns = useMemo(
    () =>
      screen.columns.map((c) => ({
        accessorKey: c.key,
        header: c.label,
        cell: (row: Record<string, string | number>) =>
          screen.statusKey === c.key ? (
            <Badge variant={statusVariant(String(row[c.key] ?? ''))}>{String(row[c.key] ?? '—')}</Badge>
          ) : (
            String(row[c.key] ?? '—')
          ),
      })),
    [screen.columns, screen.statusKey],
  );

  const openCreate = () => {
    setEditingId(null);
    setDraft(emptyRow(screen.fields));
  };

  const openEdit = (row: Record<string, string | number>) => {
    setEditingId(String(row.id));
    setDraft({ ...row });
  };

  const save = () => {
    if (!draft) return;
    const form = document.getElementById('erp-record-form');
    const typed = { ...draft };
    if (form instanceof HTMLFormElement) {
      const data = new FormData(form);
      for (const f of screen.fields) {
        const v = data.get(f.key);
        if (typeof v === 'string') typed[f.key] = f.type === 'number' ? Number(v) : v;
      }
    }
    void (async () => {
      try {
        setApiError(null);
        if (editingId) {
          const { row } = await updateErpRecord(screen.href, String(editingId), typed);
          setRows((prev) => prev.map((r) => (String(r.id) === editingId ? showSavedFields({ ...typed, ...row }) : r)));
        } else {
          const { row } = await createErpRecord(screen.href, typed);
          setRows((prev) => [showSavedFields({ ...typed, ...row }), ...prev]);
        }
        setDraft(null);
        setEditingId(null);
      } catch (e) {
        setApiError(e instanceof Error ? e.message : 'save failed');
      }
    })();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={screen.title}
        description={`${screen.description} · ${screen.moduleLabel}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" asChild>
              <Link href="/bi/dashboard">داشبورد BI</Link>
            </Button>
            <Button type="button" onClick={openCreate}>
              ثبت جدید
            </Button>
          </div>
        }
      />

      {apiError && (
        <p className="text-sm text-amber-600">API: {apiError} — نمایش داده محلی تا اتصال API برقرار شود.</p>
      )}
      {screen.kpis && (
        <Box className="grid gap-3 sm:grid-cols-3">
          {screen.kpis.map((k) => (
            <KPICard key={k.label} title={k.label} value={k.value} />
          ))}
        </Box>
      )}

      <Card>
        <CardContent className="space-y-4 pt-6">
          <ErpDataTable
            columns={tableColumns}
            data={rows as Array<Record<string, string | number>>}
            renderRowActions={(row) => (
              <Button type="button" size="sm" variant="outline" onClick={() => openEdit(row as Record<string, string | number>)}>
                ویرایش
              </Button>
            )}
          />
        </CardContent>
      </Card>

      {draft && (
        <Card className="border-primary/25">
          <CardContent className="space-y-4 pt-6">
            <form id="erp-record-form" className="space-y-4" onSubmit={(e) => { e.preventDefault(); save(); }}>
            <h3 className="font-semibold">{editingId ? 'ویرایش' : 'ثبت جدید'}</h3>
            <Box className="grid gap-3 sm:grid-cols-2">
              {screen.fields.map((f) => (
                <label key={f.key} className="space-y-1 text-sm">
                  <span className="text-muted-foreground">{f.label}</span>
                  {f.type === 'select' ? (
                    <select
                      name={f.key}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      value={String(draft[f.key] ?? '')}
                      onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                    >
                      <option value="">انتخاب…</option>
                      {(f.options ?? []).map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === 'date' ? (
                    <JalaliDatePicker
                      value={String(draft[f.key] ?? '')}
                      onChange={(v) => setDraft({ ...draft, [f.key]: v })}
                    />
                  ) : (
                    <Input
                      name={f.key}
                      value={String(draft[f.key] ?? '')}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value,
                        })
                      }
                    />
                  )}
                </label>
              ))}
            </Box>
            <Box className="flex gap-2">
              <Button type="button" onClick={save}>
                ذخیره
              </Button>
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                انصراف
              </Button>
            </Box>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function showSavedFields(row: Record<string, string | number>): Record<string, string | number> {
  const person = row.person || row.title || row.fullName || '';
  const title = row.title || row.person || '';
  return {
    ...row,
    code: row.code || '',
    person,
    title,
  };
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={props.className}>{props.children}</div>;
}
