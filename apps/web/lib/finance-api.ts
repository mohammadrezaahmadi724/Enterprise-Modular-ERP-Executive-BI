const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
const TENANT = process.env.NEXT_PUBLIC_DEMO_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

function headers(idempotency?: string) {
  return {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT,
    'x-user-id': '00000000-0000-4000-8000-000000000001',
    'x-correlation-id': idempotency ?? crypto.randomUUID(),
    'Idempotency-Key': idempotency ?? crypto.randomUUID(),
    'x-super-admin': 'true',
  };
}

export type JournalLine = { accountId: string; debit: string; credit: string; description?: string };

export type JournalEntry = {
  id: string;
  tenantId: string;
  status: string;
  entryDate: string;
  lines: JournalLine[];
  workflowStatus?: string;
};

export async function listJournalEntries() {
  const res = await fetch(`${API}/api/v1/finance/journal/entries`, { headers: headers(), cache: 'no-store' });
  if (!res.ok) throw new Error(`journal list: ${res.status}`);
  return (await res.json()) as { entries: JournalEntry[] };
}

export async function createJournalDraft(lines: JournalLine[]) {
  const res = await fetch(`${API}/api/v1/finance/journal/draft`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ lines }),
  });
  if (!res.ok) throw new Error(`journal draft: ${res.status}`);
  return (await res.json()) as { draft: JournalEntry };
}

export async function postJournal(draft: JournalEntry, approver?: { userId: string; role: string }) {
  const res = await fetch(`${API}/api/v1/finance/journal/post`, {
    method: 'POST',
    headers: headers(draft.id),
    body: JSON.stringify({
      draft,
      approverUserId: approver?.userId,
      approverRole: approver?.role,
    }),
  });
  if (!res.ok) throw new Error(`journal post: ${res.status}`);
  return (await res.json()) as { status: string; entry?: JournalEntry; workflowInstanceId?: string };
}
