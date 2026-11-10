import { describe, expect, it, beforeEach } from 'vitest';
import {
  calculateDepreciation,
  postDepreciation,
  registerAsset,
  resetDepreciationStore,
  getDepreciationOutbox,
} from '../src/fixed-assets/depreciation.service';
import { ASSET_EVENTS } from '@repo/contracts';

beforeEach(() => resetDepreciationStore());

describe('Depreciation calculation', () => {
  it('StraightLine / DecliningBalance / UnitsOfProduction', () => {
    registerAsset({
      id: 'a1',
      acquisitionCost: 120_000_000,
      salvageValue: 0,
      usefulLifeYears: 5,
      method: 'StraightLine',
      accumulatedDepreciation: 0,
    });
    const sl = calculateDepreciation('a1');
    expect(sl.amount).toBeCloseTo(2_000_000, 0);

    registerAsset({
      id: 'a2',
      acquisitionCost: 100_000_000,
      salvageValue: 10_000_000,
      usefulLifeYears: 10,
      method: 'DecliningBalance',
      accumulatedDepreciation: 0,
    });
    const db = calculateDepreciation('a2');
    expect(db.amount).toBeCloseTo(20_000_000, 0);

    registerAsset({
      id: 'a3',
      acquisitionCost: 50_000_000,
      salvageValue: 5_000_000,
      usefulLifeYears: 5,
      method: 'UnitsOfProduction',
      accumulatedDepreciation: 0,
      totalUnitsOfProduction: 1000,
    });
    const uop = calculateDepreciation('a3', 100);
    expect(uop.amount).toBeCloseTo(4_500_000, 0);

    postDepreciation('a1');
    expect(getDepreciationOutbox().some((e) => e.type === ASSET_EVENTS.DEPRECIATION_POSTED)).toBe(true);
  });
});
