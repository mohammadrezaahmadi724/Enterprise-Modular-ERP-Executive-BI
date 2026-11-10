import { describe, it, expect } from 'vitest';
import { randomUUID } from 'node:crypto';
import { upcastGlEntryPostedV1ToV2, GlEntryPostedV1Schema } from '@repo/contracts';
import { assertEventOrdering, EventOrderingError } from '@repo/module-sdk';

describe('Event replay 1000 V1→V2 — خلأ ۲ — بند ۴.۲', () => {
  const tenantId = randomUUID();

  it('Replay ۱۰۰۰ رویداد با ترتیب aggregateVersion', () => {
    const aggregateId = randomUUID();
    const events = Array.from({ length: 1000 }, (_, i) => ({
      eventType: 'finance.gl_entry.posted.v1' as const,
      schemaVersion: 1 as const,
      aggregateId,
      aggregateVersion: i + 1,
      tenantId,
      payload: {
        journalEntryId: randomUUID(),
        totalDebit: String(1000 + i),
        totalCredit: String(1000 + i),
      },
    }));

    let lastVersion = 0;
    for (const raw of events) {
      const v1 = GlEntryPostedV1Schema.parse(raw);
      expect(v1.aggregateVersion).toBe(lastVersion + 1);
      const v2 = upcastGlEntryPostedV1ToV2(v1);
      expect(v2.schemaVersion).toBe(2);
      lastVersion = v1.aggregateVersion;
    }
    expect(lastVersion).toBe(1000);
  });

  it('رویداد out-of-order باید شناسایی شود', () => {
    expect(() => assertEventOrdering('agg', 3, 1)).toThrow(EventOrderingError);
  });
});
