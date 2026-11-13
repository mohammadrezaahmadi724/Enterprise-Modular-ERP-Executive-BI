import { randomUUID } from 'node:crypto';
import { alreadyLoaded, flushDurableWrites, rememberLoaded, trackDurableWrite } from '../../persistence/request-scope';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OPS_EVENTS } from '@repo/contracts';
import { evaluateDomainEvent, ensureWmsLotAlertRules } from '@repo/db-alerts';
import { TenantContext } from '@repo/domain';
import {
  applyStockIssue,
  applyStockReceipt,
  reserveStockWithLock,
  setInventoryBalance,
} from '@repo/db-erp-operations';
import {
  applyWmsStockDomainEvent,
  hydrateWmsKardexFromPrisma,
  hydrateWmsTrackingFromPrisma,
  listSerials as listSerialsProjection,
  listTrackingContracts as listTrackingContractsProjection,
  publishWmsKardexStockSnapshot,
  publishWmsExpiryKpi,
  publishWmsOverviewProjection,
  publishWmsBookInventoryValue,
  readWmsKardex,
  readWmsTrackingMeta,
  readWmsValuationReconciliation,
  registerSerials,
  getTrackingContract,
  requiresBatchCoverage,
  seedTrackingFromCatalog,
} from '@repo/db-erp-bi-risk';
import {
  crmPersistenceEnabled,
  listInventoryLotsPrisma,
  loadWmsStateFromPrisma,
  recordStockMovementPrisma,
  recordWmsLotTrace,
  upsertInventoryBalancePrisma,
  upsertInventoryLotPrisma,
  upsertWmsReservationPrisma,
  upsertWmsStockDocumentPrisma,
  wmsPersistenceEnabled,
  type InventoryLotRow,
} from '@repo/db-erp-operations';
import {
  adjustmentWorkflowEntityId,
  assertWmsAdjustmentApproved,
  assertWmsStocktakingApproved,
  wmsAdjustmentQtyThreshold,
  wmsStocktakingVarianceTomanThreshold,
} from '../../bridges/wms-workflow.bridge';
import { recordDomainEvent } from '../../outbox/record-domain-event';
import { postStockCountVarianceGl, postWmsIssueCogsGl, postWmsReceiptGl } from '../../bridges/wms-gl.bridge';
import type {
  CreateAdjustmentBody,
  CreateReservationBody,
  CreateStockDocBody,
  ReconciliationSessionDto,
  CreateBatchBody,
  RegisterSerialsBody,
  StocktakingSessionDto,
  WmsBatchDto,
  UpdateStocktakingLineBody,
  WmsKardexDto,
  WmsValuationReconDto,
  WmsSerialDto,
  WmsTrackingContractDto,
  WmsMovementDto,
  WmsFefoPickDto,
  WmsOverviewDto,
  WmsReservationDto,
  WmsStockDocDto,
  WmsStockRowDto,
} from './wms.dto';
import type { CreateStocktakingBody } from './wms.dto';
import { nextBatchNo, nextReconId, nextReservationId, nextStkDoc, nextStockCountId } from './wms-numbering';

const PRODUCT_NAMES: Record<string, string> = {
  'PRD-1016': 'نمک یددار تصفیه‌شده',
  'PRD-CHAY': 'چای سیاه ممتاز',
  'PRD-BRN3': 'برنج هاشمی طارم',
  'PRD-1001': 'روغن آفتابگردان ۱۰ لیتری',
  'PRD-2044': 'رب گوجه صنعتی',
};

const WH_LABEL: Record<string, string> = {
  'WH-ESF': 'انبار اصفهان',
  'WH-MSH': 'انبار مشهد',
  'WH-THR': 'انبار مرکزی تهران',
};

type StockCell = { sku: string; warehouse: string; onHand: number; reserved: number; blocked: number };

const stockByTenant = new Map<string, Map<string, StockCell>>();
const reservationsByTenant = new Map<string, Map<string, WmsReservationDto>>();
const receiptsByTenant = new Map<string, Map<string, WmsStockDocDto>>();
const issuesByTenant = new Map<string, Map<string, WmsStockDocDto>>();
const transfersByTenant = new Map<string, Map<string, WmsStockDocDto>>();
const movementsByTenant = new Map<string, WmsMovementDto[]>();
const reconByTenant = new Map<string, ReconciliationSessionDto[]>();
const stocktakingByTenant = new Map<string, Map<string, StocktakingSessionDto>>();
const batchesByTenant = new Map<string, Map<string, WmsBatchDto>>();
const batchHydrateByTenant = new Map<string, Promise<void>>();
const wmsHydrateByTenant = new Map<string, Promise<void>>();

function cellKey(sku: string, warehouse: string) {
  return `${sku}:${warehouse}`;
}

function stockMap(): Map<string, StockCell> {
  const tenantId = TenantContext.requireTenantId();
  let m = stockByTenant.get(tenantId);
  if (!m) {
    m = new Map();
    const seeds: Array<[string, string, number, number, number]> = [
      ['PRD-1016', 'WH-ESF', 4077, 0, 0],
      ['PRD-CHAY', 'WH-MSH', 2100, 12, 0],
      ['PRD-BRN3', 'WH-THR', 890, 0, 0],
      ['PRD-1001', 'WH-ESF', 1200, 56, 0],
      ['PRD-2044', 'WH-THR', 450, 0, 8],
    ];
    for (let i = 0; i < 95; i++) {
      const skus = Object.keys(PRODUCT_NAMES);
      const sku = skus[i % skus.length]!;
      const wh = ['WH-ESF', 'WH-MSH', 'WH-THR'][i % 3]!;
      const onHand = 200 + (i % 20) * 180;
      const reserved = i % 9 === 0 ? 10 + (i % 5) : 0;
      const blocked = i % 11 === 0 ? 4 : 0;
      seeds.push([sku, wh, onHand, reserved, blocked]);
    }
    for (const [sku, wh, onHand, reserved, blocked] of seeds) {
      const key = cellKey(sku, wh);
      if (!m.has(key)) {
        m.set(key, { sku, warehouse: wh, onHand, reserved, blocked });
        setInventoryBalance(key, BigInt(onHand), BigInt(reserved));
      }
    }
    stockByTenant.set(tenantId, m);

    const resStore = new Map<string, WmsReservationDto>([
      [
        'R8098371',
        {
          id: 'R8098371',
          sku: 'PRD-1016',
          itemName: PRODUCT_NAMES['PRD-1016']!,
          warehouse: 'WH-ESF',
          warehouseLabel: WH_LABEL['WH-ESF']!,
          reference: 'SO-0470',
          qty: 120,
          expiry: null,
          status: 'active',
        },
      ],
    ]);
    reservationsByTenant.set(tenantId, resStore);

    receiptsByTenant.set(
      tenantId,
      new Map([
        [
          'STK-A366C4852656',
          {
            docNo: 'STK-A366C4852656',
            date: '۱۴۰۵/۰۸/۱۲',
            party: '—',
            orderRef: 'PO-۰۰۱۲۷۴',
            source: 'سیستم',
            status: 'posted',
            lines: [{ sku: 'PRD-1016', warehouse: 'WH-ESF', quantity: 100, unitPriceRial: 1_200_000 }],
          },
        ],
      ]),
    );

    issuesByTenant.set(
      tenantId,
      new Map([
        [
          'STK-0304617E4F7C',
          {
            docNo: 'STK-0304617E4F7C',
            date: '۱۴۰۵/۰۹/۰۵',
            party: '—',
            orderRef: 'SO-0475',
            source: 'تحویل',
            status: 'posted',
            lines: [{ sku: 'PRD-CHAY', warehouse: 'WH-MSH', quantity: 5 }],
          },
        ],
      ]),
    );

    transfersByTenant.set(tenantId, new Map());
    movementsByTenant.set(tenantId, [
      { id: 'STK-F34F8A12C901', type: 'issue', date: '۱۴۰۵/۰۸/۱۲', status: 'posted' },
      { id: 'STK-A366C4852656', type: 'receipt', date: '۱۴۰۵/۰۸/۱۲', status: 'posted' },
    ]);
    reconByTenant.set(tenantId, []);

    stocktakingByTenant.set(
      tenantId,
      new Map([
        [
          'CNT-20261108-06F8',
          {
            id: 'CNT-20261108-06F8',
            warehouse: 'WH-THR',
            warehouseLabel: WH_LABEL['WH-THR']!,
            countDate: '۱۴۰۵/۰۷/۱۲',
            status: 'reconciled',
            totalLines: 65,
            varianceLines: 6,
            varianceToman: -813_000,
          },
        ],
        [
          'CNT-20261108-0A2B',
          {
            id: 'CNT-20261108-0A2B',
            warehouse: 'WH-QAIM',
            warehouseLabel: 'انبار آزمون ایمپورت',
            countDate: '۱۴۰۵/۰۷/۳۰',
            status: 'draft',
            totalLines: 0,
            varianceLines: 0,
            varianceToman: 0,
          },
        ],
      ]),
    );
  }
  return m;
}

