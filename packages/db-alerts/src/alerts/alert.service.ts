import { randomUUID } from 'node:crypto';
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

export function resetAlertStore(): void {
  alerts.length = 0;
  dedupIndex.clear();
  outbox.length = 0;
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
  return row;
}

export function listAlerts(tenantId: string, userId?: string): AlertRecord[] {
  return alerts
    .filter((a) => a.tenantId === tenantId && (!userId || !a.userId || a.userId === userId))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function unseenCount(tenantId: string, userId?: string): number {
  return listAlerts(tenantId, userId).filter((a) => !a.seenAt && !a.dismissedAt).length;
}

export function markSeen(id: string): void {
  const a = alerts.find((x) => x.id === id);
  if (a) a.seenAt = new Date();
}

export function acknowledgeAlert(id: string): void {
  const a = alerts.find((x) => x.id === id);
  if (!a) return;
  a.seenAt = a.seenAt ?? new Date();
  a.acknowledgedAt = new Date();
}

export function dismissAlert(id: string): void {
  const a = alerts.find((x) => x.id === id);
  if (a) a.dismissedAt = new Date();
}

export function snoozeAlert(id: string, until: Date): void {
  const a = alerts.find((x) => x.id === id);
  if (a) a.snoozedUntil = until;
}
