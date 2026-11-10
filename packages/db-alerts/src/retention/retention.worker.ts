import { createHash, randomUUID } from 'node:crypto';
import { mkdirSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type PiiRecord = {
  id: string;
  tenantId: string;
  classification: 'PII_HIGH' | 'PII_MEDIUM' | 'PUBLIC';
  fullName?: string;
  nationalId?: string;
  phone?: string;
  createdAt: Date;
  anonymizedAt?: Date;
};

const records = new Map<string, PiiRecord>();
const policies = new Map<string, { entityType: string; retentionDays: number; action: 'Anonymize' | 'Delete' | 'Archive' }>();

export function resetRetentionStore(): void {
  records.clear();
  policies.clear();
}

export function setRetentionPolicy(tenantId: string, entityType: string, retentionDays: number, action: 'Anonymize' | 'Delete' | 'Archive'): void {
  policies.set(`${tenantId}:${entityType}`, { entityType, retentionDays, action });
}

export function seedPiiRecord(record: Omit<PiiRecord, 'id'> & { id?: string }): PiiRecord {
  const r: PiiRecord = { id: record.id ?? randomUUID(), ...record };
  records.set(r.id, r);
  return r;
}

function hashPii(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16);
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (24 * 3600 * 1000));
}

/** Right to be Forgotten + PII_HIGH/MEDIUM under 30 days policy */
export function runRetentionJob(tenantId: string, now = new Date()): number {
  let affected = 0;
  const piiPolicy = policies.get(`${tenantId}:contact`) ?? { entityType: 'contact', retentionDays: 30, action: 'Anonymize' as const };
  for (const r of records.values()) {
    if (r.tenantId !== tenantId) continue;
    if (r.classification !== 'PII_HIGH' && r.classification !== 'PII_MEDIUM') continue;
    if (r.anonymizedAt) continue;
    if (daysBetween(r.createdAt, now) < piiPolicy.retentionDays) continue;
    if (piiPolicy.action === 'Anonymize') {
      r.fullName = `anon-${hashPii(r.id)}`;
      r.nationalId = hashPii(r.nationalId ?? r.id);
      r.phone = hashPii(r.phone ?? r.id);
      r.anonymizedAt = now;
      affected += 1;
    }
  }
  archiveAuditLogsToColdStorage(tenantId, now);
  downsampleMetricSnapshots(tenantId, now);
  return affected;
}

type AuditArchiveRow = { id: string; tenantId: string; at: string; action: string };

const auditBuffer: AuditArchiveRow[] = [];

export function pushAuditLog(row: AuditArchiveRow): void {
  auditBuffer.push(row);
}

export function archiveAuditLogsToColdStorage(tenantId: string, now: Date): number {
  const olderThan = new Date(now);
  olderThan.setDate(olderThan.getDate() - 90);
  const toArchive = auditBuffer.filter((r) => r.tenantId === tenantId && new Date(r.at) < olderThan);
  if (toArchive.length === 0) return 0;
  const path = process.env.ERP_COLD_STORAGE_PATH ?? join(process.cwd(), '.data', 'cold-storage', `${tenantId}-audit.jsonl`);
  mkdirSync(dirname(path), { recursive: true });
  for (const row of toArchive) {
    appendFileSync(path, `${JSON.stringify(row)}\n`, 'utf8');
  }
  auditBuffer.splice(0, auditBuffer.length, ...auditBuffer.filter((r) => !toArchive.includes(r)));
  return toArchive.length;
}

type MetricPoint = { tenantId: string; metricCode: string; day: string; value: number };

const metricDaily: MetricPoint[] = [];

export function seedDailyMetric(point: MetricPoint): void {
  metricDaily.push(point);
}

export function downsampleMetricSnapshots(tenantId: string, now: Date): { weekly: number; monthly: number } {
  const rows = metricDaily.filter((m) => m.tenantId === tenantId);
  const weekKey = now.toISOString().slice(0, 10);
  const weekly = rows.filter((r) => r.day < weekKey).length;
  const monthly = Math.floor(weekly / 4);
  return { weekly, monthly };
}
