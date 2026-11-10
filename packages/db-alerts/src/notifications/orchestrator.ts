import { createHash, randomUUID } from 'node:crypto';
import { ALERT_EVENTS } from '@repo/contracts';
import type { AlertRecord, AlertSeverity } from '../alerts/alert.service.js';
import { getPreferences, isQuietHours } from './preferences.service.js';
import { appendNotificationLog, type NotificationChannel } from './notification-log.service.js';
import { deliverInApp } from './channels/in-app.channel.js';
import { deliverEmail } from './channels/email.channel.js';
import { deliverSms } from './channels/sms.channel.js';
import { deliverWebPush } from './channels/webpush.channel.js';

const tenantWindow = new Map<string, number[]>();
const globalWindow: number[] = [];
const TENANT_LIMIT = 100;
const GLOBAL_LIMIT = 5000;
const WINDOW_MS = 60_000;

const outbox: unknown[] = [];

export function resetOrchestratorState(): void {
  tenantWindow.clear();
  globalWindow.length = 0;
  outbox.length = 0;
}

export function getNotificationOutbox() {
  return [...outbox];
}

function rateLimitOk(tenantId: string, now: number): boolean {
  const trim = (arr: number[]) => {
    while (arr.length && now - arr[0]! > WINDOW_MS) arr.shift();
  };
  const tArr = tenantWindow.get(tenantId) ?? [];
  trim(tArr);
  trim(globalWindow);
  if (tArr.length >= TENANT_LIMIT || globalWindow.length >= GLOBAL_LIMIT) return false;
  tArr.push(now);
  globalWindow.push(now);
  tenantWindow.set(tenantId, tArr);
  return true;
}

function buildIdempotencyKey(templateKey: string, userId: string, entityId: string, version: number): string {
  return createHash('sha256').update(`${templateKey}:${userId}:${entityId}:${version}`).digest('hex');
}

function selectChannels(severity: AlertSeverity, prefChannels: ReturnType<typeof getPreferences>['channels']): NotificationChannel[] {
  if (severity === 'critical') return ['InApp', 'Email', 'SMS', 'WebPush'];
  const out: NotificationChannel[] = [];
  if (prefChannels.InApp) out.push('InApp');
  if (prefChannels.Email) out.push('Email');
  if (prefChannels.SMS) out.push('SMS');
  if (prefChannels.WebPush) out.push('WebPush');
  return out.length ? out : ['InApp'];
}

export async function orchestrateNotifications(input: {
  tenantId: string;
  alert: AlertRecord;
  templateKey: string;
  recipients: { userId?: string; role?: string }[];
  severity: AlertSeverity;
  entityId: string;
  templateVersion: number;
  correlationId: string;
}): Promise<void> {
  const now = Date.now();
  if (!rateLimitOk(input.tenantId, now)) return;

  for (const recipient of input.recipients) {
    const userId = recipient.userId ?? 'broadcast';
    const pref = getPreferences(input.tenantId, userId);
    if (isQuietHours(pref) && input.severity !== 'critical') continue;

    const channels = selectChannels(input.severity, pref.channels);
    const idempotencyKey = buildIdempotencyKey(input.templateKey, userId, input.entityId, input.templateVersion);

    for (const channel of channels) {
      const logBase = {
        tenantId: input.tenantId,
        userId: recipient.userId,
        role: recipient.role,
        templateKey: input.templateKey,
        channel,
        recipient: userId,
        idempotencyKey: `${idempotencyKey}:${channel}`,
        correlationId: input.correlationId,
      };

      const existing = appendNotificationLog({ ...logBase, status: 'Queued' });
      if (existing.status !== 'Queued') continue;

      try {
        if (channel === 'InApp') {
          deliverInApp(input.tenantId, input.alert);
        } else if (channel === 'Email') {
          await deliverEmail({
            to: `${userId}@example.com`,
            templateKey: input.templateKey,
            version: input.templateVersion,
            vars: { amount: 1_250_000 },
          });
        } else if (channel === 'SMS') {
          await deliverSms({ to: '+98912', body: input.alert.titleFa });
        } else {
          await deliverWebPush({ endpoint: 'https://push', payload: input.alert.titleFa });
        }
        existing.status = 'Delivered';
        existing.sentAt = new Date();
        existing.deliveredAt = new Date();
        existing.providerMessageId = randomUUID();
        outbox.push({ type: ALERT_EVENTS.NOTIFICATION_SENT, payload: { ...logBase, channel } });
      } catch (e) {
        existing.status = 'Failed';
        existing.errorMessage = e instanceof Error ? e.message : 'send failed';
        outbox.push({ type: ALERT_EVENTS.NOTIFICATION_QUEUED, payload: { ...logBase, dlq: true } });
      }
    }
  }
}
