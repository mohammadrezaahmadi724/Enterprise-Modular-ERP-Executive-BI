'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Layers, List, Plus, Search, Upload } from 'lucide-react';
import { DEFAULT_PIPELINE_NAME } from '../../lib/sales-hub-config';
import {
  BOARD_CARD_LIMIT,
  PRIORITY_LABEL,
  SALES_LEADS,
  STAGE_DEFS,
  STAGE_NEXT,
  filterLeads,
  formatLeadAmount,
  stageStats,
  type LeadPriority,
  type LeadStage,
  type QuickLeadTab,
  type SalesLead,
} from '../../lib/sales-leads-demo';

const QUICK_TABS: Array<{ id: QuickLeadTab; label: string }> = [
  { id: 'all', label: 'همه' },
  { id: 'open', label: 'در جریان' },
  { id: 'mine', label: 'سرنخ‌های من' },
  { id: 'followup', label: 'نیازمند پیگیری' },
  { id: 'won', label: 'برنده‌شده' },
  { id: 'lost', label: 'از دست رفته' },
];

type ViewMode = 'board' | 'list';

export function SalesLeadsScreen() {
  const [view, setView] = useState<ViewMode>('board');
  const [quickTab, setQuickTab] = useState<QuickLeadTab>('all');
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<LeadPriority | ''>('');
  const [leads, setLeads] = useState(SALES_LEADS);
  const [createOpen, setCreateOpen] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftSubject, setDraftSubject] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = window.setInterval(() => {
      const value = searchRef.current?.value ?? '';
      setSearch((prev) => (prev === value ? prev : value));
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (searchParams.get('new') === '1') setCreateOpen(true);
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/sales/leads');
        const data = (await res.json()) as { leads?: SalesLead[] };
        if (!cancelled && Array.isArray(data.leads)) setLeads(data.leads);
      } catch {
        /* keep demo seed */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistLeads = async (next: SalesLead[]) => {
    setLeads(next);
    try {
      await fetch('/api/sales/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads: next }),
      });
    } catch {
      /* UI still updated */
    }
  };

  const filtered = useMemo(
    () => filterLeads(leads, quickTab, search, priority),
    [leads, quickTab, search, priority],
  );

  const openCount = useMemo(() => leads.filter((l) => l.outcome === 'open').length, [leads]);

  const addLead = async (name: string, subject: string) => {
    const cleanName = name.trim();
    if (!cleanName) return;
    const row: SalesLead = {
      id: `QA-${Date.now()}`,
      name: cleanName,
      subject: subject.trim() || 'سرنخ جدید',
      amountToman: 0,
      stage: 'qualify',
      priority: 'normal',
      nextAction: 'تماس اول',
      outcome: 'open',
      mine: true,
      needsFollowup: true,
    };
    try {
      const res = await fetch('/api/sales/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: row }),
      });
      const data = (await res.json()) as { leads?: SalesLead[] };
      if (Array.isArray(data.leads)) {
        setLeads(data.leads);
      } else {
        await persistLeads([row, ...leads]);
      }
    } catch {
      await persistLeads([row, ...leads]);
    }
    setDraftName('');
    setDraftSubject('');
    setCreateOpen(false);
    setView('board');
    setQuickTab('all');
    setSearch('');
  };

  const importLeads = async (file: File) => {
    const text = await file.text();
    const rows = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
    if (!rows.length) return;
    const imported = [
      ...rows.map((line, index) => {
        const [name, subject] = line.split(/[,;\t]/).map((part) => part.trim());
        return {
          id: `QA-file-${Date.now()}-${index}`,
          name: name || `سرنخ ${index + 1}`,
          subject: subject || 'ورود از فایل',
          amountToman: 0,
          stage: 'qualify' as const,
          priority: 'normal' as const,
          nextAction: 'بررسی فایل',
          outcome: 'open' as const,
          mine: true,
          needsFollowup: true,
        };
      }),
      ...leads,
    ];
    await persistLeads(imported);
  };

  const moveLead = (leadId: string, stage: LeadStage) => {
    const next = leads.map((l) => (l.id === leadId ? { ...l, stage } : l));
    void persistLeads(next);
  };

  const showBoard = view === 'board' && quickTab !== 'won' && quickTab !== 'lost';

  return (
    <div className="sk-module-page flex flex-col gap-4 animate-in fade-in duration-300">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold m-0">سرنخ‌ها</h2>
          <span className="text-sm text-muted-foreground">
            {openCount} سرنخ در جریان — {DEFAULT_PIPELINE_NAME}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1" role="group" aria-label="نحوهٔ نمایش">
            <Button
              type="button"
              size="sm"
              variant={view === 'board' ? 'outline' : 'ghost'}
              className={cn(view === 'board' && 'border-primary text-primary')}
              aria-pressed={view === 'board'}
              onClick={() => setView('board')}
            >
              <Layers className="size-4 ml-1" />
              قیف فروش
            </Button>
            <Button
              type="button"
              size="sm"
              variant={view === 'list' ? 'outline' : 'ghost'}
              className={cn(view === 'list' && 'border-primary text-primary')}
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              <List className="size-4 ml-1" />
              فهرست
            </Button>
          </div>
          <Button size="sm" type="button" onClick={() => setCreateOpen(true)}>
            <Plus className="size-4 ml-1" />
            سرنخ جدید
          </Button>
          <Button size="sm" variant="outline" type="button" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4 ml-1" />
            ورود از فایل
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.txt,text/plain"
            className="sr-only"
            aria-label="فایل سرنخ"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void importLeads(file);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      <Card className="overflow-visible">
        <div role="tablist" aria-label="نمای سریع" className="flex flex-wrap gap-1.5 px-4 pt-3">
          {QUICK_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={quickTab === t.id}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs transition-colors',
                quickTab === t.id
                  ? 'border-primary bg-background font-semibold text-primary shadow-sm'
                  : 'border-transparent text-muted-foreground hover:bg-muted/50',
              )}
              onClick={() => setQuickTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="sk-leads-filters flex flex-wrap items-center gap-2.5 px-4 py-3 border-b">
          <div className="relative w-full sm:w-[260px]">
            <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              ref={searchRef}
              aria-label="جست‌وجو در نام، موضوع نیاز، شماره یا کد"
              placeholder="نام، موضوع نیاز یا شماره"
              className="w-full rounded-md border bg-background py-2 pr-9 pl-3 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
            />
            {search.trim() ? (
              <span className="text-xs text-muted-foreground">{filtered.length.toLocaleString('fa-IR')} نتیجه</span>
            ) : null}
          </div>
          <select
            className="rounded-md border bg-background px-3 py-2 text-sm min-w-[130px]"
            aria-label="اولویت"
            value={priority}
            onChange={(e) => setPriority((e.target.value || '') as LeadPriority | '')}
          >
            <option value="">همهٔ اولویت‌ها</option>
            <option value="urgent">فوری</option>
            <option value="high">بالا</option>
            <option value="normal">عادی</option>
            <option value="low">کم</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">سرنخی با این جست‌وجو یا فیلتر پیدا نشد.</p>
        ) : showBoard ? (
          <LeadBoard leads={filtered} onMove={moveLead} />
        ) : (
          <LeadList leads={filtered} />
        )}
        {createOpen ? (
          <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label="سرنخ جدید">
            <form
              className="mt-16 w-full max-w-md space-y-3 rounded-xl border bg-card p-5 shadow-xl"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                addLead(String(data.get('name') ?? draftName), String(data.get('subject') ?? draftSubject));
              }}
            >
              <p className="text-sm font-semibold">سرنخ جدید</p>
              <input
                name="name"
                required
                maxLength={80}
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="نام سازمان یا شخص، مثلاً QA-Lead-01"
                aria-label="نام سرنخ"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <input
                name="subject"
                maxLength={120}
                value={draftSubject}
                onChange={(e) => setDraftSubject(e.target.value)}
                placeholder="موضوع نیاز"
                aria-label="موضوع نیاز"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <Button type="submit" size="sm">ثبت سرنخ</Button>
                <Button type="button" size="sm" variant="outline" onClick={() => setCreateOpen(false)}>انصراف</Button>
              </div>
            </form>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

