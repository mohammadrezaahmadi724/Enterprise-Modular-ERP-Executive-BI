import {
  Approve,
  StartWorkflow,
  isEntityApproved,
  registerWorkflowDefinition,
} from '@repo/db-erp-finance';

export function procurementPrApprovalTomanThreshold(): number {
  const raw = process.env.PROCUREMENT_PR_APPROVAL_TOMAN_THRESHOLD;
  const n = raw !== undefined && raw !== '' ? Number(raw) : 50_000_000;
  return Number.isFinite(n) && n > 0 ? n : 50_000_000;
}

export function procurementPoApprovalTomanThreshold(): number {
  const raw = process.env.PROCUREMENT_PO_APPROVAL_TOMAN_THRESHOLD;
  const n = raw !== undefined && raw !== '' ? Number(raw) : 100_000_000;
  return Number.isFinite(n) && n > 0 ? n : 100_000_000;
}

export function getProcurementThresholdSnapshot(): {
  prApprovalToman: number;
  poApprovalToman: number;
} {
  return {
    prApprovalToman: procurementPrApprovalTomanThreshold(),
    poApprovalToman: procurementPoApprovalTomanThreshold(),
  };
}

function ensureProcurementPrWorkflow(tenantId: string): void {
  registerWorkflowDefinition({
    id: '00000000-0000-4000-8000-procpr0001',
    tenantId,
    code: 'procurement_pr',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید درخواست خرید', approverRole: 'CFO', timeoutHours: 72 }],
  });
}

export function resolvePurchaseRequestApproval(input: {
  tenantId: string;
  entityId: string;
  approverUserId?: string;
  approverRole?: string;
}): { approvalRequired: boolean; workflowInstanceId?: string } {
  ensureProcurementPrWorkflow(input.tenantId);
  if (isEntityApproved('purchase_request', input.entityId)) {
    return { approvalRequired: false };
  }

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'procurement_pr',
    version: 1,
    entityType: 'purchase_request',
    entityId: input.entityId,
  });

  if (input.approverUserId?.trim()) {
    Approve(wf.id, input.approverUserId.trim(), input.approverRole?.trim() || 'CFO', 'تأیید درخواست خرید');
  }

  if (!isEntityApproved('purchase_request', input.entityId)) {
    return { approvalRequired: true, workflowInstanceId: wf.id };
  }
  return { approvalRequired: false, workflowInstanceId: wf.id };
}

function ensureProcurementPoWorkflow(tenantId: string): void {
  registerWorkflowDefinition({
    id: '00000000-0000-4000-8000-procpo0001',
    tenantId,
    code: 'procurement_po',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید سفارش خرید', approverRole: 'CFO', timeoutHours: 72 }],
  });
}

export function resolvePurchaseOrderApproval(input: {
  tenantId: string;
  entityId: string;
  approverUserId?: string;
  approverRole?: string;
}): { approvalRequired: boolean; workflowInstanceId?: string } {
  ensureProcurementPoWorkflow(input.tenantId);
  if (isEntityApproved('purchase_order', input.entityId)) {
    return { approvalRequired: false };
  }

  const wf = StartWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'procurement_po',
    version: 1,
    entityType: 'purchase_order',
    entityId: input.entityId,
  });

  if (input.approverUserId?.trim()) {
    Approve(wf.id, input.approverUserId.trim(), input.approverRole?.trim() || 'CFO', 'تأیید سفارش خرید');
  }

  if (!isEntityApproved('purchase_order', input.entityId)) {
    return { approvalRequired: true, workflowInstanceId: wf.id };
  }
  return { approvalRequired: false, workflowInstanceId: wf.id };
}
