'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  ErpDataTable,
  Input,
} from '@repo/ui';
import {
  createJournalDraft,
  listJournalEntries,
  postJournal,
  type JournalEntry,
} from '../../../lib/finance-api';
import { FinanceJournalMasterDetail } from '../../../components/finance/FinanceJournalMasterDetail';

function JournalEntriesPageInner() {
  const searchParams = useSearchParams();
  const apiPanelRef = useRef<HTMLDetailsElement>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debit, setDebit] = useState('1000000');
  const [credit, setCredit] = useState('1000000');
  const [account, setAccount] = useState('1101');

  const reload = () => {
    void listJournalEntries()
      .then((r) => setEntries(r.entries))
      .catch((e: Error) => setError(e.message));
  };

  useEffect(() => {
    reload();
  }, []);

  const openApiPanel = searchParams.get('new') === '1';

  useEffect(() => {
    if (!openApiPanel) return;
    const el = apiPanelRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.open = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [openApiPanel]);

  const createBalanced = () => {
    void createJournalDraft([
      { accountId: account, debit, credit: '0', description: 'بدهکار' },
      { accountId: '2101', debit: '0', credit, description: 'بستانکار' },
    ])
      .then(() => reload())
      .catch((e: Error) => setError(e.message));
  };

  const postWithApproval = (draft: JournalEntry) => {
    void postJournal(draft, { userId: '00000000-0000-4000-8000-cfo00001', role: 'CFO' })
      .then(() => reload())
      .catch((e: Error) => setError(e.message));
  };

  return (
    <div className="space-y-4">
      <FinanceJournalMasterDetail />
      <details ref={apiPanelRef} open={openApiPanel} className="rounded-lg border p-3 text-sm" id="journal-api-draft-panel">
        <summary className="cursor-pointer font-medium">اتصال API واقعی (پیش‌نویس / Post)</summary>
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
        <p className="text-sm text-muted-foreground">
          پیش‌نویس متوازن → workflow CFO → Post → Outbox → projection
        </p>
        <Button type="button" onClick={createBalanced}>
          پیش‌نویس نمونه
        </Button>
      </div>
      {error && <p className="text-sm text-amber-600">{error}</p>}
      <Card>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-3">
          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">حساب</span>
            <Input value={account} onChange={(e) => setAccount(e.target.value)} />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">بدهکار</span>
            <Input value={debit} dir="ltr" onChange={(e) => setDebit(e.target.value)} />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">بستانکار</span>
            <Input value={credit} dir="ltr" onChange={(e) => setCredit(e.target.value)} />
          </label>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <ErpDataTable
            columns={[
              { accessorKey: 'id', header: 'شناسه', enableSorting: false },
              { accessorKey: 'status', header: 'وضعیت', cell: (row) => <Badge>{String(row.status)}</Badge> },
              { accessorKey: 'entryDate', header: 'تاریخ' },
            ]}
            data={entries as unknown as Array<Record<string, unknown>>}
            renderRowActions={(row) => {
              const entry = row as unknown as JournalEntry;
              if (entry.status !== 'Draft') return null;
              return (
                <Button type="button" size="sm" onClick={() => postWithApproval(entry)}>
                  Post + تأیید CFO
                </Button>
              );
            }}
          />
        </CardContent>
      </Card>
      </details>
    </div>
  );
}

export default function JournalEntriesPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground p-4">در حال بارگذاری…</p>}>
      <JournalEntriesPageInner />
    </Suspense>
  );
}