function LeadBoard({ leads, onMove }: { leads: SalesLead[]; onMove: (id: string, stage: LeadStage) => void }) {
  return (
    <div className="sk-lead-board" role="list" aria-label="قیف فروش">
      {STAGE_DEFS.map((def) => (
        <LeadColumn key={def.id} def={def} leads={leads} onMove={onMove} />
      ))}
    </div>
  );
}

function LeadColumn({
  def,
  leads,
  onMove,
}: {
  def: (typeof STAGE_DEFS)[number];
  leads: SalesLead[];
  onMove: (id: string, stage: LeadStage) => void;
}) {
  const inStage = leads.filter((l) => l.stage === def.id && l.outcome === 'open');
  const stats = stageStats(leads, def.id);
  const count = stats.count;
  const sum = stats.sumToman;
  const visible = inStage.slice(0, BOARD_CARD_LIMIT);
  const more = inStage.length - visible.length;

  return (
    <section role="listitem" aria-label={def.title} className="sk-lead-col">
      <header className="sk-lead-col__head">
        <div className="sk-lead-col__title">
          <strong>{def.title}</strong>
          <span className="sk-lead-col__count">{count}</span>
        </div>
        <div className="sk-lead-col__sum">
          {formatLeadAmount(sum)}
          <span className="text-muted-foreground/80"> · احتمال {def.probabilityPct}٪</span>
        </div>
      </header>
      <div className="sk-lead-col__body">
        {visible.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onMove={onMove} />
        ))}
        {visible.length === 0 ? (
          <p className="sk-lead-col__more">سرنخی در این مرحله با فیلتر فعلی نیست.</p>
        ) : null}
        {more > 0 ? (
          <div className="sk-lead-col__more">
            {more} سرنخ دیگر — برای دیدن همه از نمای فهرست استفاده کنید.
          </div>
        ) : null}
      </div>
    </section>
  );
}

