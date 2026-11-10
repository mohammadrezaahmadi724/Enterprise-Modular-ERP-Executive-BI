import { beforeEach, describe, expect, it } from 'vitest';
import { INTEGRATION_EVENTS } from '@repo/contracts';
import { listAlerts, resetAlertStore } from '../src/alerts/alert.service.js';
import { evaluateDomainEvent, registerAlertRule, resetAlertRules } from '../src/alerts/alert-evaluator.js';
import { resetNotificationLogs } from '../src/notifications/notification-log.service.js';
import { resetOrchestratorState } from '../src/notifications/orchestrator.js';

const TENANT = 't-dedup';

describe('Alert deduplication — خلأ ۱۸', () => {
  beforeEach(() => {
    resetAlertStore();
    resetAlertRules();
    resetNotificationLogs();
    resetOrchestratorState();
    registerAlertRule({
      id: 'r1',
      tenantId: TENANT,
      moduleCode: 'platform',
      eventType: INTEGRATION_EVENTS.BACKUP_FAILED,
      condition: {},
      severity: 'warning',
      templateKey: 'backup_failed',
      recipients: [{ userId: 'admin-1' }],
      deduplicationWindowSec: 300,
      channels: ['Email'],
      isActive: true,
    });
  });

  it('۱۰۰ رویداد یکسان در ۵ دقیقه → فقط ۱ Alert', () => {
    for (let i = 0; i < 100; i++) {
      evaluateDomainEvent({
        tenantId: TENANT,
        eventType: INTEGRATION_EVENTS.BACKUP_FAILED,
        payload: { entityId: 'backup-1' },
        correlationId: `corr-${i}`,
      });
    }
    expect(listAlerts(TENANT)).toHaveLength(1);
  });
});
