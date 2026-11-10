import { describe, it, expect } from 'vitest';
import { TenantContext } from '@repo/domain';
import { runSaga, type SagaStep } from '@repo/module-sdk';

describe('Saga compensation — خلأ ۴ — بند ۴.۳', () => {
  const ctxBase = {
    tenantId: '11111111-1111-4111-8111-111111111111',
    userId: 'u1',
    correlationId: 'saga-1',
    traceId: 't1',
    isSuperAdmin: false,
  };

  it('شکست PostARInvoice پس از ReserveStock باید ReleaseStock را اجرا کند', async () => {
    let reserved = false;
    let released = false;

    const steps: SagaStep[] = [
      {
        name: 'ReserveStock',
        execute: async () => {
          reserved = true;
        },
        compensate: async () => {
          released = true;
          reserved = false;
        },
      },
      {
        name: 'PostARInvoice',
        execute: async () => {
          throw new Error('AR post failed');
        },
        compensate: async () => {},
      },
    ];

    await TenantContext.runAsync(ctxBase, async () => {
      await expect(runSaga(steps)).rejects.toThrow('AR post failed');
    });

    expect(reserved).toBe(false);
    expect(released).toBe(true);
  });

  it('Saga موفق نباید compensate اجرا کند', async () => {
    let compensated = false;
    const steps: SagaStep[] = [
      {
        name: 'Step1',
        execute: async () => {},
        compensate: async () => {
          compensated = true;
        },
      },
    ];
    await TenantContext.runAsync(ctxBase, async () => {
      await runSaga(steps);
    });
    expect(compensated).toBe(false);
  });
});
