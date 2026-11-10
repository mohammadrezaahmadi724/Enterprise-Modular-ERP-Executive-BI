import { describe, it, expect, beforeEach } from 'vitest';
import { initSerialPattern, nextInvoiceNumber, peekLastNumber, resetSerialStore } from '../src/billing/invoice-serial';

describe('Invoice serial — Wave 2', () => {
  beforeEach(() => {
    resetSerialStore();
    initSerialPattern('t1', 'INV-{seq}', 'Never');
  });

  it('بدون پرش در شماره‌گذاری', () => {
    const a = nextInvoiceNumber('t1');
    const b = nextInvoiceNumber('t1');
    const c = nextInvoiceNumber('t1');
    expect(peekLastNumber('t1')).toBe(3);
    expect(a).toBe('INV-000001');
    expect(b).toBe('INV-000002');
    expect(c).toBe('INV-000003');
  });
});
