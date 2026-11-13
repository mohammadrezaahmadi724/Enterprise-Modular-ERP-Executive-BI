import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OPS_EVENTS } from '@repo/contracts';
import { TenantContext } from '@repo/domain';
import { emitProcurementDomainEvent } from '../../bridges/procurement-outbox.bridge';
import {
  getProcurementThresholdSnapshot,
  procurementPoApprovalTomanThreshold,
  procurementPrApprovalTomanThreshold,
  resolvePurchaseOrderApproval,
  resolvePurchaseRequestApproval,
} from '../../bridges/procurement-workflow.bridge';
import {
  publishProcurementHubProjection,
  publishProcurementMonthlyTrend,
  readProcurementHubKpis,
  readProcurementMonthlyTrend,
} from '@repo/db-erp-bi-risk';
import type {
  AddRfqQuoteBody,
  AwardRfqBody,
  CreatePurchaseOrderBody,
  CreatePurchaseRequestBody,
  CreateRfqBody,
  CreateSupplierBody,
  ProcurementOverviewDto,
  ProcurementReportsDto,
  PurchaseOrderDto,
  PurchaseRequestDto,
  RfqDto,
  SupplierDto,
} from './procurement.dto';

const prByTenant = new Map<string, Map<string, PurchaseRequestDto>>();
const poByTenant = new Map<string, Map<string, PurchaseOrderDto>>();
const suppliersByTenant = new Map<string, Map<string, SupplierDto>>();
const rfqByTenant = new Map<string, Map<string, RfqDto>>();

function prStore(): Map<string, PurchaseRequestDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = prByTenant.get(tenantId);
  if (!m) {
    m = seedPurchaseRequests(tenantId);
    prByTenant.set(tenantId, m);
  }
  return m;
}

function poStore(): Map<string, PurchaseOrderDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = poByTenant.get(tenantId);
  if (!m) {
    m = seedPurchaseOrders(tenantId);
    poByTenant.set(tenantId, m);
  }
  return m;
}

function supplierStore(): Map<string, SupplierDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = suppliersByTenant.get(tenantId);
  if (!m) {
    m = seedSuppliers(tenantId);
    suppliersByTenant.set(tenantId, m);
  }
  return m;
}

function nextPr(): string {
  const n = prStore().size + 217;
  return `PR-${String(n).padStart(5, '0')}`;
}

function nextPo(): string {
  const n = poStore().size + 274;
  return `PO-${String(n).padStart(6, '0')}`;
}

function nextSupplierCode(): string {
  return `SUP-${12000 + supplierStore().size + 16}`;
}

function rfqStore(): Map<string, RfqDto> {
  const tenantId = TenantContext.requireTenantId();
  let m = rfqByTenant.get(tenantId);
  if (!m) {
    m = seedRfqs(tenantId);
    rfqByTenant.set(tenantId, m);
  }
  return m;
}

function nextRfq(): string {
  return `RFQ-${String(rfqStore().size + 12).padStart(5, '0')}`;
}

function seedRfqs(tenantId: string): Map<string, RfqDto> {
  const rows: RfqDto[] = [
    {
      number: 'RFQ-00012',
      title: 'استعلام میلگرد پروژه مرکزی',
      purchaseRequestNumber: 'PR-00004',
      deadline: '۱۴۰۵/۰۸/۱۸',
      status: 'comparing',
      invitedSupplierCodes: ['SUP-12116', 'SUP-11002', 'SUP-12001'],
      quotes: [
        {
          supplierCode: 'SUP-12116',
          supplierName: 'پخش سراسری ظفر کرمان',
          submittedAt: '۱۴۰۵/۰۸/۱۰',
          totalToman: 875_000_000,
          lines: [
            { sku: 'PRD-STEEL', quantity: 12, unit: 'تن', unitPriceToman: 72_916_666, leadDays: 7 },
          ],
        },
        {
          supplierCode: 'SUP-11002',
          supplierName: 'بازرگانی آریا',
          submittedAt: '۱۴۰۵/۰۸/۱۱',
          totalToman: 912_000_000,
          lines: [
            { sku: 'PRD-STEEL', quantity: 12, unit: 'تن', unitPriceToman: 76_000_000, leadDays: 5 },
          ],
        },
      ],
    },
    {
      number: 'RFQ-00009',
      title: 'استعلام نایلون استرچ جشنواره',
      purchaseRequestNumber: 'PR-00008',
      deadline: '۱۴۰۵/۰۸/۲۰',
      status: 'open',
      invitedSupplierCodes: ['SUP-12001'],
      quotes: [],
    },
  ];
  const m = new Map(rows.map((r) => [r.number, r]));
  void tenantId;
  return m;
}

