import { OPS_EVENTS } from '@repo/contracts';
import { getProjectionSlice, seedProjection } from './metric-query.js';
import { listWmsKardexLinesPrisma, persistWmsKardexLinePrisma, persistWmsSlicePrisma } from '../prisma/wms-projection.repository.js';

export type WmsKardexMovement = 'receipt' | 'issue' | 'reserve' | 'transfer' | 'adjustment';

export type WmsKardexEntry = {
  id: string;
  at: string;
  sku: string;
  warehouse: string;
  movement: WmsKardexMovement;
  qtyIn: number;
  qtyOut: number;
  reference: string;
  unitPriceRial?: number;
};

export type WmsKardexTotals = {
  ok: number;
  reservedBlocked: number;
  out: number;
};

export type WmsKardexWarehouseStat = {
  code: string;
  rows: number;
  ok: number;
  reserved: number;
  out: number;
};

export type WmsKardexReadModel = {
  entries: WmsKardexEntry[];
  totals: WmsKardexTotals;
  byWarehouse: WmsKardexWarehouseStat[];
  sources: string[];
};

const PROJECTION = 'projection_wms_kardex';
const ENTRIES_KEY = 'entries';
const MAX_ENTRIES = 100;

const entriesByTenant = new Map<string, WmsKardexEntry[]>();

export function resetWmsKardexReadModel(): void {
  entriesByTenant.clear();
}

function pushEntry(tenantId: string, entry: WmsKardexEntry): void {
  const list = entriesByTenant.get(tenantId) ?? [];
  list.unshift(entry);
  entriesByTenant.set(tenantId, list.slice(0, MAX_ENTRIES));
  seedProjection(tenantId, PROJECTION, ENTRIES_KEY, { count: list.length });
  void persistWmsKardexLinePrisma(tenantId, entry);
}

export function applyWmsStockDomainEvent(input: {
  tenantId: string;
  eventId: string;
  eventType: string;
  payload: Record<string, unknown>;
}): void {
  const { tenantId, eventId, eventType, payload } = input;
  const at = new Date().toISOString();

  if (eventType === OPS_EVENTS.STOCK_RESERVATION_CREATED) {
    const qty = Number(payload.qty ?? 0);
    pushEntry(tenantId, {
      id: eventId,
      at,
      sku: String(payload.sku ?? ''),
      warehouse: String(payload.warehouse ?? ''),
      movement: 'reserve',
      qtyIn: 0,
      qtyOut: qty,
      reference: String(payload.reference ?? payload.reservationId ?? ''),
    });
    return;
  }

  if (eventType === OPS_EVENTS.STOCK_RECEIPT_POSTED) {
    const lines = payload.lines as Array<{ sku: string; warehouse: string; quantity: number; unitPriceRial?: number }> | undefined;
    if (lines?.length) {
      for (const line of lines) {
        pushEntry(tenantId, {
          id: `${eventId}-${line.sku}-${line.warehouse}`,
          at,
          sku: line.sku,
          warehouse: line.warehouse,
          movement: payload.delta !== undefined ? 'adjustment' : 'receipt',
          qtyIn: Math.abs(Number(line.quantity ?? payload.delta ?? 0)),
          qtyOut: 0,
          reference: String(payload.docNo ?? payload.reason ?? '—'),
          unitPriceRial: line.unitPriceRial,
        });
      }
      return;
    }
    if (payload.sku && payload.warehouse) {
      const delta = Number(payload.delta ?? 0);
      pushEntry(tenantId, {
        id: eventId,
        at,
        sku: String(payload.sku),
        warehouse: String(payload.warehouse),
        movement: 'adjustment',
        qtyIn: delta > 0 ? delta : 0,
        qtyOut: delta < 0 ? Math.abs(delta) : 0,
        reference: String(payload.reason ?? 'adjustment'),
      });
    }
    return;
  }

  if (eventType === OPS_EVENTS.STOCK_ISSUE_POSTED) {
    const lines = payload.lines as Array<{ sku: string; warehouse: string; quantity: number }> | undefined;
    const ref = String(payload.orderRef ?? payload.docNo ?? '—');
    if (lines?.length) {
      for (const line of lines) {
        pushEntry(tenantId, {
          id: `${eventId}-${line.sku}`,
          at,
          sku: line.sku,
          warehouse: line.warehouse,
          movement: 'issue',
          qtyIn: 0,
          qtyOut: line.quantity,
          reference: ref,
        });
      }
    }
    return;
  }

  if (eventType === OPS_EVENTS.STOCK_RECONCILIATION_RUN) {
    pushEntry(tenantId, {
      id: eventId,
      at,
      sku: '—',
      warehouse: '—',
      movement: 'adjustment',
      qtyIn: 0,
      qtyOut: 0,
      reference: String(payload.sessionId ?? 'reconciliation'),
    });
  }
}

