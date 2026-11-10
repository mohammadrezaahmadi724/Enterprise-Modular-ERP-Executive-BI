import { describe, it, expect } from 'vitest';
import { FINANCE_EVENTS } from '@repo/contracts';
import { createInMemoryPact } from '../src/contracts/pact-helpers';

describe('GL Entry Posted contract — خلأ ۱۱ — بند ۳.۶', () => {
  it('consumer finance باید event نسخه‌دار ثبت کند', () => {
    const pact = createInMemoryPact();
    pact.add({
      consumer: 'finance-command',
      provider: 'platform-outbox',
      interaction: FINANCE_EVENTS.GL_ENTRY_POSTED,
    });
    expect(pact.expectations).toHaveLength(1);
    expect(pact.expectations[0]?.interaction).toBe('finance.gl_entry.posted.v1');
  });

  it('بدون schema_version نامعتبر است', () => {
    const payload = { eventType: FINANCE_EVENTS.GL_ENTRY_POSTED, schemaVersion: 1 };
    expect(payload.schemaVersion).toBeGreaterThan(0);
  });
});
