import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ALERT_EVENTS } from '@repo/contracts';
import { emitAlertSocket } from '../realtime/socket-hub.js';

export type AlertSeverity = 'info' | 'warning' | 'critical';

export type AlertRecord = {
  id: string;
  tenantId: string;
  userId?: string;
  roleScope?: string;
  moduleCode: string;
  category: string;
  severity: AlertSeverity;
  titleFa: string;
  bodyFa: string;
  actionUrl?: string;
  sourceEntityType?: string;
  sourceEntityId?: string;
  deduplicationKey: string;
  seenAt?: Date;
  acknowledgedAt?: Date;
  dismissedAt?: Date;
  snoozedUntil?: Date;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
  createdAt: Date;
};

const alerts: AlertRecord[] = [];
const dedupIndex = new Map<string, Date>();
const outbox: unknown[] = [];

const STORE_FILE =
  process.env.ALERTS_STORE_FILE?.trim() ||
  path.join(process.cwd(), '.data', 'alerts-store.json');

let storeLoaded = false;

function reviveAlert(raw: AlertRecord): AlertRecord {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
    seenAt: raw.seenAt ? new Date(raw.seenAt) : undefined,
    acknowledgedAt: raw.acknowledgedAt ? new Date(raw.acknowledgedAt) : undefined,
    dismissedAt: raw.dismissedAt ? new Date(raw.dismissedAt) : undefined,
    snoozedUntil: raw.snoozedUntil ? new Date(raw.snoozedUntil) : undefined,
    expiresAt: raw.expiresAt ? new Date(raw.expiresAt) : undefined,
  };
}

function persistStore(): void {
  try {
    fs.mkdirSync(path.dirname(STORE_FILE), { recursive: true });
    fs.writeFileSync(STORE_FILE, JSON.stringify(alerts, null, 0), 'utf8');
  } catch {
    /* dev store optional */
  }
}

function ensureStoreLoaded(): void {
  if (storeLoaded) return;
  storeLoaded = true;
  try {
    if (!fs.existsSync(STORE_FILE)) return;
    const parsed = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8')) as AlertRecord[];
    for (const row of parsed) {
      const a = reviveAlert(row);
      alerts.push(a);
      dedupIndex.set(`${a.tenantId}:${a.deduplicationKey}`, a.createdAt);
    }
  } catch {
    /* ignore corrupt file */
  }
}

export function resetAlertStore(): void {
  alerts.length = 0;
  dedupIndex.clear();
  outbox.length = 0;
  persistStore();
}

export function getAlertOutbox() {
  return [...outbox];
}

export function createAlert(input: {
  tenantId: string;
  userId?: string;
  roleScope?: string;
  moduleCode: string;
  category: string;
  severity: AlertSeverity;
  titleFa: string;
  bodyFa: string;
  actionUrl?: string;
  sourceEntityType?: string;
  sourceEntityId?: string;
  deduplicationKey: string;
  deduplicationWindowSec: number;
  expiresAt?: Date;
  metadata?: Record<string, unknown>;
}): AlertRecord | null {
  if (!input.tenantId || !input.deduplicationKey || !input.severity) {
    throw new Error('Alert requires tenant_id, severity, deduplication_key');
  }
  const dk = `${input.tenantId}:${input.deduplicationKey}`;
  const prev = dedupIndex.get(dk);
  const now = Date.now();
  if (prev && now - prev.getTime() < input.deduplicationWindowSec * 1000) {
    return null;
  }
  dedupIndex.set(dk, new Date(now));
  const row: AlertRecord = {
    id: randomUUID(),
    tenantId: input.tenantId,
    userId: input.userId,
    roleScope: input.roleScope,
    moduleCode: input.moduleCode,
    category: input.category,
    severity: input.severity,
    titleFa: input.titleFa,
    bodyFa: input.bodyFa,
    actionUrl: input.actionUrl,
    sourceEntityType: input.sourceEntityType,
    sourceEntityId: input.sourceEntityId,
    deduplicationKey: input.deduplicationKey,
    expiresAt: input.expiresAt,
    metadata: input.metadata ?? {},
    createdAt: new Date(now),
  };
  alerts.push(row);
  outbox.push({ type: ALERT_EVENTS.ALERT_CREATED, payload: row });
  emitAlertSocket(input.tenantId, row);
  persistStore();
  return row;
}

export function listAlerts(tenantId: string, userId?: string): AlertRecord[] {
  ensureStoreLoaded();
  return alerts
    .filter((a) => a.tenantId === tenantId && (!userId || !a.userId || a.userId === userId))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function unseenCount(tenantId: string, userId?: string): number {
  return listAlerts(tenantId, userId).filter((a) => !a.seenAt && !a.dismissedAt).length;
}

export function markSeen(id: string): void {
  ensureStoreLoaded();
  const a = alerts.find((x) => x.id === id);
  if (a) {
    a.seenAt = new Date();
    persistStore();
  }
}

export function acknowledgeAlert(id: string): void {
  ensureStoreLoaded();
  const a = alerts.find((x) => x.id === id);
  if (!a) return;
  a.seenAt = a.seenAt ?? new Date();
  a.acknowledgedAt = new Date();
  persistStore();
}

export function dismissAlert(id: string): void {
  ensureStoreLoaded();
  const a = alerts.find((x) => x.id === id);
  if (a) {
    a.dismissedAt = new Date();
    persistStore();
  }
}

export function snoozeAlert(id: string, until: Date): void {
  const a = alerts.find((x) => x.id === id);
  if (a) a.snoozedUntil = until;
}
