import { z } from 'zod';

export const SUBSCRIPTION_PURCHASED_V1 = 'platform.subscription.purchased.v1' as const;

export const SubscriptionPurchasedV1Schema = z.object({
  eventType: z.literal(SUBSCRIPTION_PURCHASED_V1),
  schemaVersion: z.literal(1),
  aggregateId: z.string().uuid(),
  aggregateVersion: z.number().int().positive(),
  tenantId: z.string().uuid(),
  payload: z.object({
    subscriptionId: z.string().uuid(),
    planVersionId: z.string().uuid(),
    seats: z.number().int().positive(),
  }),
});
