import { randomUUID } from 'node:crypto';

export type NotificationChannel = 'InApp' | 'Email' | 'SMS' | 'WebPush';
export type NotificationStatus = 'Queued' | 'Sent' | 'Delivered' | 'Failed' | 'Bounced';

export type NotificationLogRecord = {
  id: string;
  tenantId: string;
  userId?: string;
  role?: string;
  templateKey: string;
  channel: NotificationChannel;
  recipient: string;
  status: NotificationStatus;
  providerMessageId?: string;
  errorMessage?: string;
  idempotencyKey: string;
  correlationId: string;
  sentAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
};

const logs: NotificationLogRecord[] = [];
const idempotency = new Map<string, NotificationLogRecord>();

export function resetNotificationLogs(): void {
  logs.length = 0;
  idempotency.clear();
}

export function appendNotificationLog(
  input: Omit<NotificationLogRecord, 'id' | 'createdAt'>,
): NotificationLogRecord {
  const existing = idempotency.get(`${input.tenantId}:${input.idempotencyKey}`);
  if (existing) return existing;
  const row: NotificationLogRecord = {
    id: randomUUID(),
    createdAt: new Date(),
    ...input,
  };
  logs.push(row);
  idempotency.set(`${input.tenantId}:${input.idempotencyKey}`, row);
  return row;
}

export function listNotificationLogs(tenantId: string): NotificationLogRecord[] {
  return logs.filter((l) => l.tenantId === tenantId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
