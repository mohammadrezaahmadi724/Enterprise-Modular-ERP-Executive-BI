import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';

const seq = new Map<string, number>();

export function nextStkDoc(): string {
  const tenantId = TenantContext.requireTenantId();
  const key = `${tenantId}:STK`;
  const n = (seq.get(key) ?? 280) + 1;
  seq.set(key, n);
  const token = randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase();
  return `STK-${token}`;
}

export function nextReservationId(): string {
  const tenantId = TenantContext.requireTenantId();
  const key = `${tenantId}:RES`;
  const n = (seq.get(key) ?? 8098000) + 1;
  seq.set(key, n);
  return `R${n}`;
}

export function nextBatchNo(): string {
  const token = randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase();
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `BTH-${d}-${token}`;
}

export function nextStockCountId(): string {
  const tenantId = TenantContext.requireTenantId();
  const key = `${tenantId}:CNT`;
  const n = (seq.get(key) ?? 6) + 1;
  seq.set(key, n);
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const token = randomUUID().replace(/-/g, '').slice(0, 4).toUpperCase();
  return `CNT-${d}-${token}`;
}

export function nextReconId(): string {
  const tenantId = TenantContext.requireTenantId();
  const key = `${tenantId}:RCN`;
  const n = (seq.get(key) ?? 0) + 1;
  seq.set(key, n);
  return `RCN-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(n).padStart(4, '0')}`;
}
