import { describe, it, expect } from 'vitest';
import { GlEntryPostedV1Schema } from '../src/events/gl-entry-posted.v1';
import { GlEntryPostedV2Schema, upcastGlEntryPostedV1ToV2 } from '../src/events/gl-entry-posted.v2';
import { randomUUID } from 'node:crypto';

describe('Contract upcasters — Wave 2', () => {
  const base = {
    eventType: 'finance.gl_entry.posted.v1' as const,
    schemaVersion: 1 as const,
    aggregateId: randomUUID(),
    aggregateVersion: 1,
    tenantId: randomUUID(),
    payload: {
      journalEntryId: randomUUID(),
      totalDebit: '1000',
      totalCredit: '1000',
    },
  };

  it('Upcast V1→V2 بدون خطا', () => {
    const v1 = GlEntryPostedV1Schema.parse(base);
    const v2 = upcastGlEntryPostedV1ToV2(v1);
    expect(() => GlEntryPostedV2Schema.parse(v2)).not.toThrow();
    expect(v2.payload.totalDebit).toBe(1000n);
  });

  it('Breaking change در V1 باید reject شود', () => {
    expect(() =>
      GlEntryPostedV1Schema.parse({ ...base, schemaVersion: 2 }),
    ).toThrow();
  });
});
