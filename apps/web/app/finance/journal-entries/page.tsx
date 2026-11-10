'use client';

import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  ErpDataTable,
  Input,
  PageHeader,
} from '@repo/ui';
import {
  createJournalDraft,
  listJournalEntries,
  postJournal,
  type JournalEntry,
} from '../../../lib/finance-api';

export default function JournalEntriesPage() {
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
    <div className="container max-w-5xl space-y-6 py-8">
      <PageHeader
        title="اسناد حسابداری"
        description="مسیر end-to-end مالی: پیش‌نویس متوازن → workflow CFO → Post → Outbox → projection"
        action={
          <Button type="button" onClick={createBalanced}>
            پیش‌نویس نمونه
          </Button>
        }
      />
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
    </div>
  );
}