function seedPurchaseRequests(tenantId: string): Map<string, PurchaseRequestDto> {
  const rows: PurchaseRequestDto[] = [
    {
      number: 'PR-00008',
      title: 'تأمین نایلون استرچ ۳۰ میکرون برای جشنواره فروش',
      purpose: 'جشنواره پاییز',
      warehouse: 'WH-THR',
      project: '—',
      costCenter: 'CC-401',
      requestDate: '۱۴۰۵/۰۷/۱۲',
      needDate: '۱۴۰۵/۰۷/۲۰',
      status: 'sent',
      estimatedToman: 140_000_000,
      lines: [{ quantity: 500, unit: 'رول', estimatedUnitToman: 280_000 }],
    },
    {
      number: 'PR-00004',
      title: 'درخواست خرید میلگرد برای پروژه مرکزی',
      warehouse: 'WH-ESF',
      project: 'PRJ-0024',
      costCenter: 'CC-310',
      requestDate: '۱۴۰۵/۰۷/۰۸',
      needDate: '۱۴۰۵/۰۷/۲۵',
      status: 'approved',
      estimatedToman: 890_000_000,
      lines: [{ sku: 'PRD-STEEL', quantity: 12, unit: 'تن', estimatedUnitToman: 74_166_666 }],
    },
    {
      number: 'PR-00005',
      title: 'خرید لوبیا برای انبار مرکزی تهران',
      warehouse: 'WH-THR',
      requestDate: '۱۴۰۵/۰۷/۱۰',
      status: 'sent',
      estimatedToman: 45_000_000,
      lines: [{ sku: 'PRD-BRN3', quantity: 200, unit: 'کیسه', estimatedUnitToman: 225_000 }],
    },
    {
      number: 'PR-00217',
      title: 'تأمین خرما و پسته — پخش کرمان',
      warehouse: 'WH-MSH',
      project: 'PRJ-0018',
      costCenter: 'CC-220',
      requestDate: '۱۴۰۵/۰۸/۰۱',
      needDate: '۱۴۰۵/۰۸/۱۵',
      status: 'approved',
      estimatedToman: 320_000_000,
      lines: [],
    },
  ];
  const m = new Map(rows.map((r) => [r.number, r]));
  void tenantId;
  return m;
}

function seedPurchaseOrders(tenantId: string): Map<string, PurchaseOrderDto> {
  const rows: PurchaseOrderDto[] = [
    {
      number: 'PO-001274',
      purchaseRequestNumber: 'PR-00004',
      supplierCode: 'SUP-12116',
      supplierName: 'تأمین فدک',
      orderDate: '۱۴۰۵/۰۷/۱۵',
      deliveryDate: '۱۴۰۵/۰۸/۰۵',
      status: 'approved',
      totalToman: 890_000_000,
      overdue: false,
      dueThisWeek: true,
      lines: [{ sku: 'PRD-STEEL', quantity: 12, unit: 'تن', unitPriceToman: 74_166_666, lineTotalToman: 890_000_000 }],
    },
    {
      number: 'PO-001270',
      supplierCode: 'SUP-11002',
      supplierName: 'بازرگانی آریا',
      orderDate: '۱۴۰۵/۰۷/۰۲',
      deliveryDate: '۱۴۰۵/۰۷/۲۸',
      status: 'partial_receipt',
      totalToman: 120_000_000,
      overdue: true,
      lines: [{ sku: 'PRD-1016', quantity: 100, unit: 'کارتن', unitPriceToman: 1_200_000, lineTotalToman: 120_000_000 }],
    },
  ];
  const m = new Map(rows.map((r) => [r.number, r]));
  void tenantId;
  return m;
}

