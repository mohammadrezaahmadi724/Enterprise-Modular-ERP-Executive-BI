import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';

const seqByTenantPrefix = new Map<string, number>();

const BASE_SEQ: Record<string, number> = {
  QT: 325,
  SO: 487,
  INV: 7,
  SR: 1,
};

export function nextSalesNumber(prefix: 'QT' | 'SO' | 'INV' | 'SR'): string {
  const tenantId = TenantContext.requireTenantId();
  const key = `${tenantId}:${prefix}`;
  const current = seqByTenantPrefix.get(key) ?? BASE_SEQ[prefix];
  const next = current + 1;
  seqByTenantPrefix.set(key, next);

  if (prefix === 'INV') {
    return `INV-140508-${String(next).padStart(3, '0')}`;
  }
  if (prefix === 'SR') {
    const token = randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase();
    return `SR-${token}-${String(1000 + next)}`;
  }
  return `${prefix}-${String(next).padStart(4, '0')}`;
}
