import { describe, expect, it } from 'vitest';
import { buildCloudCheckoutPath, wizardModuleIdsToErpCodes } from '../src/pricing/checkout-redirect';

describe('buildCloudCheckoutPath', () => {
  it('embeds seats, modules and estimateId', () => {
    const url = buildCloudCheckoutPath('http://127.0.0.1:3001', 'professional', {
      seats: 25,
      moduleCodes: wizardModuleIdsToErpCodes(['sales', 'finance']),
      estimateId: 'est-123',
      deliveryMode: 'cloud_saas',
    });
    expect(url).toContain('/checkout/plan/professional?');
    expect(url).toContain('seats=25');
    expect(url).toContain('modules=sales%2Cfinance');
    expect(url).toContain('estimateId=est-123');
    expect(url).toContain('delivery=cloud_saas');
  });
});