function seedSuppliers(tenantId: string): Map<string, SupplierDto> {
  const rows: SupplierDto[] = [
    {
      code: 'SUP-12116',
      name: 'پخش سراسری ظفر کرمان',
      openOrders: 1,
      totalOrders: 10,
      lastOrderDate: '۱۴۰۵/۰۸/۱۲',
    },
    {
      code: 'SUP-11002',
      name: 'بازرگانی آریا',
      openOrders: 2,
      totalOrders: 24,
      lastOrderDate: '۱۴۰۵/۰۸/۱۰',
    },
    {
      code: 'SUP-12001',
      name: 'تأمین فدک',
      openOrders: 0,
      totalOrders: 6,
      lastOrderDate: '۱۴۰۵/۰۷/۲۰',
    },
  ];
  const m = new Map(rows.map((s) => [s.code, s]));
  void tenantId;
  return m;
}

function syncProcurementProjection(): void {
  const tenantId = TenantContext.requireTenantId();
  const prs = [...prStore().values()];
  const pos = [...poStore().values()];
  const suppliers = [...supplierStore().values()];

  const pendingRequestToman = prs
    .filter((r) => r.status === 'sent' || r.status === 'draft')
  .reduce((s, r) => s + r.estimatedToman, 0);

  const openPoToman = pos
    .filter((p) => !['full_receipt', 'canceled'].includes(p.status))
    .reduce((s, p) => s + p.totalToman, 0);

  const baseSuppliers = Math.max(suppliers.length, 57);
  publishProcurementHubProjection(tenantId, {
    pendingRequestToman: Math.max(pendingRequestToman, 5_419_000_000),
    openPoToman: Math.max(openPoToman, 5_123_000_000),
    overduePoCount: Math.max(pos.filter((p) => p.overdue).length, 3),
    dueThisWeekPoCount: Math.max(pos.filter((p) => p.dueThisWeek).length, 2),
    incompleteReceiptCount: pos.filter((p) => p.status === 'partial_receipt').length,
    activeSuppliers: baseSuppliers,
    newSuppliersThisYear: baseSuppliers,
  });

  publishProcurementMonthlyTrend(tenantId, [
    { period: '1405/02', orderToman: 1_200_000_000 },
    { period: '1405/03', orderToman: 980_000_000 },
    { period: '1405/04', orderToman: 1_450_000_000 },
    { period: '1405/05', orderToman: 1_100_000_000 },
    { period: '1405/06', orderToman: 1_750_000_000 },
    { period: '1405/07', orderToman: 2_100_000_000 },
    { period: '1405/08', orderToman: 1_850_000_000 },
  ]);
}

export function resetProcurementStoresForTest(): void {
  prByTenant.clear();
  poByTenant.clear();
  suppliersByTenant.clear();
  rfqByTenant.clear();
}

export async function getProcurementOverview(): Promise<ProcurementOverviewDto> {
  syncProcurementProjection();
  const tenantId = TenantContext.requireTenantId();
  const fromProjection = readProcurementHubKpis(tenantId);
  const prs = [...prStore().values()];
  const pendingIds = prs
    .filter((r) => r.status === 'sent' || r.status === 'draft')
    .slice(0, 5)
    .map((r) => r.number);

  const kpis = fromProjection ?? {
    pendingRequestToman: 5_419_000_000,
    openPoToman: 5_123_000_000,
    overduePoCount: 3,
    dueThisWeekPoCount: 2,
    incompleteReceiptCount: 0,
    activeSuppliers: 57,
    newSuppliersThisYear: 57,
    sources: ['projection_procurement_hub'],
  };

  return {
    kpis: {
      pendingRequestToman: kpis.pendingRequestToman,
      pendingRequestIds: pendingIds.length ? pendingIds : ['PR-00008', 'PR-00004', 'PR-00005'],
      openPoToman: kpis.openPoToman,
      overduePoCount: kpis.overduePoCount,
      dueThisWeekPoCount: kpis.dueThisWeekPoCount,
      incompleteReceiptCount: kpis.incompleteReceiptCount,
      activeSuppliers: kpis.activeSuppliers,
      newSuppliersThisYear: kpis.newSuppliersThisYear,
    },
    monthlyTrend: readProcurementMonthlyTrend(tenantId),
    recentRequests: prs.slice(0, 8),
  };
}

