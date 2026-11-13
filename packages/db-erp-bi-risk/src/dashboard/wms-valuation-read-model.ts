import { getProjectionSlice, seedProjection } from './metric-query.js';
import { persistWmsSlicePrisma } from '../prisma/wms-projection.repository.js';

const PROJECTION = 'projection_wms_valuation';
const BOOK = 'book';
const GL = 'gl';

export type WmsValuationRecon = {
  bookValueRial: number;
  glInventoryRial: number;
  varianceRial: number;
  sources: string[];
};

export function resetWmsValuationReadModel(): void {
  /* slices cleared via resetMetricQueryStore */
}

export function publishWmsBookInventoryValue(tenantId: string, bookValueRial: number): void {
  const slice = { bookValueRial };
  seedProjection(tenantId, PROJECTION, BOOK, slice);
  void persistWmsSlicePrisma(tenantId, PROJECTION, BOOK, slice, `book-${Date.now()}`, 1);
}

export function publishWmsGlInventoryDelta(tenantId: string, deltaRial: number): void {
  const prev = getProjectionSlice(tenantId, PROJECTION, GL);
  const glInventoryRial = (prev?.glInventoryRial ?? 0) + deltaRial;
  const slice = { glInventoryRial };
  seedProjection(tenantId, PROJECTION, GL, slice);
  void persistWmsSlicePrisma(tenantId, PROJECTION, GL, slice, `gl-${Date.now()}`, 1);
}

export function readWmsValuationReconciliation(tenantId: string, bookOverride?: number): WmsValuationRecon {
  const bookSlice = getProjectionSlice(tenantId, PROJECTION, BOOK);
  const glSlice = getProjectionSlice(tenantId, PROJECTION, GL);
  const bookValueRial = bookOverride ?? bookSlice?.bookValueRial ?? 0;
  const glInventoryRial = glSlice?.glInventoryRial ?? 0;
  return {
    bookValueRial,
    glInventoryRial,
    varianceRial: bookValueRial - glInventoryRial,
    sources: ['projection_wms_valuation', 'projection_wms_kardex'],
  };
}
