import { randomUUID } from 'node:crypto';
import { ASSET_EVENTS, FINANCE_EVENTS } from '@repo/contracts';

export type DepreciationMethod = 'StraightLine' | 'DecliningBalance' | 'UnitsOfProduction';

export type FixedAssetRecord = {
  id: string;
  acquisitionCost: number;
  salvageValue: number;
  usefulLifeYears: number;
  method: DepreciationMethod;
  accumulatedDepreciation: number;
  totalUnitsOfProduction?: number;
};

const assets = new Map<string, FixedAssetRecord>();
const outbox: Array<{ type: string; payload: unknown }> = [];

export function resetDepreciationStore(): void {
  assets.clear();
  outbox.length = 0;
}

export function getDepreciationOutbox() {
  return [...outbox];
}

export function registerAsset(asset: FixedAssetRecord): void {
  assets.set(asset.id, { ...asset, accumulatedDepreciation: asset.accumulatedDepreciation ?? 0 });
}

export function calculateDepreciation(
  assetId: string,
  producedUnits?: number,
  decliningRate = 0.2,
): { amount: number; accumulated: number } {
  const asset = assets.get(assetId);
  if (!asset) throw new Error('asset not found');
  const base = asset.acquisitionCost - asset.salvageValue;
  let amount = 0;
  switch (asset.method) {
    case 'StraightLine':
      amount = base / asset.usefulLifeYears / 12;
      break;
    case 'DecliningBalance':
      amount = (asset.acquisitionCost - asset.accumulatedDepreciation) * decliningRate;
      break;
    case 'UnitsOfProduction':
      if (!asset.totalUnitsOfProduction || producedUnits == null) throw new Error('units required');
      amount = (base / asset.totalUnitsOfProduction) * producedUnits;
      break;
    default:
      amount = 0;
  }
  const accumulated = asset.accumulatedDepreciation + amount;
  return { amount, accumulated };
}

export function postDepreciation(assetId: string, producedUnits?: number): { scheduleId: string; amount: number } {
  const asset = assets.get(assetId)!;
  const { amount, accumulated } = calculateDepreciation(assetId, producedUnits);
  asset.accumulatedDepreciation = accumulated;
  const scheduleId = randomUUID();
  outbox.push({ type: ASSET_EVENTS.DEPRECIATION_POSTED, payload: { assetId, scheduleId, amount } });
  outbox.push({ type: FINANCE_EVENTS.GL_ENTRY_POSTED, payload: { scheduleId, amount } });
  return { scheduleId, amount };
}
