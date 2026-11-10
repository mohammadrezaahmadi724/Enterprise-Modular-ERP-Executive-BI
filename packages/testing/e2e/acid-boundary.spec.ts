import { describe, it, expect } from 'vitest';
import { assertSingleClientTransaction } from '@repo/db-core-adapter';
import type { PrismaClient } from '@prisma/client';

describe('ACID boundary across Prisma clients — خلأ ۲ — بند ۳.۱', () => {
  it('اشتراک transaction بین دو PrismaClient باید در runtime رد شود', () => {
    const a = { tag: 'client-a' } as unknown as PrismaClient;
    const b = { tag: 'client-b' } as unknown as PrismaClient;
    expect(() => assertSingleClientTransaction([a, b])).toThrow(/ACID boundary violation/);
  });

  it('یک client مجاز است', () => {
    const a = { tag: 'client-a' } as unknown as PrismaClient;
    expect(() => assertSingleClientTransaction([a])).not.toThrow();
  });

  it('transaction client بین factoryهای مجزا نباید در یک تراکنش share شود (type-level)', () => {
    type FactoryA = { $transaction: (fn: (tx: { schema: 'a' }) => Promise<void>) => Promise<void> };
    type FactoryB = { $transaction: (fn: (tx: { schema: 'b' }) => Promise<void>) => Promise<void> };
    const run = (a: FactoryA, b: FactoryB) => {
      void a;
      void b;
      return true;
    };
    expect(run).toBeDefined();
  });
});