export function publishWmsKardexStockSnapshot(
  tenantId: string,
  rows: Array<{
    sku: string;
    warehouse: string;
    onHand: number;
    reserved: number;
    blocked: number;
    available: number;
    status: 'ok' | 'low' | 'out';
  }>,
): void {
  let ok = 0;
  let reservedBlocked = 0;
  let out = 0;
  const byWh = new Map<string, WmsKardexWarehouseStat>();

  for (const r of rows) {
    if (r.status === 'out') out++;
    else if (r.status === 'ok') ok++;
    else ok++;

    if (r.reserved > 0 || r.blocked > 0) reservedBlocked++;

    const wh = byWh.get(r.warehouse) ?? {
      code: r.warehouse,
      rows: 0,
      ok: 0,
      reserved: 0,
      out: 0,
    };
    wh.rows++;
    if (r.status === 'out') wh.out++;
    else if (r.reserved > 0 || r.blocked > 0) wh.reserved++;
    else wh.ok++;
    byWh.set(r.warehouse, wh);
  }

  const totals = { ok, reservedBlocked, out };
  seedProjection(tenantId, PROJECTION, 'totals', totals);
  void persistWmsSlicePrisma(tenantId, PROJECTION, 'totals', totals, `snap-${Date.now()}`, 1);
  for (const [code, stat] of byWh) {
    const slice = {
      rows: stat.rows,
      ok: stat.ok,
      reserved: stat.reserved,
      out: stat.out,
    };
    seedProjection(tenantId, PROJECTION, `wh:${code}`, slice);
    void persistWmsSlicePrisma(tenantId, PROJECTION, `wh:${code}`, slice, `wh-${code}`, 1);
  }
}

export async function hydrateWmsKardexFromPrisma(tenantId: string): Promise<void> {
  const fromDb = await listWmsKardexLinesPrisma(tenantId);
  if (!fromDb.length) return;
  const existing = entriesByTenant.get(tenantId) ?? [];
  const ids = new Set(existing.map((e) => e.id));
  const merged = [...existing, ...fromDb.filter((e) => !ids.has(e.id))].sort(
    (a, b) => b.at.localeCompare(a.at),
  );
  entriesByTenant.set(tenantId, merged.slice(0, MAX_ENTRIES));
}

export function readWmsKardex(tenantId: string): WmsKardexReadModel {
  const entries = [...(entriesByTenant.get(tenantId) ?? [])];
  return buildReadModel(tenantId, entries);
}

function buildReadModel(tenantId: string, entries: WmsKardexEntry[]): WmsKardexReadModel {
  const totalsRaw = getProjectionSlice(tenantId, PROJECTION, 'totals');
  const totals: WmsKardexTotals = {
    ok: totalsRaw?.ok ?? 0,
    reservedBlocked: totalsRaw?.reservedBlocked ?? 0,
    out: totalsRaw?.out ?? 0,
  };

  const byWarehouse: WmsKardexWarehouseStat[] = [];
  for (const [key, slice] of collectWarehouseSlices(tenantId)) {
    byWarehouse.push({
      code: key,
      rows: slice.rows ?? 0,
      ok: slice.ok ?? 0,
      reserved: slice.reserved ?? 0,
      out: slice.out ?? 0,
    });
  }

  return {
    entries,
    totals,
    byWarehouse,
    sources: ['projection_wms_kardex'],
  };
}

function collectWarehouseSlices(tenantId: string): Array<[string, Record<string, number>]> {
  const out: Array<[string, Record<string, number>]> = [];
  const seen = new Set<string>();
  for (const e of entriesByTenant.get(tenantId) ?? []) {
    if (e.warehouse && e.warehouse !== '—') seen.add(e.warehouse);
  }
  for (const code of ['WH-ESF', 'WH-MSH', 'WH-THR', 'WH-QAIM']) seen.add(code);
  for (const code of seen) {
    const slice = getProjectionSlice(tenantId, PROJECTION, `wh:${code}`);
    if (slice) out.push([code, slice]);
  }
  return out;
}
