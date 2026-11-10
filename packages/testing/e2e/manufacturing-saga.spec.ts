import { describe, it, expect, beforeEach } from 'vitest';
import { completeProduction, getFgStock, resetManufacturingSaga } from '@repo/db-erp-operations';

describe('Manufacturing saga — Wave 3', () => {
  beforeEach(() => resetManufacturingSaga());

  it('ProductionCompleted باید FG stock و COGS event داشته باشد', async () => {
    await completeProduction('11111111-1111-4111-8111-111111111111');
    expect(getFgStock()).toBe(20n);
  });
});