function LeadCard({ lead, onMove }: { lead: SalesLead; onMove: (id: string, stage: LeadStage) => void }) {
  const nextOptions = STAGE_NEXT[lead.stage];
  return (
    <article className="sk-lead-card" draggable>
      <button type="button" className="text-right flex flex-col gap-0.5 w-full">
        <span className="text-sm font-semibold">{lead.name}</span>
        <span className="text-xs text-muted-foreground">{lead.subject}</span>
        <span className="sk-lead-card__amount">{formatLeadAmount(lead.amountToman)}</span>
      </button>
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <PriorityBadge priority={lead.priority} />
        {lead.closeDate ? <span title="تاریخ احتمالی بستن">{lead.closeDate}</span> : null}
      </div>
      <div className={cn('text-xs', lead.nextActionDanger ? 'text-destructive' : 'text-muted-foreground')}>
        {lead.nextAction ?? 'بدون اقدام بعدی'}
      </div>
      {nextOptions.length > 0 ? (
        <select
          className="sk-lead-card__move w-full rounded-md border bg-background px-2 py-1 text-xs h-[30px]"
          aria-label={`انتقال ${lead.name} به مرحلهٔ بعد`}
          defaultValue=""
          onChange={(e) => {
            const v = e.target.value as LeadStage;
            if (v) onMove(lead.id, v);
            e.target.value = '';
          }}
        >
          <option value="">انتقال به…</option>
          {nextOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : null}
    </article>
  );
}

function LeadList({ leads }: { leads: SalesLead[] }) {
  return (
    <>
      <div className="sk-leads-table-wrap">
        <table className="sk-leads-table w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground text-xs">
              <th className="py-2 px-3 text-right">نام</th>
              <th className="py-2 px-3 text-right sk-col-md">موضوع</th>
              <th className="py-2 px-3 text-right">مبلغ</th>
              <th className="py-2 px-3 text-right sk-col-lg">مرحله</th>
              <th className="py-2 px-3 text-right">اولویت</th>
              <th className="py-2 px-3 text-right sk-col-lg">اقدام بعدی</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-dashed hover:bg-muted/40">
                <td className="py-2.5 px-3 font-medium">{l.name}</td>
                <td className="py-2.5 px-3 text-muted-foreground sk-col-md max-w-[200px] truncate">{l.subject}</td>
                <td className="py-2.5 px-3 text-primary font-medium tabular-nums">{formatLeadAmount(l.amountToman)}</td>
                <td className="py-2.5 px-3 sk-col-lg">{STAGE_DEFS.find((s) => s.id === l.stage)?.title ?? l.stage}</td>
                <td className="py-2.5 px-3">
                  <PriorityBadge priority={l.priority} />
                </td>
                <td className={cn('py-2.5 px-3 sk-col-lg text-xs', l.nextActionDanger && 'text-destructive')}>
                  {l.nextAction ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">سرنخی یافت نشد.</p>
        ) : null}
      </div>
      <div className="sk-leads-cards">
        {leads.map((l) => (
          <div key={l.id} className="rounded-lg border p-3 space-y-1">
            <p className="font-semibold text-sm">{l.name}</p>
            <p className="text-xs text-muted-foreground">{l.subject}</p>
            <p className="text-sm text-primary font-medium">{formatLeadAmount(l.amountToman)}</p>
            <div className="flex gap-2">
              <PriorityBadge priority={l.priority} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function PriorityBadge({ priority }: { priority: LeadPriority }) {
  const label = PRIORITY_LABEL[priority];
  if (priority === 'urgent') return <Badge className="bg-red-600 hover:bg-red-600 text-white">{label}</Badge>;
  if (priority === 'high') return <Badge className="bg-amber-500 hover:bg-amber-500">{label}</Badge>;
  if (priority === 'low') return <Badge variant="secondary">{label}</Badge>;
  return <Badge variant="outline">{label}</Badge>;
}
