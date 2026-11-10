import { z } from 'zod';
import type { GlEntryPostedV1 } from './gl-entry-posted.v1';

export const GL_ENTRY_POSTED_V2 = 'finance.gl_entry.posted.v2' as const;

export const GlEntryPostedV2Schema = z.object({
  eventType: z.literal(GL_ENTRY_POSTED_V2),
  schemaVersion: z.literal(2),
  aggregateId: z.string().uuid(),
  aggregateVersion: z.number().int().positive(),
  tenantId: z.string().uuid(),
  payload: z.object({
    journalEntryId: z.string().uuid(),
    totalDebit: z.bigint(),
    totalCredit: z.bigint(),
    currency: z.string(),
  }),
});

export function upcastGlEntryPostedV1ToV2(v1: GlEntryPostedV1) {
  return {
    eventType: GL_ENTRY_POSTED_V2,
    schemaVersion: 2 as const,
    aggregateId: v1.aggregateId,
    aggregateVersion: v1.aggregateVersion,
    tenantId: v1.tenantId,
    payload: {
      journalEntryId: v1.payload.journalEntryId,
      totalDebit: BigInt(v1.payload.totalDebit),
      totalCredit: BigInt(v1.payload.totalCredit),
      currency: 'IRR',
    },
  };
}
