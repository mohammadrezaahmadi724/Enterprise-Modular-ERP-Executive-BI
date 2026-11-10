import { randomUUID } from 'node:crypto';
import { IdempotencyConflictError } from '@repo/domain';

export type UsageResourceType = 'AI_TOKENS' | 'SMS' | 'VOIP_MINUTES' | 'SURVEY';

export type UsageRecord = {
  id: string;
  tenantId: string;
  resourceType: UsageResourceType;
  quantity: number;
  unitCost: number;
  referenceType: string;
  referenceId: string;
  idempotencyKey: string;
  createdAt: Date;
};

const store = new Map<string, UsageRecord>();

export function resetUsageStore(): void {
  store.clear();
}

export function recordUsage(input: {
  tenantId: string;
  resourceType: UsageResourceType;
  quantity: number;
  unitCost: number;
  referenceType: string;
  referenceId: string;
  idempotencyKey: string;
}): UsageRecord {
  const key = `${input.tenantId}:${input.idempotencyKey}`;
  const existing = store.get(key);
  if (existing) return existing;
  const dup = [...store.values()].find(
    (r) => r.tenantId === input.tenantId && r.idempotencyKey === input.idempotencyKey,
  );
  if (dup) throw new IdempotencyConflictError(input.idempotencyKey);
  const row: UsageRecord = {
    id: randomUUID(),
    ...input,
    createdAt: new Date(),
  };
  store.set(key, row);
  return row;
}