async function emitWmsStockEvent(
  eventType: string,
  aggregateId: string,
  payload: Record<string, unknown>,
): Promise<void> {
  const tenantId = TenantContext.requireTenantId();
  const full = { ...payload, tenantId };
  await recordDomainEvent({ eventType, aggregateId, payload: full });
  applyWmsStockDomainEvent({ tenantId, eventId: aggregateId, eventType, payload: full });
}

function toRow(cell: StockCell): WmsStockRowDto {
  const available = cell.onHand - cell.reserved - cell.blocked;
  let status: WmsStockRowDto['status'] = 'ok';
  if (available <= 0) status = 'out';
  else if (available < 120) status = 'low';
  return {
    sku: cell.sku,
    name: PRODUCT_NAMES[cell.sku] ?? cell.sku,
    warehouse: cell.warehouse,
    onHand: cell.onHand,
    reserved: cell.reserved,
    blocked: cell.blocked,
    available,
    status,
  };
}

function syncSaga(cell: StockCell) {
  setInventoryBalance(cellKey(cell.sku, cell.warehouse), BigInt(cell.onHand), BigInt(cell.reserved));
  if (!wmsPersistenceEnabled()) return;
  trackDurableWrite(
    upsertInventoryBalancePrisma(cell.sku, cell.warehouse, BigInt(cell.onHand), BigInt(cell.reserved)),
  );
}

function jalaliPlaceholder(): string {
  return '۱۴۰۵/۰۸/۲۰';
}

function assertLines(lines: CreateStockDocBody['lines']) {
  if (!lines?.length) throw new BadRequestException('At least one line is required');
  for (const l of lines) {
    if (!l.sku?.trim() || !l.warehouse?.trim()) throw new BadRequestException('sku and warehouse required per line');
    if (!Number.isFinite(l.quantity) || l.quantity <= 0) throw new BadRequestException('quantity must be positive');
  }
}

function getCell(sku: string, warehouse: string): StockCell {
  const m = stockMap();
  const key = cellKey(sku, warehouse);
  let cell = m.get(key);
  if (!cell) {
    cell = { sku, warehouse, onHand: 0, reserved: 0, blocked: 0 };
    m.set(key, cell);
    syncSaga(cell);
  }
  return cell;
}

function availableQty(cell: StockCell): number {
  return cell.onHand - cell.reserved - cell.blocked;
}

export function wmsSource(): string {
  if (wmsPersistenceEnabled()) {
    const lots = crmPersistenceEnabled() ? '+ inventory_lots' : '';
    return `wms_postgresql_rls${lots} + projection_wms_overview + projection_wms_kardex`;
  }
  return 'in-memory + operations.inventory + projection_wms_overview + projection_wms_kardex';
}

/** @internal vitest isolation */
export function resetWmsStoresForTest(): void {
  stockByTenant.clear();
  reservationsByTenant.clear();
  receiptsByTenant.clear();
  issuesByTenant.clear();
  transfersByTenant.clear();
  movementsByTenant.clear();
  reconByTenant.clear();
  stocktakingByTenant.clear();
  batchesByTenant.clear();
  batchHydrateByTenant.clear();
  wmsHydrateByTenant.clear();
}

