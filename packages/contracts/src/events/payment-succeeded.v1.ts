import { z } from 'zod';

export const PAYMENT_SUCCEEDED_V1 = 'platform.payment.succeeded.v1' as const;

export const PaymentSucceededV1Schema = z.object({
  eventType: z.literal(PAYMENT_SUCCEEDED_V1),
  schemaVersion: z.literal(1),
  aggregateId: z.string().uuid(),
  aggregateVersion: z.number().int().positive(),
  tenantId: z.string().uuid(),
  payload: z.object({
    paymentId: z.string().uuid(),
    amount: z.string(),
    currency: z.string(),
    idempotencyKey: z.string(),
  }),
});