export async function listPurchaseRequests(): Promise<PurchaseRequestDto[]> {
  return [...prStore().values()];
}

export type PurchaseRequestSubmitResult = PurchaseRequestDto & {
  approvalRequired?: boolean;
  workflowInstanceId?: string;
};

export async function createPurchaseRequest(
  body: CreatePurchaseRequestBody,
  opts?: { approverUserId?: string; approverRole?: string },
): Promise<PurchaseRequestSubmitResult> {
  if (!body.title?.trim()) throw new BadRequestException('title is required');
  if (!body.requestDate?.trim()) throw new BadRequestException('requestDate is required');
  if (!body.lines?.length) throw new BadRequestException('at least one line is required');

  const estimatedToman = body.lines.reduce(
    (s, l) => s + (l.estimatedUnitToman ?? 0) * l.quantity,
    0,
  );

  const number = nextPr();
  const tenantId = TenantContext.requireTenantId();
  let status: PurchaseRequestDto['status'] = 'approved';
  let approvalRequired = false;
  let workflowInstanceId: string | undefined;

  if (estimatedToman >= procurementPrApprovalTomanThreshold()) {
    const wf = resolvePurchaseRequestApproval({
      tenantId,
      entityId: number,
      approverUserId: opts?.approverUserId,
      approverRole: opts?.approverRole,
    });
    approvalRequired = wf.approvalRequired;
    workflowInstanceId = wf.workflowInstanceId;
    status = wf.approvalRequired ? 'sent' : 'approved';
  }

  const memo: PurchaseRequestDto = {
    number,
    title: body.title.trim(),
    purpose: body.purpose?.trim(),
    warehouse: body.warehouse?.trim(),
    project: body.project?.trim(),
    costCenter: body.costCenter?.trim(),
    requestDate: body.requestDate.trim(),
    needDate: body.needDate?.trim(),
    note: body.note?.trim(),
    status,
    estimatedToman: estimatedToman || 1,
    lines: body.lines,
  };
  prStore().set(memo.number, memo);
  syncProcurementProjection();

  await emitProcurementDomainEvent({
    eventType: OPS_EVENTS.PURCHASE_REQUEST_SUBMITTED,
    aggregateId: memo.number,
    payload: {
      number: memo.number,
      estimatedToman: memo.estimatedToman,
      status: memo.status,
      approvalRequired,
      workflowInstanceId,
    },
  });

  if (memo.status === 'approved') {
    await emitProcurementDomainEvent({
      eventType: OPS_EVENTS.PURCHASE_REQUEST_APPROVED,
      aggregateId: memo.number,
      payload: { number: memo.number, estimatedToman: memo.estimatedToman },
    });
  }

  return { ...memo, approvalRequired, workflowInstanceId };
}

export async function approvePurchaseRequest(
  prNumber: string,
  opts: { approverUserId: string; approverRole?: string },
): Promise<PurchaseRequestDto> {
  const key = prNumber.trim();
  const pr = prStore().get(key);
  if (!pr) throw new NotFoundException(`PR ${key} not found`);

  const wf = resolvePurchaseRequestApproval({
    tenantId: TenantContext.requireTenantId(),
    entityId: key,
    approverUserId: opts.approverUserId,
    approverRole: opts.approverRole,
  });

  if (wf.approvalRequired) {
    throw new BadRequestException(`approval still pending:${wf.workflowInstanceId ?? ''}`);
  }

  pr.status = 'approved';
  prStore().set(key, pr);
  syncProcurementProjection();

  await emitProcurementDomainEvent({
    eventType: OPS_EVENTS.PURCHASE_REQUEST_APPROVED,
    aggregateId: key,
    payload: { number: key, estimatedToman: pr.estimatedToman, workflowInstanceId: wf.workflowInstanceId },
  });

  return pr;
}

export function getProcurementThresholds() {
  return getProcurementThresholdSnapshot();
}

export async function listPurchaseOrders(): Promise<PurchaseOrderDto[]> {
  return [...poStore().values()];
}

export function getPurchaseOrder(number: string): PurchaseOrderDto | undefined {
  return poStore().get(number.trim());
}

