import { describe, expect, it, beforeEach } from 'vitest';
import {
  archiveAuditLogsToColdStorage,
  pushAuditLog,
  resetRetentionStore,
  runRetentionJob,
  seedPiiRecord,
  setRetentionPolicy,
} from '../src/retention/retention.worker';

const TENANT = '11111111-1111-4111-8111-111111111111';

beforeEach(() => resetRetentionStore());

describe('Retention PII', () => {
  it('PII_HIGH پس از ۳۰ روز anonymize شود', () => {
    setRetentionPolicy(TENANT, 'contact', 30, 'Anonymize');
    const createdAt = new Date('2025-01-01T00:00:00Z');
    const r = seedPiiRecord({
      tenantId: TENANT,
      classification: 'PII_HIGH',
      fullName: 'علی رضایی',
      nationalId: '0012345678',
      phone: '09120000000',
      createdAt,
    });
    const affected = runRetentionJob(TENANT, new Date('2025-02-05T00:00:00Z'));
    expect(affected).toBe(1);
    expect(r.fullName).toMatch(/^anon-/);
    expect(r.nationalId).not.toBe('0012345678');
    expect(r.anonymizedAt).toBeTruthy();
  });

  it('audit قدیمی به cold storage منتقل شود', () => {
    pushAuditLog({
      id: 'a1',
      tenantId: TENANT,
      at: '2024-01-01T00:00:00Z',
      action: 'READ_CONTACT',
    });
    const archived = archiveAuditLogsToColdStorage(TENANT, new Date('2025-06-01T00:00:00Z'));
    expect(archived).toBe(1);
  });
});
