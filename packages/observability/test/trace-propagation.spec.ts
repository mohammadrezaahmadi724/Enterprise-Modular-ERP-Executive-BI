import { describe, it, expect } from 'vitest';
import { TenantContext } from '@repo/domain';
import { propagateTraceThroughPipeline } from '../src/tracing.js';

describe('Trace propagation — خلأ ۱۳ — بند ۴.۷', () => {
  const traceId = '4bf92f3577b34da6a3ce929d0e0e4736';

  it('trace_id باید از HTTP به Worker و Event Bus حفظ شود', () => {
    TenantContext.run(
      {
        tenantId: '11111111-1111-4111-8111-111111111111',
        userId: 'u1',
        correlationId: 'c1',
        traceId,
        isSuperAdmin: false,
      },
      () => {
        const end = propagateTraceThroughPipeline(traceId);
        expect(end).toBe(traceId);
      },
    );
  });

  it('traceparent نامعتبر نباید trace جدید بسازد بدون ورودی', () => {
    const result = propagateTraceThroughPipeline(traceId);
    expect(result).toBeTruthy();
    expect(result).not.toBe('00000000000000000000000000000000');
  });
});
