import { describe, it, expect, beforeEach } from 'vitest';
import { confirmDelivery, getDistributionStock, resetDistributionSaga } from '@repo/db-erp-operations';

describe('Distribution saga — Wave 3', () => {
  beforeEach(() => resetDistributionSaga());

  it('DeliveryConfirmed باید موجودی کم و رویداد AR ثبت کند', async () => {
    await confirmDelivery('11111111-1111-4111-8111-111111111111');
    expect(getDistributionStock()).toBe(95n);
  });
});
