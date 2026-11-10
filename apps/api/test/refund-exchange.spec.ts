import { describe, it, expect } from 'vitest';
import { refundWithOriginalRate } from '@repo/db-platform';

describe('Refund exchange rate — Wave 2', () => {
  it('Refund باید از نرخ خرید اولیه استفاده کند نه نرخ فعلی', () => {
    const result = refundWithOriginalRate({
      paymentAmount: 50,
      paymentCurrency: 'EUR',
      paymentRate: 1.1,
      refundCurrency: 'EUR',
      currentRate: 1.25,
    });
    expect(result.usedRate).toBe(1.1);
    expect(result.ignoredCurrentRate).toBe(1.25);
    expect(result.refundAmount).toBe(50);
  });

  it('نرخ متفاوت نباید مبلغ اصلی را تغییر دهد', () => {
    const a = refundWithOriginalRate({
      paymentAmount: 1000,
      paymentCurrency: 'IRR',
      paymentRate: 1,
      refundCurrency: 'IRR',
      currentRate: 1.5,
    });
    expect(a.refundAmount).toBe(1000);
  });
});
