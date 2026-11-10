import { beforeEach, describe, expect, it } from 'vitest';
import { createAlert, resetAlertStore } from '../src/alerts/alert.service.js';
import { listNotificationLogs, resetNotificationLogs } from '../src/notifications/notification-log.service.js';
import { orchestrateNotifications, resetOrchestratorState } from '../src/notifications/orchestrator.js';

const TENANT = 't-idem';

describe('Notification idempotency — Wave 6', () => {
  beforeEach(() => {
    resetAlertStore();
    resetNotificationLogs();
    resetOrchestratorState();
  });

  it('ارسال تکراری → فقط ۱ NotificationLog per channel', async () => {
    const alert = createAlert({
      tenantId: TENANT,
      moduleCode: 'platform',
      category: 'billing',
      severity: 'info',
      titleFa: 'تست',
      bodyFa: 'بدنه',
      deduplicationKey: 'once',
      deduplicationWindowSec: 60,
    })!;
    const payload = {
      tenantId: TENANT,
      alert,
      templateKey: 'invoice_issued',
      recipients: [{ userId: 'u1' }],
      severity: 'info' as const,
      entityId: 'inv-1',
      templateVersion: 1,
      correlationId: 'corr-1',
    };
    await orchestrateNotifications(payload);
    await orchestrateNotifications(payload);
    const logs = listNotificationLogs(TENANT);
    const inApp = logs.filter((l) => l.channel === 'InApp' && l.templateKey === 'invoice_issued');
    expect(inApp).toHaveLength(1);
  });
});
