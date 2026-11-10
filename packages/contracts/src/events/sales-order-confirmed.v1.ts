import { z } from 'zod';

export const SALES_ORDER_CONFIRMED_V1 = 'sales.order.confirmed.v1' as const;

export const SalesOrderConfirmedV1Schema = z.object({
  eventType: z.literal(SALES_ORDER_CONFIRMED_V1),
  schemaVersion: z.literal(1),
  aggregateId: z.string().uuid(),
  aggregateVersion: z.number().int().positive(),
  tenantId: z.string().uuid(),
  payload: z.object({
    orderId: z.string().uuid(),
    total: z.string(),
    currency: z.string(),
  }),
});

export type SalesOrderConfirmedV1 = z.infer<typeof SalesOrderConfirmedV1Schema>;