async function ensureWmsHydrated(): Promise<void> {
  if (!wmsPersistenceEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  const scopeKey = `wms:${tenantId}`;
  if (alreadyLoaded(scopeKey)) return;
  stockByTenant.set(tenantId, new Map());
  receiptsByTenant.set(tenantId, new Map());
  issuesByTenant.set(tenantId, new Map());
  transfersByTenant.set(tenantId, new Map());
  reservationsByTenant.set(tenantId, new Map());
  stockMap();
  let pending = wmsHydrateByTenant.get(tenantId);
  if (!pending) {
    pending = loadWmsStateFromPrisma({
      applyBalance: (sku, warehouse, onHand, reserved) => {
        const m = stockByTenant.get(tenantId);
        if (!m) return;
        const key = cellKey(sku, warehouse);
        const cell = m.get(key) ?? { sku, warehouse, onHand: 0, reserved: 0, blocked: 0 };
        cell.onHand = onHand;
        cell.reserved = reserved;
        m.set(key, cell);
        setInventoryBalance(key, BigInt(onHand), BigInt(reserved));
      },
      putReceipt: (body) => {
        const doc = body as unknown as WmsStockDocDto;
        let store = receiptsByTenant.get(tenantId);
        if (!store) {
          store = new Map();
          receiptsByTenant.set(tenantId, store);
        }
        store.set(doc.docNo, doc);
      },
      putIssue: (body) => {
        const doc = body as unknown as WmsStockDocDto;
        let store = issuesByTenant.get(tenantId);
        if (!store) {
          store = new Map();
          issuesByTenant.set(tenantId, store);
        }
        store.set(doc.docNo, doc);
      },
      putTransfer: (body) => {
        const doc = body as unknown as WmsStockDocDto;
        let store = transfersByTenant.get(tenantId);
        if (!store) {
          store = new Map();
          transfersByTenant.set(tenantId, store);
        }
        store.set(doc.docNo, doc);
      },
      putReservation: (body) => {
        const memo = body as unknown as WmsReservationDto;
        let store = reservationsByTenant.get(tenantId);
        if (!store) {
          store = new Map();
          reservationsByTenant.set(tenantId, store);
        }
        store.set(memo.id, memo);
      },
    }).then(() => undefined);
    wmsHydrateByTenant.set(tenantId, pending);
  }
  await pending;
  wmsHydrateByTenant.delete(tenantId);
  rememberLoaded(scopeKey);
}

async function persistStockDoc(kind: 'receipt' | 'issue' | 'transfer', doc: WmsStockDocDto): Promise<void> {
  if (!wmsPersistenceEnabled()) return;
  await upsertWmsStockDocumentPrisma({
    docNo: doc.docNo,
    kind,
    body: doc as unknown as Record<string, unknown>,
  });
  await flushDurableWrites();
}

async function persistReservationRecord(memo: WmsReservationDto): Promise<void> {
  if (!wmsPersistenceEnabled()) return;
  await upsertWmsReservationPrisma({
    id: memo.id,
    body: memo as unknown as Record<string, unknown>,
    status: memo.status,
  });
  await flushDurableWrites();
}

function mapLotRowToBatch(row: InventoryLotRow): WmsBatchDto {
  return {
    batchNo: row.lotNumber,
    sku: row.productId,
    itemName: PRODUCT_NAMES[row.productId] ?? row.productId,
    warehouse: row.warehouseId,
    qty: Number(row.quantity),
    expiryDate: row.expiryDate,
    status: row.status,
    receivedAt: row.receivedAt,
  };
}

async function persistLotFromBatch(row: WmsBatchDto): Promise<void> {
  if (!crmPersistenceEnabled()) return;
  await upsertInventoryLotPrisma({
    lotNumber: row.batchNo,
    productId: row.sku,
    warehouseId: row.warehouse,
    quantity: BigInt(row.qty),
    expiryDate: row.expiryDate,
    status: row.status as InventoryLotRow['status'],
    receivedAt: row.receivedAt,
  });
}

async function ensureBatchesHydrated(): Promise<void> {
  if (!crmPersistenceEnabled()) return;
  const tenantId = TenantContext.requireTenantId();
  const scopeKey = `wms-lots:${tenantId}`;
  if (alreadyLoaded(scopeKey)) return;
  stockMap();
  const store = batchStore();
  store.clear();
  let pending = batchHydrateByTenant.get(tenantId);
  if (!pending) {
    pending = listInventoryLotsPrisma()
      .then((rows) => {
        for (const row of rows) {
          store.set(row.lotNumber, mapLotRowToBatch(row));
        }
      })
      .finally(() => {
        batchHydrateByTenant.delete(tenantId);
      });
    batchHydrateByTenant.set(tenantId, pending);
  }
  await pending;
  rememberLoaded(scopeKey);
}

function batchStore(): Map<string, WmsBatchDto> {
  const tenantId = TenantContext.requireTenantId();
  let store = batchesByTenant.get(tenantId);
  if (!store) {
    store = new Map();
    batchesByTenant.set(tenantId, store);
  }
  return store;
}

async function registerBatchFromLine(line: {
  sku: string;
  warehouse: string;
  quantity: number;
  batch?: string;
  batchExpiry?: string;
}): Promise<WmsBatchDto | null> {
  if (!line.batch?.trim()) return null;
  const batchNo = line.batch.trim();
  const tenantId = TenantContext.requireTenantId();
  const store = batchStore();
  const existing = store.get(batchNo);
  const qty = (existing?.qty ?? 0) + line.quantity;
  const expiryFromLine = line.batchExpiry?.trim() || null;
  const row: WmsBatchDto = {
    batchNo,
    sku: line.sku,
    itemName: PRODUCT_NAMES[line.sku] ?? line.sku,
    warehouse: line.warehouse,
    qty,
    expiryDate: existing?.expiryDate ?? expiryFromLine,
    status: existing?.status ?? 'active',
    receivedAt: existing?.receivedAt ?? new Date().toISOString(),
  };
  store.set(batchNo, row);
  await recordWmsLotTrace({
    sku: row.sku,
    warehouse: row.warehouse,
    batchNo,
    quantity: BigInt(line.quantity),
    direction: 'In',
    referenceId: batchNo,
  });
  await emitWmsStockEvent(OPS_EVENTS.STOCK_LOT_REGISTERED, batchNo, {
    batchNo,
    sku: row.sku,
    warehouse: row.warehouse,
    qty: row.qty,
    expiryDate: row.expiryDate,
    tenantId,
  });
  await persistLotFromBatch(row);
  return row;
}

function isoDateToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoDateAfterDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function getOverview(): Promise<WmsOverviewDto> {
  await ensureWmsHydrated();
  const rows = [...stockMap().values()].map(toRow);
  const critical = rows.filter((r) => r.status === 'low' || r.status === 'out').length;
  const reservations = [...(reservationsByTenant.get(TenantContext.requireTenantId()) ?? new Map()).values()].filter(
    (r) => r.status === 'active',
  );
  const whSet = new Set(rows.map((r) => r.warehouse));
  const tenantId = TenantContext.requireTenantId();
  const expiringLotsWithin30 = (await listExpiringBatches(30, false)).length;
  const overview = {
    activeWarehouses: whSet.size,
    recentReservations: reservations.length,
    criticalSkus: Math.min(critical, 10),
    expiringLotsWithin30,
    stockPreview: rows.slice(0, 6),
    recentMovements: movementsByTenant.get(tenantId) ?? [],
  };
  publishWmsOverviewProjection(tenantId, {
    activeWarehouses: overview.activeWarehouses,
    recentReservations: overview.recentReservations,
    criticalSkus: overview.criticalSkus,
    expiringLotsWithin30: overview.expiringLotsWithin30,
  });
  return overview;
}

export async function listStock(): Promise<WmsStockRowDto[]> {
  await ensureWmsHydrated();
  return [...stockMap().values()].map(toRow).slice(0, 100);
}

export async function listReservations(): Promise<WmsReservationDto[]> {
  await ensureWmsHydrated();
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  const store = reservationsByTenant.get(tenantId);
  return store ? [...store.values()] : [];
}

export async function getReservation(id: string): Promise<WmsReservationDto | null> {
  await ensureWmsHydrated();
  const tenantId = TenantContext.requireTenantId();
  return reservationsByTenant.get(tenantId)?.get(id) ?? null;
}

export async function createReservation(body: CreateReservationBody): Promise<WmsReservationDto> {
  await ensureWmsHydrated();
  if (!body.reference?.trim()) throw new BadRequestException('reference is required');
  const qty = Number(body.quantity);
  if (!Number.isFinite(qty) || qty <= 0) throw new BadRequestException('quantity must be positive');

  const cell = getCell(body.sku.trim(), body.warehouse.trim());
  if (availableQty(cell) < qty) {
    throw new BadRequestException('Insufficient available stock for reservation');
  }

  if (!reserveStockWithLock(body.sku.trim(), body.warehouse.trim(), BigInt(qty))) {
    throw new BadRequestException('Inventory engine rejected reservation');
  }

  cell.reserved += qty;
  syncSaga(cell);

  const tenantId = TenantContext.requireTenantId();
  const memo: WmsReservationDto = {
    id: nextReservationId(),
    sku: body.sku.trim(),
    itemName: PRODUCT_NAMES[body.sku.trim()] ?? body.sku,
    warehouse: body.warehouse.trim(),
    warehouseLabel: WH_LABEL[body.warehouse.trim()] ?? body.warehouse,
    reference: body.reference.trim(),
    qty,
    expiry: body.expiry?.trim() ?? null,
    status: 'active',
  };

  let store = reservationsByTenant.get(tenantId);
  if (!store) {
    store = new Map();
    reservationsByTenant.set(tenantId, store);
  }
  store.set(memo.id, memo);

  await emitWmsStockEvent(OPS_EVENTS.STOCK_RESERVATION_CREATED, memo.id, {
    reservationId: memo.id,
    sku: memo.sku,
    warehouse: memo.warehouse,
    qty,
    reference: memo.reference,
  });

  await recordStockMovementPrisma({
    productId: memo.sku,
    warehouseId: memo.warehouse,
    movementType: 'Reserve',
    quantity: BigInt(qty),
    referenceType: 'wms_reservation',
    referenceId: memo.id,
  });

  await persistReservationRecord(memo);
  return memo;
}

export async function consumeReservationsForReference(
  reference: string,
  lines: WmsLineDto[],
): Promise<void> {
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  const store = reservationsByTenant.get(tenantId);
  if (!store) return;

  for (const line of lines) {
    let remaining = line.quantity;
    const matches = [...store.values()].filter(
      (r) =>
        r.reference === reference &&
        r.sku === line.sku &&
        r.warehouse === line.warehouse &&
        r.status === 'active',
    );

    if (matches.length === 0) {
      throw new BadRequestException(
        `No active reservation for ${line.sku} @ ${line.warehouse} on order ${reference}`,
      );
    }

    for (const res of matches) {
      if (remaining <= 0) break;
      const take = Math.min(res.qty, remaining);
      const cell = getCell(res.sku, res.warehouse);
      cell.reserved = Math.max(0, cell.reserved - take);
      syncSaga(cell);
      const newQty = res.qty - take;
      const updated = {
        ...res,
        qty: newQty,
        status: newQty <= 0 ? ('consumed' as const) : ('active' as const),
      };
      store.set(res.id, updated);
      await persistReservationRecord(updated);
      remaining -= take;
    }

    if (remaining > 0) {
      throw new BadRequestException(
        `Reservation quantity short for ${line.sku} on ${reference} (missing ${remaining})`,
      );
    }
  }
}

export async function listReceipts(): Promise<WmsStockDocDto[]> {
  await ensureWmsHydrated();
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  return [...(receiptsByTenant.get(tenantId) ?? new Map()).values()];
}

export async function listIssues(): Promise<WmsStockDocDto[]> {
  await ensureWmsHydrated();
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  return [...(issuesByTenant.get(tenantId) ?? new Map()).values()];
}

export async function listTransfers(): Promise<WmsStockDocDto[]> {
  await ensureWmsHydrated();
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  return [...(transfersByTenant.get(tenantId) ?? new Map()).values()];
}

async function pushMovement(doc: WmsStockDocDto, type: WmsMovementDto['type']) {
  const tenantId = TenantContext.requireTenantId();
  const list = movementsByTenant.get(tenantId) ?? [];
  list.unshift({ id: doc.docNo, type, date: doc.date, status: 'posted' });
  movementsByTenant.set(tenantId, list.slice(0, 20));
}

function receiptAutoGlEnabled(): boolean {
  return process.env.WMS_RECEIPT_AUTO_GL !== '0' && process.env.WMS_RECEIPT_AUTO_GL !== 'false';
}

export async function createReceipt(
  body: CreateStockDocBody,
  approverUserId?: string,
): Promise<WmsStockDocDto> {
  await ensureWmsHydrated();
  assertLines(body.lines);
  for (const line of body.lines) {
    const cell = getCell(line.sku, line.warehouse);
    cell.onHand += line.quantity;
    applyStockReceipt(line.sku, line.warehouse, BigInt(line.quantity));
    syncSaga(cell);
    await registerBatchFromLine(line);
  }

  const doc: WmsStockDocDto = {
    docNo: nextStkDoc(),
    date: body.documentDate?.trim() || jalaliPlaceholder(),
    party: body.party?.trim() || '—',
    orderRef: body.orderRef?.trim() || body.reference?.trim() || '—',
    source: body.orderRef ? 'سیستم' : 'سایر',
    status: 'posted',
    lines: body.lines,
  };

  const tenantId = TenantContext.requireTenantId();
  let receiptStore = receiptsByTenant.get(tenantId);
  if (!receiptStore) {
    receiptStore = new Map();
    receiptsByTenant.set(tenantId, receiptStore);
  }
  receiptStore.set(doc.docNo, doc);
  await persistStockDoc('receipt', doc);
  for (const line of body.lines) {
    await recordStockMovementPrisma({
      productId: line.sku,
      warehouseId: line.warehouse,
      movementType: 'In',
      quantity: BigInt(line.quantity),
      referenceType: 'wms_receipt',
      referenceId: doc.docNo,
    });
  }

  await pushMovement(doc, 'receipt');
  await emitWmsStockEvent(OPS_EVENTS.STOCK_RECEIPT_POSTED, doc.docNo, {
    docNo: doc.docNo,
    salesReturnId: body.salesReturnId,
    restockFromReturn: Boolean(body.salesReturnId),
    lines: body.lines.map((l) => ({
      sku: l.sku,
      warehouse: l.warehouse,
      quantity: l.quantity,
      unitPriceRial: l.unitPriceRial,
    })),
  });

  if (receiptAutoGlEnabled() && approverUserId?.trim()) {
    let valueRial = 0n;
    const prices = await unitCostRialBySku();
    for (const line of body.lines) {
      const unit = BigInt(line.unitPriceRial ?? prices.get(line.sku) ?? 1_200_000);
      valueRial += unit * BigInt(line.quantity);
    }
    if (valueRial > 0n) {
      const gl = await postWmsReceiptGl({
        tenantId,
        approverUserId: approverUserId.trim(),
        docNo: doc.docNo,
        party: doc.party,
        valueRial,
      });
      if (gl) {
        doc.glJournalId = gl.journalEntryId;
        doc.glDocNumber = gl.glDocNumber;
        receiptStore.set(doc.docNo, doc);
      }
    }
  }

  return doc;
}

/** پیش از خروج سفارش — بچ کافی برای SKUهای FEFO الزامی */
export async function ensureBatchesForIssueLines(lines: WmsLineDto[]): Promise<void> {
  const tenantId = TenantContext.requireTenantId();
  await ensureTrackingCatalog();
  await ensureBatchesHydrated();
  for (const line of lines) {
    const contract = getTrackingContract(tenantId, line.sku);
    if (!requiresBatchCoverage(contract)) continue;
    const batches = fefoSortedBatches(line.sku, line.warehouse);
    const onHand = batches.reduce((sum, b) => sum + b.qty, 0);
    if (onHand >= line.quantity) continue;
    const batchNo = `BTH-FULFILL-${line.sku}`.slice(0, 32);
    const existing = batchStore().get(batchNo);
    if (existing && existing.qty >= line.quantity) continue;
    await createBatch({
      sku: line.sku,
      warehouse: line.warehouse,
      qty: Math.max(line.quantity - onHand, 20),
      batchNo,
      expiryDate: '2099-12-31',
    });
  }
}

function fefoSortedBatches(sku: string, warehouse: string): WmsBatchDto[] {
  return [...batchStore().values()]
    .filter((b) => b.sku === sku && b.warehouse === warehouse && b.status === 'active' && b.qty > 0)
    .sort((a, b) => {
      if (!a.expiryDate && !b.expiryDate) return a.receivedAt.localeCompare(b.receivedAt);
      if (!a.expiryDate) return 1;
      if (!b.expiryDate) return -1;
      return a.expiryDate.localeCompare(b.expiryDate);
    });
}

async function consumeBatchesForIssue(
  line: WmsLineDto,
  docNo: string,
): Promise<Array<{ batchNo: string; qty: number }>> {
  await ensureBatchesHydrated();
  const store = batchStore();
  const allocations: Array<{ batchNo: string; qty: number }> = [];
  let remaining = line.quantity;

  if (line.batch?.trim()) {
    const batchNo = line.batch.trim();
    const b = store.get(batchNo);
    if (!b || b.qty < line.quantity) {
      throw new BadRequestException(`Batch ${batchNo} has insufficient quantity`);
    }
    const updated = { ...b, qty: b.qty - line.quantity };
    store.set(batchNo, updated);
    await persistLotFromBatch(updated);
    allocations.push({ batchNo, qty: line.quantity });
    await recordWmsLotTrace({
      sku: line.sku,
      warehouse: line.warehouse,
      batchNo,
      quantity: BigInt(line.quantity),
      direction: 'Out',
      referenceId: docNo,
    });
    await emitWmsStockEvent(OPS_EVENTS.STOCK_LOT_CONSUMED, `${docNo}-${batchNo}`, {
      batchNo,
      qty: line.quantity,
      docNo,
      sku: line.sku,
    });
    return allocations;
  }

  for (const b of fefoSortedBatches(line.sku, line.warehouse)) {
    if (remaining <= 0) break;
    const take = Math.min(b.qty, remaining);
    const updated = { ...b, qty: b.qty - take };
    store.set(b.batchNo, updated);
    await persistLotFromBatch(updated);
    allocations.push({ batchNo: b.batchNo, qty: take });
    remaining -= take;
    await recordWmsLotTrace({
      sku: line.sku,
      warehouse: line.warehouse,
      batchNo: b.batchNo,
      quantity: BigInt(take),
      direction: 'Out',
      referenceId: docNo,
    });
    await emitWmsStockEvent(OPS_EVENTS.STOCK_LOT_CONSUMED, `${docNo}-${b.batchNo}`, {
      batchNo: b.batchNo,
      qty: take,
      docNo,
      sku: line.sku,
    });
  }

  return allocations;
}

function assertBatchCoverageForIssue(
  tenantId: string,
  line: WmsLineDto,
  allocations: Array<{ batchNo: string; qty: number }>,
): void {
  const contract = getTrackingContract(tenantId, line.sku);
  if (!requiresBatchCoverage(contract)) return;

  const batches = fefoSortedBatches(line.sku, line.warehouse);
  const allocated = allocations.reduce((s, a) => s + a.qty, 0);

  if (batches.length === 0) {
    throw new BadRequestException(
      `SKU ${line.sku} requires batch/FEFO tracking — register batches before issuing stock`,
    );
  }
  const batchOnHand = batches.reduce((s, b) => s + b.qty, 0);
  if (batchOnHand < line.quantity) {
    throw new BadRequestException(
      `Insufficient batch quantity for ${line.sku}: need ${line.quantity}, batches hold ${batchOnHand}`,
    );
  }
  if (allocated < line.quantity) {
    throw new BadRequestException(`FEFO batch allocation incomplete for ${line.sku} (${allocated}/${line.quantity})`);
  }
}

async function unitCostRialBySku(): Promise<Map<string, number>> {
  const kardex = await getKardex();
  const priceBySku = new Map<string, number>();
  for (const entry of kardex.entries) {
    if (entry.unitPriceRial && entry.qtyIn > 0) {
      priceBySku.set(entry.sku, entry.unitPriceRial);
    }
  }
  return priceBySku;
}

export async function createIssue(
  body: CreateStockDocBody,
  approverUserId?: string,
): Promise<WmsStockDocDto> {
  await ensureWmsHydrated();
  assertLines(body.lines);
  const docNo = nextStkDoc();
  const issuedLines: WmsLineDto[] = [];
  const tenantId = TenantContext.requireTenantId();
  await ensureTrackingCatalog();

  for (const line of body.lines) {
    const cell = getCell(line.sku, line.warehouse);
    if (availableQty(cell) < line.quantity) {
      throw new BadRequestException('Posting would cause negative inventory — rejected');
    }
    if (!applyStockIssue(line.sku, line.warehouse, BigInt(line.quantity))) {
      throw new BadRequestException('Inventory engine rejected issue');
    }
    cell.onHand -= line.quantity;
    syncSaga(cell);
    const batchAllocations = await consumeBatchesForIssue(line, docNo);
    assertBatchCoverageForIssue(tenantId, line, batchAllocations);
    issuedLines.push(batchAllocations.length ? { ...line, batchAllocations } : line);
  }

  const doc: WmsStockDocDto = {
    docNo,
    date: body.documentDate?.trim() || jalaliPlaceholder(),
    party: body.party?.trim() || '—',
    orderRef: body.orderRef?.trim() || body.reference?.trim() || '—',
    source: 'تحویل',
    status: 'posted',
    lines: issuedLines,
  };

  stockMap();
  let store = issuesByTenant.get(tenantId);
  if (!store) {
    store = new Map();
    issuesByTenant.set(tenantId, store);
  }
  store.set(doc.docNo, doc);
  await persistStockDoc('issue', doc);
  for (const line of issuedLines) {
    await recordStockMovementPrisma({
      productId: line.sku,
      warehouseId: line.warehouse,
      movementType: 'Out',
      quantity: BigInt(line.quantity),
      referenceType: 'wms_issue',
      referenceId: doc.docNo,
    });
  }

  await pushMovement(doc, 'issue');
  await emitWmsStockEvent(OPS_EVENTS.STOCK_ISSUE_POSTED, doc.docNo, {
    docNo: doc.docNo,
    orderRef: doc.orderRef,
    lines: issuedLines.map((l) => ({
      sku: l.sku,
      warehouse: l.warehouse,
      quantity: l.quantity,
      batchAllocations: l.batchAllocations,
    })),
  });

  if (body.postCogs) {
    if (!approverUserId?.trim()) {
      throw new BadRequestException('postCogs requires approver user (x-user-id header)');
    }
    const prices = await unitCostRialBySku();
    let costRial = 0n;
    for (const line of issuedLines) {
      const unit = BigInt(prices.get(line.sku) ?? 1_000_000);
      costRial += unit * BigInt(line.quantity);
    }
    const gl = await postWmsIssueCogsGl({
      tenantId,
      approverUserId: approverUserId.trim(),
      docNo: doc.docNo,
      orderRef: doc.orderRef,
      costRial,
    });
    if (gl) {
      doc.glJournalId = gl.journalEntryId;
      doc.glDocNumber = gl.glDocNumber;
      store.set(doc.docNo, doc);
    }
  }

  return doc;
}

export async function getValuationReconciliation(): Promise<WmsValuationReconDto> {
  const tenantId = TenantContext.requireTenantId();
  const kardex = await getKardex();
  const priceBySku = new Map<string, number>();
  for (const entry of kardex.entries) {
    if (entry.unitPriceRial && entry.qtyIn > 0) {
      priceBySku.set(entry.sku, entry.unitPriceRial);
    }
  }

  const rows = await listStock();
  let bookValueRial = 0;
  for (const row of rows) {
    const unit = priceBySku.get(row.sku) ?? 1_000_000;
    bookValueRial += row.onHand * unit;
  }

  publishWmsBookInventoryValue(tenantId, bookValueRial);
  const recon = readWmsValuationReconciliation(tenantId, bookValueRial);

  return {
    bookValueRial: recon.bookValueRial,
    glInventoryRial: recon.glInventoryRial,
    varianceRial: recon.varianceRial,
    pricedSkuCount: priceBySku.size,
    stockRowCount: rows.length,
  };
}

export async function getValuationReconciliationCsv(): Promise<string> {
  const recon = await getValuationReconciliation();
  const header = 'metric,value_rial';
  const rows = [
    `book_inventory,${recon.bookValueRial}`,
    `gl_inventory_1301,${recon.glInventoryRial}`,
    `variance,${recon.varianceRial}`,
    `priced_sku_count,${recon.pricedSkuCount}`,
    `stock_rows,${recon.stockRowCount}`,
  ];
  return `\uFEFF${header}\n${rows.join('\n')}\n`;
}

export async function createTransfer(body: CreateStockDocBody): Promise<WmsStockDocDto> {
  await ensureWmsHydrated();
  assertLines(body.lines);
  for (const line of body.lines) {
    const src = getCell(line.sku, line.warehouse);
    if (availableQty(src) < line.quantity) {
      throw new BadRequestException('Posting would cause negative inventory — rejected');
    }
    if (!applyStockIssue(line.sku, line.warehouse, BigInt(line.quantity))) {
      throw new BadRequestException('Insufficient stock at source warehouse');
    }
    src.onHand -= line.quantity;
    syncSaga(src);

    const destWh = line.destWarehouse?.trim() || line.warehouse;
    const dest = getCell(line.sku, destWh);
    dest.onHand += line.quantity;
    applyStockReceipt(line.sku, destWh, BigInt(line.quantity));
    syncSaga(dest);
  }

  const doc: WmsStockDocDto = {
    docNo: nextStkDoc(),
    date: body.documentDate?.trim() || jalaliPlaceholder(),
    party: body.party?.trim() || '—',
    orderRef: body.reference?.trim() || body.orderRef?.trim() || '—',
    source: 'انتقال بین انبار',
    status: 'posted',
    lines: body.lines,
  };

  const tenantId = TenantContext.requireTenantId();
  let store = transfersByTenant.get(tenantId);
  if (!store) {
    store = new Map();
    transfersByTenant.set(tenantId, store);
  }
  store.set(doc.docNo, doc);
  await persistStockDoc('transfer', doc);
  for (const line of body.lines) {
    await recordStockMovementPrisma({
      productId: line.sku,
      warehouseId: line.warehouse,
      movementType: 'Transfer',
      quantity: BigInt(line.quantity),
      referenceType: 'wms_transfer',
      referenceId: doc.docNo,
    });
  }
  await pushMovement(doc, 'transfer');

  await emitWmsStockEvent(OPS_EVENTS.STOCK_ISSUE_POSTED, `${doc.docNo}-OUT`, {
    docNo: doc.docNo,
    orderRef: doc.orderRef,
    lines: body.lines.map((l) => ({ sku: l.sku, warehouse: l.warehouse, quantity: l.quantity })),
  });
  await emitWmsStockEvent(OPS_EVENTS.STOCK_RECEIPT_POSTED, `${doc.docNo}-IN`, {
    docNo: doc.docNo,
    lines: body.lines.map((l) => ({
      sku: l.sku,
      warehouse: l.destWarehouse?.trim() || l.warehouse,
      quantity: l.quantity,
    })),
  });

  return doc;
}

export type WmsAdjustmentOptions = {
  approverUserId?: string;
  approverRole?: string;
  /** پس از تأیید workflow انبارگردانی — تعدیل خطی بدون workflow مجدد */
  bypassWorkflow?: boolean;
};

export async function createAdjustment(
  body: CreateAdjustmentBody,
  options?: WmsAdjustmentOptions,
): Promise<{ ok: true; delta: number }> {
  await ensureWmsHydrated();
  if (!body.reason?.trim()) throw new BadRequestException('reason is required');
  const cell = getCell(body.sku.trim(), body.warehouse.trim());
  const delta = body.countedQty - cell.onHand;
  if (delta < 0 && !body.unitValueRial) {
    // shortage — unit value optional
  }
  if (delta > 0 && !body.unitValueRial) {
    throw new BadRequestException('unitValueRial required for surplus adjustments');
  }

  if (delta < 0 && Math.abs(delta) > availableQty(cell)) {
    throw new BadRequestException('Adjustment would imply negative available stock');
  }

  const tenantId = TenantContext.requireTenantId();
  if (delta !== 0 && !options?.bypassWorkflow && Math.abs(delta) >= wmsAdjustmentQtyThreshold()) {
    const entityId = adjustmentWorkflowEntityId(body.sku, body.warehouse, body.countedQty);
    assertWmsAdjustmentApproved({
      tenantId,
      entityId,
      approverUserId: options?.approverUserId,
      approverRole: options?.approverRole ?? 'CFO',
    });
  }

  cell.onHand = body.countedQty;
  syncSaga(cell);
  await flushDurableWrites();

  const adjRef = `ADJ-${body.sku}-${body.warehouse}-${Date.now()}`;
  await recordStockMovementPrisma({
    productId: body.sku.trim(),
    warehouseId: body.warehouse.trim(),
    movementType: 'Adjustment',
    quantity: BigInt(Math.abs(delta)),
    referenceType: 'wms_adjustment',
    referenceId: adjRef,
  });

  await emitWmsStockEvent(OPS_EVENTS.STOCK_RECEIPT_POSTED, adjRef, {
    sku: body.sku,
    warehouse: body.warehouse,
    delta,
    reason: body.reason,
  });

  return { ok: true, delta };
}

export async function runReconciliation(): Promise<ReconciliationSessionDto> {
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  const session: ReconciliationSessionDto = {
    id: nextReconId(),
    runAt: new Date().toISOString(),
    status: 'completed',
    layersChecked: ['kardex_vs_balance', 'serials_vs_physical', 'wac_vs_gl'],
  };
  const list = reconByTenant.get(tenantId) ?? [];
  list.unshift(session);
  reconByTenant.set(tenantId, list);

  await emitWmsStockEvent(OPS_EVENTS.STOCK_RECONCILIATION_RUN, session.id, { sessionId: session.id });

  return session;
}

export async function listReconciliations(): Promise<ReconciliationSessionDto[]> {
  const tenantId = TenantContext.requireTenantId();
  return reconByTenant.get(tenantId) ?? [];
}

export async function getDocument(docNo: string): Promise<WmsStockDocDto | null> {
  await ensureWmsHydrated();
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  return (
    receiptsByTenant.get(tenantId)?.get(docNo) ??
    issuesByTenant.get(tenantId)?.get(docNo) ??
    transfersByTenant.get(tenantId)?.get(docNo) ??
    null
  );
}

async function ensureTrackingCatalog(): Promise<void> {
  const tenantId = TenantContext.requireTenantId();
  await hydrateWmsTrackingFromPrisma(tenantId);
  const items = [...stockMap().values()].map((c) => ({
    sku: c.sku,
    name: PRODUCT_NAMES[c.sku] ?? c.sku,
  }));
  seedTrackingFromCatalog(tenantId, items.slice(0, 100));
}

export async function getKardex(): Promise<WmsKardexDto> {
  const tenantId = TenantContext.requireTenantId();
  await hydrateWmsKardexFromPrisma(tenantId);
  const rows = await listStock();
  publishWmsKardexStockSnapshot(tenantId, rows);
  const model = readWmsKardex(tenantId);
  return {
    entries: model.entries,
    totals: model.totals,
    byWarehouse: model.byWarehouse,
  };
}

function stocktakingStore(): Map<string, StocktakingSessionDto> {
  const tenantId = TenantContext.requireTenantId();
  stockMap();
  let store = stocktakingByTenant.get(tenantId);
  if (!store) {
    store = new Map();
    stocktakingByTenant.set(tenantId, store);
  }
  return store;
}

export async function listStocktakingSessions(): Promise<StocktakingSessionDto[]> {
  return [...stocktakingStore().values()];
}

export async function getStocktakingSession(id: string): Promise<StocktakingSessionDto | null> {
  return stocktakingStore().get(id) ?? null;
}

export async function createStocktakingSession(body: CreateStocktakingBody): Promise<StocktakingSessionDto> {
  if (!body.warehouse?.trim()) throw new BadRequestException('warehouse is required');
  const wh = body.warehouse.trim();
  const rows = [...stockMap().values()].filter((c) => c.warehouse === wh);
  const lines = rows.slice(0, 50).map((c) => ({
    sku: c.sku,
    systemQty: c.onHand,
    countedQty: c.onHand,
  }));

  const session: StocktakingSessionDto = {
    id: nextStockCountId(),
    warehouse: wh,
    warehouseLabel: WH_LABEL[wh] ?? wh,
    countDate: body.countDate?.trim() || jalaliPlaceholder(),
    status: 'draft',
    totalLines: lines.length,
    varianceLines: 0,
    varianceToman: 0,
    lines,
  };
  stocktakingStore().set(session.id, session);
  return session;
}

export async function updateStocktakingLine(
  sessionId: string,
  body: UpdateStocktakingLineBody,
): Promise<StocktakingSessionDto> {
  const session = stocktakingStore().get(sessionId);
  if (!session) throw new NotFoundException(`Stock count ${sessionId} not found`);
  if (session.status !== 'draft') throw new BadRequestException('Session is not editable');

  const sku = body.sku.trim();
  let lines = session.lines ?? [];
  let line = lines.find((l) => l.sku === sku);
  if (!line) {
    const cell = getCell(sku, session.warehouse);
    line = { sku, systemQty: cell.onHand, countedQty: body.countedQty };
    lines = [...lines, line];
  } else {
    line = { ...line, countedQty: body.countedQty };
    lines = lines.map((l) => (l.sku === sku ? line! : l));
  }

  const varianceLines = lines.filter((l) => l.countedQty !== l.systemQty).length;
  const updated: StocktakingSessionDto = {
    ...session,
    lines,
    totalLines: lines.length,
    varianceLines,
  };
  stocktakingStore().set(sessionId, updated);
  return updated;
}

export async function postStocktakingSession(
  sessionId: string,
  approverUserId: string,
): Promise<StocktakingSessionDto> {
  await ensureWmsHydrated();
  const session = stocktakingStore().get(sessionId);
  if (!session) throw new NotFoundException(`Stock count ${sessionId} not found`);
  if (session.status === 'reconciled') return session;

  const unitValueRial = 1_000_000;
  let varianceRial = 0n;
  let varianceToman = 0;
  for (const line of session.lines ?? []) {
    const delta = line.countedQty - line.systemQty;
    if (delta === 0) continue;
    varianceRial += BigInt(delta) * BigInt(unitValueRial);
    varianceToman += Math.round((delta * unitValueRial) / 10);
  }

  const tenantId = TenantContext.requireTenantId();
  if (Math.abs(varianceToman) >= wmsStocktakingVarianceTomanThreshold()) {
    assertWmsStocktakingApproved({ tenantId, sessionId, approverUserId });
  }

  for (const line of session.lines ?? []) {
    const delta = line.countedQty - line.systemQty;
    if (delta === 0) continue;
    if (delta > 0) {
      await createAdjustment(
        {
          sku: line.sku,
          warehouse: session.warehouse,
          countedQty: line.countedQty,
          reason: `انبارگردانی ${sessionId}`,
          unitValueRial,
        },
        { approverUserId, approverRole: 'CFO', bypassWorkflow: true },
      );
    } else {
      const cell = getCell(line.sku, session.warehouse);
      if (cell.onHand + delta < 0) {
        throw new BadRequestException(`Adjustment would over-short ${line.sku}`);
      }
      await createAdjustment(
        {
          sku: line.sku,
          warehouse: session.warehouse,
          countedQty: line.countedQty,
          reason: `کسری انبارگردانی ${sessionId}`,
        },
        { approverUserId, approverRole: 'CFO', bypassWorkflow: true },
      );
    }
  }
  const gl = await postStockCountVarianceGl({
    tenantId,
    approverUserId,
    sessionId,
    warehouse: session.warehouse,
    netVarianceRial: varianceRial,
  });

  const posted: StocktakingSessionDto = {
    ...session,
    status: 'reconciled',
    varianceToman,
    varianceLines: (session.lines ?? []).filter((l) => l.countedQty !== l.systemQty).length,
    glJournalId: gl?.journalEntryId,
    glDocNumber: gl?.glDocNumber,
  };
  stocktakingStore().set(sessionId, posted);

  await emitWmsStockEvent(OPS_EVENTS.STOCK_COUNT_POSTED, sessionId, {
    sessionId,
    warehouse: session.warehouse,
    varianceLines: posted.varianceLines,
    varianceToman: posted.varianceToman,
    glJournalId: gl?.journalEntryId,
    glDocNumber: gl?.glDocNumber,
  });

  return posted;
}

export async function getTrackingContracts(): Promise<WmsTrackingContractDto[]> {
  const tenantId = TenantContext.requireTenantId();
  await ensureTrackingCatalog();
  return listTrackingContractsProjection(tenantId, 120);
}

export async function getSerialNumbers(): Promise<WmsSerialDto[]> {
  const tenantId = TenantContext.requireTenantId();
  await ensureTrackingCatalog();
  return listSerialsProjection(tenantId, 200).map((s) => ({
    serial: s.serial,
    sku: s.sku,
    itemName: s.itemName,
    warehouse: s.warehouse,
    batch: s.batch,
    status: s.status,
  }));
}

export async function registerSerialNumbers(body: RegisterSerialsBody): Promise<{ registered: number }> {
  if (!body.sku?.trim() || !body.warehouse?.trim() || !body.serials?.length) {
    throw new BadRequestException('sku, warehouse and serials required');
  }
  const tenantId = TenantContext.requireTenantId();
  const sku = body.sku.trim();
  const itemName = PRODUCT_NAMES[sku] ?? sku;
  const rows = body.serials.map((serial) => ({
    serial: serial.trim(),
    sku,
    itemName,
    warehouse: body.warehouse.trim(),
    batch: body.batch?.trim(),
    status: 'in_stock' as const,
  }));
  const added = registerSerials(tenantId, rows);

  await emitWmsStockEvent(OPS_EVENTS.STOCK_SERIAL_REGISTERED, `SER-${Date.now()}`, {
    sku,
    warehouse: body.warehouse,
    count: added.length,
    serials: added.map((s) => s.serial).slice(0, 20),
  });

  return { registered: added.length };
}

export async function listBatches(fefo = true): Promise<WmsBatchDto[]> {
  stockMap();
  await ensureBatchesHydrated();
  const rows = [...batchStore().values()];
  if (!fefo) return rows;
  return rows.sort((a, b) => {
    if (!a.expiryDate && !b.expiryDate) return a.receivedAt.localeCompare(b.receivedAt);
    if (!a.expiryDate) return 1;
    if (!b.expiryDate) return -1;
    return a.expiryDate.localeCompare(b.expiryDate);
  });
}

export async function listExpiringBatches(withinDays = 30, emitAlerts = true): Promise<WmsBatchDto[]> {
  stockMap();
  await ensureBatchesHydrated();
  const today = isoDateToday();
  const until = isoDateAfterDays(withinDays);
  const rows = [...batchStore().values()].filter(
    (b) =>
      b.status === 'active' && b.qty > 0 && b.expiryDate && b.expiryDate >= today && b.expiryDate <= until,
  );
  const sorted = rows.sort((a, b) => (a.expiryDate ?? '').localeCompare(b.expiryDate ?? ''));

  if (emitAlerts && sorted.length > 0) {
    const tenantId = TenantContext.requireTenantId();
    const correlationId = TenantContext.get()?.correlationId ?? randomUUID();
    ensureWmsLotAlertRules(tenantId);
    for (const batch of sorted) {
      void evaluateDomainEvent({
        tenantId,
        eventType: OPS_EVENTS.STOCK_LOT_EXPIRING,
        payload: {
          entityId: batch.batchNo,
          batchNo: batch.batchNo,
          sku: batch.sku,
          warehouse: batch.warehouse,
          qty: batch.qty,
          expiryDate: batch.expiryDate,
          withinDays,
        },
        correlationId,
      });
    }
  }

  publishWmsExpiryKpi(TenantContext.requireTenantId(), sorted.length);
  return sorted;
}

export async function suggestFefoPick(sku: string, warehouse: string, quantity: number): Promise<WmsFefoPickDto> {
  if (!sku?.trim() || !warehouse?.trim()) throw new BadRequestException('sku and warehouse required');
  if (!Number.isFinite(quantity) || quantity <= 0) throw new BadRequestException('quantity must be positive');

  await ensureTrackingCatalog();
  stockMap();
  await ensureBatchesHydrated();
  const batches = fefoSortedBatches(sku.trim(), warehouse.trim());
  let remaining = quantity;
  const allocations: WmsFefoPickDto['allocations'] = [];

  for (const b of batches) {
    if (remaining <= 0) break;
    const take = Math.min(b.qty, remaining);
    allocations.push({ batchNo: b.batchNo, qty: take, expiryDate: b.expiryDate });
    remaining -= take;
  }

  const batchOnHand = batches.reduce((sum, b) => sum + b.qty, 0);

  return {
    sku: sku.trim(),
    warehouse: warehouse.trim(),
    quantity,
    allocations,
    uncoveredQty: remaining,
    batchOnHand,
    fefo: true,
  };
}

export async function createBatch(body: CreateBatchBody): Promise<WmsBatchDto> {
  if (!body.sku?.trim() || !body.warehouse?.trim()) throw new BadRequestException('sku and warehouse required');
  if (!Number.isFinite(body.qty) || body.qty <= 0) throw new BadRequestException('qty must be positive');

  const batchNo = body.batchNo?.trim() || nextBatchNo();
  const row: WmsBatchDto = {
    batchNo,
    sku: body.sku.trim(),
    itemName: PRODUCT_NAMES[body.sku.trim()] ?? body.sku,
    warehouse: body.warehouse.trim(),
    qty: body.qty,
    expiryDate: body.expiryDate?.trim() ?? null,
    status: 'active',
    receivedAt: new Date().toISOString(),
  };
  batchStore().set(batchNo, row);

  await emitWmsStockEvent(OPS_EVENTS.STOCK_LOT_REGISTERED, batchNo, {
    batchNo,
    sku: row.sku,
    warehouse: row.warehouse,
    qty: row.qty,
    expiryDate: row.expiryDate,
  });

  await persistLotFromBatch(row);
  return row;
}

export async function runBatchExpiry(): Promise<{ expired: number }> {
  await ensureBatchesHydrated();
  const tenantId = TenantContext.requireTenantId();
  const today = isoDateToday();
  const correlationId = TenantContext.get()?.correlationId ?? randomUUID();
  let expired = 0;
  ensureWmsLotAlertRules(tenantId);
  for (const [key, batch] of batchStore()) {
    if (batch.status === 'active' && batch.expiryDate && batch.expiryDate < today) {
      const expiredRow = { ...batch, status: 'expired' as const };
      batchStore().set(key, expiredRow);
      await persistLotFromBatch(expiredRow);
      expired++;
      await emitWmsStockEvent(OPS_EVENTS.STOCK_LOT_EXPIRED, key, {
        batchNo: key,
        sku: batch.sku,
        warehouse: batch.warehouse,
        expiryDate: batch.expiryDate,
        tenantId,
        entityId: key,
      });
      void evaluateDomainEvent({
        tenantId,
        eventType: OPS_EVENTS.STOCK_LOT_EXPIRED,
        payload: {
          entityId: key,
          batchNo: key,
          sku: batch.sku,
          warehouse: batch.warehouse,
          expiryDate: batch.expiryDate,
        },
        correlationId,
      });
    }
  }
  return { expired };
}

/** نگهداری دوره‌ای: منقضی‌سازی + هشدار بچ‌های در آستانه انقضا */
export async function runWmsExpiryMaintenance(
  withinDays = 30,
): Promise<{ expired: number; expiringCount: number }> {
  const expired = (await runBatchExpiry()).expired;
  const expiring = await listExpiringBatches(withinDays, true);
  const tenantId = TenantContext.requireTenantId();
  const today = isoDateToday();
  await recordDomainEvent({
    eventType: OPS_EVENTS.STOCK_LOT_EXPIRING,
    aggregateId: `expiry-hub-${today}`,
    payload: {
      expiringCount: expiring.length,
      withinDays,
      snapshot: true,
      tenantId,
    },
    sourceSchema: 'erp_operations',
  });
  publishWmsExpiryKpi(tenantId, expiring.length);
  return { expired, expiringCount: expiring.length };
}

export function wmsTrackingSource(): string {
  const tenantId = TenantContext.requireTenantId();
  const meta = readWmsTrackingMeta(tenantId);
  return `projection_wms_tracking (${meta.contractCount} قرارداد، ${meta.serialCount} سریال)`;
}
