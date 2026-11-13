import { describe, expect, it, beforeEach } from 'vitest';
import {
  publishWmsBookInventoryValue,
  publishWmsGlInventoryDelta,
  readWmsValuationReconciliation,
  resetMetricQueryStore,
} from '../src/index';

const TENANT = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';

describe('projection_wms_valuation', () => {
  beforeEach(() => resetMetricQueryStore());

  it('compares book and gl slices', () => {
    publishWmsBookInventoryValue(TENANT, 5_000_000);
    publishWmsGlInventoryDelta(TENANT, 4_200_000);
    const recon = readWmsValuationReconciliation(TENANT);
    expect(recon.bookValueRial).toBe(5_000_000);
    expect(recon.glInventoryRial).toBe(4_200_000);
    expect(recon.varianceRial).toBe(800_000);
  });
});