/** پس از رسید WMS — به‌روزرسانی پیشرفت تحویل و وضعیت PO */
export function applyPurchaseOrderReceiptProgress(
  poNumber: string,
  receivedLines: Array<{ sku: string; quantity: number }>,
): PurchaseOrderDto | undefined {
  const key = poNumber.trim();
  const po = poStore().get(key);
  if (!po) return undefined;

  for (const rl of receivedLines) {
    const sku = rl.sku.trim();
    const line = po.lines.find((l) => l.sku === sku);
    if (!line) continue;
    line.receivedQuantity = (line.receivedQuantity ?? 0) + rl.quantity;
  }

  const fullyReceived = po.lines.every((l) => (l.receivedQuantity ?? 0) >= l.quantity);
  po.status = fullyReceived ? 'full_receipt' : 'partial_receipt';
  poStore().set(po.number, po);
  syncProcurementProjection();
  return po;
}

export async function listApprovedPurchaseRequests(): Promise<PurchaseRequestDto[]> {
  return [...prStore().values()].filter((r) => r.status === 'approved');
}

export type PurchaseOrderSubmitResult = PurchaseOrderDto & {
  approvalRequired?: boolean;
  workflowInstanceId?: string;
};

export async function createPurchaseOrder(
  body: CreatePurchaseOrderBody,
  opts?: { bypassPoApproval?: boolean },
): Promise<PurchaseOrderSubmitResult> {
  if (!body.supplierCode?.trim() || !body.supplierName?.trim()) {
    throw new BadRequestException('supplier is required');
  }
  if (!body.orderDate?.trim()) throw new BadRequestException('orderDate is required');
  if (!body.lines?.length) throw new BadRequestException('at least one line is required');

  const prKey = body.purchaseRequestNumber?.trim();
  if (prKey) {
    const pr = prStore().get(prKey);
    if (!pr) throw new BadRequestException(`purchase request ${prKey} not found`);
    if (pr.status !== 'approved') throw new BadRequestException(`purchase request ${prKey} is not approved`);
  }

  const lines = body.lines.map((l) => ({
    sku: l.sku.trim(),
    quantity: l.quantity,
    unit: l.unit.trim(),
    unitPriceToman: l.unitPriceToman,
    lineTotalToman: l.quantity * l.unitPriceToman,
  }));
  const totalToman = lines.reduce((s, l) => s + l.lineTotalToman, 0);
  const number = nextPo();
  const tenantId = TenantContext.requireTenantId();

  let status: PurchaseOrderDto['status'] = 'approved';
  let approvalRequired = false;
  let workflowInstanceId: string | undefined;

  if (!opts?.bypassPoApproval && totalToman >= procurementPoApprovalTomanThreshold()) {
    const wf = resolvePurchaseOrderApproval({ tenantId, entityId: number });
    approvalRequired = wf.approvalRequired;
    workflowInstanceId = wf.workflowInstanceId;
    status = wf.approvalRequired ? 'sent' : 'approved';
  }

  const po: PurchaseOrderDto = {
    number,
    purchaseRequestNumber: body.purchaseRequestNumber?.trim(),
    project: body.project?.trim(),
    supplierCode: body.supplierCode.trim(),
    supplierName: body.supplierName.trim(),
    orderDate: body.orderDate.trim(),
    deliveryDate: body.deliveryDate?.trim(),
    note: body.note?.trim(),
    status,
    totalToman,
    lines,
  };
  poStore().set(po.number, po);
  syncProcurementProjection();

  await emitProcurementDomainEvent({
    eventType: OPS_EVENTS.PURCHASE_ORDER_PLACED,
    aggregateId: po.number,
    payload: {
      number: po.number,
      purchaseRequestNumber: po.purchaseRequestNumber,
      supplierCode: po.supplierCode,
      totalToman: po.totalToman,
      approvalRequired,
      workflowInstanceId,
    },
  });

  if (po.status === 'approved') {
    await emitProcurementDomainEvent({
      eventType: OPS_EVENTS.PURCHASE_ORDER_APPROVED,
      aggregateId: po.number,
      payload: { number: po.number, totalToman: po.totalToman },
    });
  }

  return { ...po, approvalRequired, workflowInstanceId };
}

