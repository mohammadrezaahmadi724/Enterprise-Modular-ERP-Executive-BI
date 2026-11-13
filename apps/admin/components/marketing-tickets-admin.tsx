'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card, CardContent, PageHeader } from '@repo/ui';
import { createAdminRow, fetchAdminRows, updateAdminRow } from '../lib/admin-api';
import { CommercialDeskNav } from './commercial-desk-nav';

type TicketRow = {
  id: string;
  code: string;
  tenant: string;
  subject: string;
  category: string;
  rawCategory?: string;
  slot: string;
  phone?: string;
  estimateRange?: string;
  priority: string;
  status: string;
  createdAt?: string;
  detailJson?: string;
};

type FilterKey = 'all' | 'estimate_lead' | 'meeting_request' | 'other';

const STATUS_OPTS = ['باز', 'در حال بررسی', 'بسته'] as const;

export function MarketingTicketsAdmin() {
  const [rows, setRows] = useState<TicketRow[]>([]);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selected, setSelected] = useState<TicketRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [q, setQ] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [createSubject, setCreateSubject] = useState('');
  const [createTenant, setCreateTenant] = useState('demo-company');

  const load = () => {
    void fetchAdminRows('tickets', q || undefined)
      .then((r) => setRows(r as TicketRow[]))
      .catch((e: Error) => setError(e.message));
  };

  useEffect(() => {
    load();
  }, [q]);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter === 'all') return true;
      if (filter === 'other')
        return r.rawCategory !== 'estimate_lead' && r.rawCategory !== 'meeting_request';
      return r.rawCategory === filter;
    });
  }, [rows, filter]);

  const counts = useMemo(
    () => ({
      estimate: rows.filter((r) => r.rawCategory === 'estimate_lead').length,
      meeting: rows.filter((r) => r.rawCategory === 'meeting_request').length,
    }),
    [rows],
  );

  const patchStatus = async (id: string, status: string) => {
    setSaving(true);
    try {
      await updateAdminRow('tickets', id, { status });
      load();
      setSelected((s) => (s?.id === id ? { ...s, status } : s));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <CommercialDeskNav />
      <PageHeader
        title="رزرو جلسه و برآورد"
        description="تأیید موبایل برآوردگر و رزرو جلسه — مستقیم از دیتابیس platform.support_tickets"
      />
      {error ? (
        <p className="text-sm text-destructive border border-destructive/30 rounded-lg px-3 py-2">{error}</p>
      ) : null}

      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="rounded-lg border px-3 py-2 text-sm min-w-[12rem]"
          placeholder="جستجو…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {(
          [
            ['all', `همه (${rows.length})`],
            ['estimate_lead', `برآورد (${counts.estimate})`],
            ['meeting_request', `جلسه (${counts.meeting})`],
            ['other', 'سایر'],
          ] as const
        ).map(([key, label]) => (
          <Button
            key={key}
            size="sm"
            variant={filter === key ? 'default' : 'outline'}
            onClick={() => setFilter(key)}
          >
            {label}
          </Button>
        ))}
        <Button size="sm" variant="ghost" onClick={load}>
          بروزرسانی
        </Button>
        <Button size="sm" onClick={() => setCreateOpen(true)}>
          + تیکت QA
        </Button>
      </div>

      {createOpen ? (
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="text-sm font-semibold">تیکت پشتیبانی جدید</p>
            <input
              autoFocus
              aria-label="موضوع تیکت"
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="موضوع"
              value={createSubject}
              maxLength={120}
              onChange={(e) => setCreateSubject(e.target.value)}
            />
            <input
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="slug مستأجر"
              value={createTenant}
              onChange={(e) => setCreateTenant(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                disabled={!createSubject.trim() || saving}
                onClick={() => {
                  void (async () => {
                    setSaving(true);
                    try {
                      await createAdminRow('tickets', {
                        subject: createSubject.trim(),
                        tenant: createTenant.trim(),
                        priority: 'normal',
                        status: 'open',
                      });
                      setCreateOpen(false);
                      setCreateSubject('');
                      load();
                    } catch (e) {
                      setError(e instanceof Error ? e.message : 'خطا');
                    } finally {
                      setSaving(false);
                    }
                  })();
                }}
              >
                ذخیره
              </Button>
              <Button size="sm" variant="outline" onClick={() => setCreateOpen(false)}>
                انصراف
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30 text-muted-foreground">
                <tr>
                  <th className="p-2 text-right font-medium">زمان</th>
                  <th className="p-2 text-right font-medium">دسته</th>
                  <th className="p-2 text-right font-medium">سازمان</th>
                  <th className="p-2 text-right font-medium">موضوع</th>
                  <th className="p-2 text-right font-medium">موبایل/جلسه</th>
                  <th className="p-2 text-right font-medium">برآورد</th>
                  <th className="p-2 text-right font-medium">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className={`border-b cursor-pointer hover:bg-muted/20 ${selected?.id === r.id ? 'bg-primary/5' : ''}`}
                    onClick={() => setSelected(r)}
                  >
                    <td className="p-2 whitespace-nowrap text-xs" dir="ltr">
                      {r.createdAt ?? '—'}
                    </td>
                    <td className="p-2">
                      <Badge variant={r.rawCategory === 'estimate_lead' ? 'default' : 'secondary'}>{r.category}</Badge>
                    </td>
                    <td className="p-2">{r.tenant}</td>
                    <td className="p-2 max-w-[14rem] truncate" title={r.subject}>
                      {r.subject}
                    </td>
                    <td className="p-2" dir="ltr">
                      {r.slot}
                    </td>
                    <td className="p-2">{r.estimateRange ?? '—'}</td>
                    <td className="p-2">
                      <Badge>{r.status}</Badge>
                    </td>
                  </tr>
                ))}
                {!filtered.length ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      تیکتی نیست — یک بار /pricing/estimate را تا OTP کامل کنید.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="h-fit sticky top-4">
          <CardContent className="p-4 space-y-3">
            <h2 className="font-bold">جزئیات</h2>
            {!selected ? (
              <p className="text-sm text-muted-foreground">یک ردیف را انتخاب کنید.</p>
            ) : (
              <>
                <p className="text-xs text-muted-foreground font-mono" dir="ltr">
                  {selected.id}
                </p>
                <p className="text-sm">
                  <strong>{selected.tenant}</strong>
                  <br />
                  {selected.subject}
                </p>
                <div className="flex flex-wrap gap-1">
                  {STATUS_OPTS.map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selected.status === s ? 'default' : 'outline'}
                      disabled={saving}
                      onClick={() => void patchStatus(selected.id, s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
                {selected.detailJson ? (
                  <pre className="text-[10px] bg-muted/40 rounded-lg p-2 overflow-auto max-h-64" dir="ltr">
                    {selected.detailJson}
                  </pre>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
