import { describe, expect, it } from 'vitest';
import { createAlert, resetAlertStore } from '../src/alerts/alert.service.js';
import { subscribeAlerts } from '../src/realtime/socket-hub.js';

describe('Real-time Alert (Socket hub)', () => {
  it('منتشر کردن alert روی کانال tenant', () => {
    resetAlertStore();
    const received: string[] = [];
    const off = subscribeAlerts('t-live', (a) => received.push(a.id));
    createAlert({
      tenantId: 't-live',
      moduleCode: 'risk',
      category: 'critical',
      severity: 'critical',
      titleFa: 'بحرانی',
      bodyFa: 'تست',
      deduplicationKey: 'c1',
      deduplicationWindowSec: 60,
    });
    off();
    expect(received).toHaveLength(1);
  });
});