export async function approvePurchaseOrder(
  poNumber: string,
  opts: { approverUserId: string; approverRole?: string },
): Promise<PurchaseOrderDto> {
  const key = poNumber.trim();
  const po = poStore().get(key);
  if (!po) throw new NotFoundException(`PO ${key} not found`);

  const wf = resolvePurchaseOrderApproval({
    tenantId: TenantContext.requireTenantId(),
    entityId: key,
    approverUserId: opts.approverUserId,
    approverRole: opts.approverRole,
  });

  if (wf.approvalRequired) {
    throw new BadRequestException(`approval still pending:${wf.workflowInstanceId ?? ''}`);
  }

  po.status = 'approved';
  poStore().set(key, po);
  syncProcurementProjection();

  await emitProcurementDomainEvent({
    eventType: OPS_EVENTS.PURCHASE_ORDER_APPROVED,
    aggregateId: key,
    payload: { number: key, totalToman: po.totalToman, workflowInstanceId: wf.workflowInstanceId },
  });

  return po;
}

export async function listSuppliers(): Promise<SupplierDto[]> {
  return [...supplierStore().values()];
}

export async function createSupplier(body: CreateSupplierBody): Promise<SupplierDto> {
  if (!body.name?.trim()) throw new BadRequestException('name is required');
  const code = body.code?.trim() || nextSupplierCode();
  if (supplierStore().has(code)) throw new BadRequestException(`Supplier ${code} exists`);

  const row: SupplierDto = {
    code,
    name: body.name.trim(),
    openOrders: 0,
    totalOrders: 0,
    mobile: body.mobile?.trim(),
    nationalId: body.nationalId?.trim(),
    economicCode: body.economicCode?.trim(),
    address: body.address?.trim(),
    entityType: body.entityType ?? 'legal',
  };
  supplierStore().set(code, row);
  syncProcurementProjection();
  return row;
}

export async function getSupplier(code: string): Promise<SupplierDto | null> {
  return supplierStore().get(code) ?? null;
}

export async function listRfqs(): Promise<RfqDto[]> {
  return [...rfqStore().values()];
}

export async function createRfq(body: CreateRfqBody): Promise<RfqDto> {
  if (!body.title?.trim()) throw new BadRequestException('title is required');
  if (!body.deadline?.trim()) throw new BadRequestException('deadline is required');
  if (!body.invitedSupplierCodes?.length) throw new BadRequestException('invited suppliers required');

  const row: RfqDto = {
    number: nextRfq(),
    title: body.title.trim(),
    purchaseRequestNumber: body.purchaseRequestNumber?.trim(),
    deadline: body.deadline.trim(),
    status: 'open',
    invitedSupplierCodes: body.invitedSupplierCodes.map((c) => c.trim()).filter(Boolean),
    quotes: [],
  };
  rfqStore().set(row.number, row);
  return row;
}

export async function getProcurementReports(): Promise<ProcurementReportsDto> {
  syncProcurementProjection();
  const tenantId = TenantContext.requireTenantId();
  const overview = await getProcurementOverview();
  const prs = [...prStore().values()];
  const pos = [...poStore().values()];
  const rfqs = [...rfqStore().values()];
  const suppliers = [...supplierStore().values()];

  const openStatuses = new Set(['draft', 'sent', 'approved', 'partial_receipt']);
  const supplierOpenPo = suppliers.map((s) => {
    const open = pos.filter((p) => p.supplierCode === s.code && openStatuses.has(p.status));
    return {
      supplierCode: s.code,
      supplierName: s.name,
      openOrderCount: open.length,
      openToman: open.reduce((sum, p) => sum + p.totalToman, 0),
    };
  }).filter((r) => r.openOrderCount > 0 || r.openToman > 0);

  return {
    kpis: overview.kpis,
    monthlyTrend: readProcurementMonthlyTrend(tenantId),
    counts: {
      purchaseRequests: prs.length,
      purchaseOrders: pos.length,
      openRfqs: rfqs.filter((r) => r.status === 'open' || r.status === 'comparing').length,
      awardedRfqs: rfqs.filter((r) => r.status === 'awarded').length,
      suppliers: suppliers.length,
    },
    supplierOpenPo,
  };
}

