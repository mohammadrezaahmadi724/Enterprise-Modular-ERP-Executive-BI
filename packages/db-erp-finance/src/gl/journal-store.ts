import type { JournalEntryDraft } from './ledger.service.js';

const store = new Map<string, JournalEntryDraft>();

export function saveJournalDraft(entry: JournalEntryDraft): JournalEntryDraft {
  store.set(entry.id, { ...entry });
  return entry;
}

export function getJournalDraft(id: string): JournalEntryDraft | undefined {
  return store.get(id);
}

export function listJournalDrafts(tenantId: string): JournalEntryDraft[] {
  return [...store.values()].filter((e) => e.tenantId === tenantId);
}

export function resetJournalStore(): void {
  store.clear();
}
