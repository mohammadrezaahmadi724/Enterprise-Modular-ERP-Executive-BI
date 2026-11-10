'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent, ErpDataTable, Input, JalaliDatePicker, PageHeader } from '@repo/ui';
import { createAdminRow, deleteAdminRow, fetchAdminRows, updateAdminRow } from '../lib/admin-api';

export type AdminField = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'date';
  options?: string[];
  required?: boolean;
};

export type AdminRow = Record<string, string | number>;

export type AdminResourceConfig = {
  title: string;
  description: string;
  fields: AdminField[];
  columns: Array<{ key: string; label: string }>;
  rows: AdminRow[];
  statusKey?: string;
};

function emptyRow(fields: AdminField[]): AdminRow {
  const row: AdminRow = { id: crypto.randomUUID() };
  for (const f of fields) row[f.key] = f.type === 'number' ? 0 : '';
  return row;
}

function statusVariant(value: string) {
  const v = value.toLowerCase();
  if (['فعال', 'موفق', 'پرداخت‌شده', 'بسته', 'تأیید', 'enabled', 'on', 'open'].some((k) => v.includes(k))) return 'success' as const;
  if (['معلق', 'در انتظار', 'بحرانی', 'pending', 'warning', 'در حال بررسی'].some((k) => v.includes(k))) return 'warning' as const;
  if (['غیرفعال', 'رد', 'failed', 'لغو', 'منقضی'].some((k) => v.includes(k))) return 'default' as const;
  return 'secondary' as const;
}

export function AdminResourceCrud({
  config,
  apiResource,
}: {
  config: AdminResourceConfig;
  apiResource: string;
}) {
  const [rows, setRows] = useState<AdminRow[]>(config.rows);
  const [draft, setDraft] = useState<AdminRow | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    void fetchAdminRows(apiResource)
      .then((r) => setRows(r as AdminRow[]))
      .catch((e: Error) => {
        setApiError(e.message);
        setRows(config.rows);
      });
  }, [apiResource, config.rows]);

  const tableColumns = useMemo(
    () =>
      config.columns.map((c) => ({
        accessorKey: c.key,
        header: c.label,
        cell: (row: AdminRow) =>
          config.statusKey === c.key ? (
            <Badge variant={statusVariant(String(row[c.key] ?? ''))}>{String(row[c.key] ?? '—')}</Badge>
          ) : (
            String(row[c.key] ?? '—')
          ),
      })),
    [config.columns, config.statusKey],
  );

  const openCreate = () => {
    setEditingId(null);
    setDraft(emptyRow(config.fields));
  };

  const openEdit = (row: AdminRow) => {
    setEditingId(String(row.id));
    setDraft({ ...row });
  };

  const save = () => {
    if (!draft) return;
    const missing = config.fields.filter((f) => f.required && !String(draft[f.key] ?? '').trim());
    if (missing.length) return;

    void (async () => {
      try {
        setApiError(null);
        if (editingId) {
          const { row } = await updateAdminRow(apiResource, String(editingId), draft);
          setRows((prev) => prev.map((r) => (String(r.id) === editingId ? (row as AdminRow) : r)));
        } else {
          const { row } = await createAdminRow(apiResource, draft);
          setRows((prev) => [row as AdminRow, ...prev]);
        }
        setDraft(null);
        setEditingId(null);
      } catch (e) {
        setApiError(e instanceof Error ? e.message : 'save failed');
      }
    })();
  };

  const remove = (id: string) => {
    void (async () => {
      try {
        await deleteAdminRow(apiResource, id);
        setRows((prev) => prev.filter((r) => String(r.id) !== id));
      } catch (e) {
        setApiError(e instanceof Error ? e.message : 'delete failed');
      }
    })();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={config.title}
        description={config.description}
        action={
          <Button type="button" onClick={openCreate}>
            افزودن
          </Button>
        }
      />

      {apiError && (
        <p className="text-sm text-amber-600">
          API: {apiError} — داده fallback محلی. `pnpm --filter @repo/api dev` و `pnpm db:push` را بررسی کنید.
        </p>
      )}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <ErpDataTable
            columns={tableColumns}
            data={rows as Array<Record<string, unknown>>}
            globalFilterPlaceholder="جستجو در همه ستون‌ها…"
            renderRowActions={(row) => (
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => openEdit(row as AdminRow)}>
                  ویرایش
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={() => remove(String(row.id))}>
                  حذف
                </Button>
              </div>
            )}
          />
        </CardContent>
      </Card>

      {draft && (
        <Card className="border-primary/30 shadow-[var(--shadow-soft)]">
          <CardContent className="space-y-4 pt-6">
            <h3 className="font-semibold">{editingId ? 'ویرایش رکورد' : 'رکورد جدید'}</h3>
            <Box className="grid gap-3 sm:grid-cols-2">
              {config.fields.map((f) => (
                <label key={f.key} className="space-y-1 text-sm">
                  <span className="text-muted-foreground">{f.label}</span>
                  {f.type === 'select' ? (
                    <select
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
                      type={f.type === 'number' ? 'number' : 'text'}
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
            <div className="flex gap-2">
              <Button type="button" onClick={save}>
                ذخیره
              </Button>
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                انصراف
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Box(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={props.className}>{props.children}</div>;
}