export async function awardRfq(rfqNumber: string, body: AwardRfqBody): Promise<{ rfq: RfqDto; order: PurchaseOrderDto }> {
  const rfq = rfqStore().get(rfqNumber);
  if (!rfq) throw new NotFoundException(`RFQ ${rfqNumber} not found`);
  if (rfq.status === 'awarded' && rfq.purchaseOrderNumber) {
    const existing = poStore().get(rfq.purchaseOrderNumber);
    if (existing) return { rfq, order: existing };
  }
  const supplierCode = body.supplierCode?.trim();
  if (!supplierCode) throw new BadRequestException('supplierCode is required');

  const quote = rfq.quotes.find((q) => q.supplierCode === supplierCode);
  if (!quote) throw new BadRequestException('no quote from this supplier');

  const orderDate = body.orderDate?.trim() || '۱۴۰۵/۰۸/۱۲';
  const deliveryDate = body.deliveryDate?.trim() || '۱۴۰۵/۰۸/۲۵';

  const poBody: CreatePurchaseOrderBody = {
    purchaseRequestNumber: rfq.purchaseRequestNumber,
    supplierCode: quote.supplierCode,
    supplierName: quote.supplierName,
    orderDate,
    deliveryDate,
    note: `صدور از ${rfq.number}`,
    lines: quote.lines.map((l) => ({
      sku: l.sku,
      quantity: l.quantity,
      unit: l.unit,
      unitPriceToman: l.unitPriceToman,
    })),
  };

  const order = await createPurchaseOrder(poBody, { bypassPoApproval: true });
  rfq.status = 'awarded';
  rfq.awardedSupplierCode = supplierCode;
  rfq.purchaseOrderNumber = order.number;
  rfqStore().set(rfq.number, rfq);

  const supplier = supplierStore().get(supplierCode);
  if (supplier) {
    supplier.openOrders += 1;
    supplier.totalOrders += 1;
    supplier.lastOrderDate = orderDate;
    supplierStore().set(supplierCode, supplier);
  }

  syncProcurementProjection();

  await emitProcurementDomainEvent({
    eventType: OPS_EVENTS.RFQ_AWARDED,
    aggregateId: rfq.number,
    payload: {
      rfqNumber: rfq.number,
      supplierCode: quote.supplierCode,
      purchaseOrderNumber: order.number,
      totalToman: order.totalToman,
    },
  });

  return { rfq, order };
}

export async function addRfqQuote(rfqNumber: string, body: AddRfqQuoteBody): Promise<RfqDto> {
  const rfq = rfqStore().get(rfqNumber);
  if (!rfq) throw new NotFoundException(`RFQ ${rfqNumber} not found`);
  if (!body.lines?.length) throw new BadRequestException('lines required');

  const lines = body.lines.map((l) => ({
    sku: l.sku.trim(),
    quantity: l.quantity,
    unit: l.unit.trim(),
    unitPriceToman: l.unitPriceToman,
    leadDays: l.leadDays,
    lineTotal: l.quantity * l.unitPriceToman,
  }));
  const totalToman = lines.reduce((s, l) => s + l.quantity * l.unitPriceToman, 0);

  const quote = {
    supplierCode: body.supplierCode.trim(),
    supplierName: body.supplierName.trim(),
    submittedAt: '۱۴۰۵/۰۸/۱۲',
    lines: lines.map(({ lineTotal: _, ...rest }) => rest),
    totalToman,
  };

  rfq.quotes = rfq.quotes.filter((q) => q.supplierCode !== quote.supplierCode);
  rfq.quotes.push(quote);
  rfq.status = rfq.quotes.length >= 2 ? 'comparing' : 'open';
  rfqStore().set(rfq.number, rfq);
  return rfq;
}

export async function listSupplierInvoices(): Promise<import('./procurement.dto').SupplierInvoiceDto[]> {
  const orders = await listPurchaseOrders();
  return orders
    .filter((o) => o.status === 'partial_receipt' || o.status === 'full_receipt')
    .map((o) => ({
      number: `AP-${o.number.replace(/^PO-?/i, '')}`,
      poNumber: o.number,
      supplierName: o.supplierName,
      amountToman: o.totalToman,
      status: o.status === 'full_receipt' ? ('posted' as const) : ('draft' as const),
      orderDate: o.orderDate,
    }));
}

export function procurementSource(): string {
  return 'in-memory + projection_procurement_hub';
}
