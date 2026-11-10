import { z } from 'zod';

export const GL_ENTRY_POSTED_V1 = 'finance.gl_entry.posted.v1' as const;

export const GlEntryPostedV1Schema = z.object({
  eventType: z.literal(GL_ENTRY_POSTED_V1),
  schemaVersion: z.literal(1),
  aggregateId: z.string().uuid(),
  aggregateVersion: z.number().int().positive(),
  tenantId: z.string().uuid(),
  payload: z.object({
    journalEntryId: z.string().uuid(),
    totalDebit: z.string(),
    totalCredit: z.string(),
  }),
});

export type GlEntryPostedV1 = z.infer<typeof GlEntryPostedV1Schema>;
