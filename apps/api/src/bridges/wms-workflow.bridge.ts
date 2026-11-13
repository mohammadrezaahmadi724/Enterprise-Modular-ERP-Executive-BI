import { ApprovalRequiredError } from '@repo/domain';
import {
  Approve,
  StartWorkflow,
  isEntityApproved,
  registerWorkflowDefinition,
} from '@repo/db-erp-finance';

export function wmsAdjustmentQtyThreshold(): number {
  const raw = process.env.WMS_ADJUSTMENT_QTY_THRESHOLD;
  const n = raw !== undefined && raw !== '' ? Number(raw) : 100;
  return Number.isFinite(n) && n > 0 ? n : 100;
}

export function wmsStocktakingVarianceTomanThreshold(): number {
  const raw = process.env.WMS_STOCKTAKING_VARIANCE_TOMAN_THRESHOLD;
  const n = raw !== undefined && raw !== '' ? Number(raw) : 5_000_000;
  return Number.isFinite(n) && n > 0 ? n : 5_000_000;
}

function ensureWmsOpsWorkflow(tenantId: string): void {
  registerWorkflowDefinition({
    id: '00000000-0000-4000-8000-wmsops0001',
    tenantId,
    code: 'wms_ops',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید عملیات انبار', approverRole: 'CFO', timeoutHours: 48 }],
  });
}

export function adjustmentWorkflowEntityId(sku: string, warehouse: string, countedQty: number): string {
  return `adj:${sku.trim()}:${warehouse.trim()}:${countedQty}`;
}

export function assertWmsAdjustmentApproved(input: {
  tenantId: string;
  entityId: string;
  approverUserId?: string;
  approverRole?: string;
}): { workflowInstanceId?: string } {
  ensureWmsOpsWorkflow(input.tenantId);
  if (isEntityApproved('wms_adjustment', input.entityId)) return {};

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'wms_ops',
    version: 1,
    entityType: 'wms_adjustment',
    entityId: input.entityId,
  });

  if (input.approverUserId?.trim() && input.approverRole?.trim()) {
    Approve(wf.id, input.approverUserId.trim(), input.approverRole.trim(), 'WMS adjustment');
  }

  if (!isEntityApproved('wms_adjustment', input.entityId)) {
    throw new ApprovalRequiredError(`WmsAdjustment:${input.entityId}:${wf.id}`);
  }
  return { workflowInstanceId: wf.id };
}

export function assertWmsStocktakingApproved(input: {
  tenantId: string;
  sessionId: string;
  approverUserId?: string;
  approverRole?: string;
}): void {
  ensureWmsOpsWorkflow(input.tenantId);
  if (isEntityApproved('wms_stocktaking', input.sessionId)) return;

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'wms_ops',
    version: 1,
    entityType: 'wms_stocktaking',
    entityId: input.sessionId,
  });

  if (input.approverUserId?.trim()) {
    Approve(wf.id, input.approverUserId.trim(), 'CFO', 'انبارگردانی — مغایرت بالای آستانه');
  }

  if (!isEntityApproved('wms_stocktaking', input.sessionId)) {
    throw new ApprovalRequiredError(`WmsStocktaking:${input.sessionId}:${wf.id}`);
  }
}
