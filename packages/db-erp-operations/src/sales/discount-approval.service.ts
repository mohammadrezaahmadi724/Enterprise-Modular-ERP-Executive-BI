import { randomUUID } from 'node:crypto';
import { ApprovalRequiredError } from '@repo/domain';
import { isEntityApproved, registerWorkflowDefinition, startWorkflow } from '@repo/db-erp-finance';

const settings = new Map<string, { salesDiscountApprovalPercent: number }>();

export function setTenantSalesDiscountThreshold(tenantId: string, percent: number): void {
  settings.set(tenantId, { salesDiscountApprovalPercent: percent });
}

export function getTenantSalesDiscountThreshold(tenantId: string): number {
  return settings.get(tenantId)?.salesDiscountApprovalPercent ?? 10;
}

export type ApplySalesDiscountInput = {
  tenantId: string;
  orderId: string;
  baseTotal: number;
  discountPercent: number;
  approverRole?: string;
};

export function beginSalesDiscountApproval(input: ApplySalesDiscountInput): string {
  const threshold = getTenantSalesDiscountThreshold(input.tenantId);
  if (input.discountPercent <= threshold) return input.orderId;

  registerWorkflowDefinition({
    id: 'sales-discount-def',
    tenantId: input.tenantId,
    code: 'sales_discount',
    version: 1,
    steps: [
      {
        stepOrder: 1,
        nameFa: 'تایید تخفیف فروش',
        approverRole: input.approverRole ?? 'sales_manager',
        timeoutHours: 24,
      },
    ],
  });
  const wf = startWorkflow({
    tenantId: input.tenantId,
    definitionCode: 'sales_discount',
    version: 1,
    entityType: 'sales_order_discount',
    entityId: input.orderId,
    correlationId: randomUUID(),
  });
  return wf.id;
}

export function assertSalesDiscountApproved(tenantId: string, orderId: string, discountPercent: number): void {
  const threshold = getTenantSalesDiscountThreshold(tenantId);
  if (discountPercent <= threshold) return;
  if (!isEntityApproved('sales_order_discount', orderId)) {
    throw new ApprovalRequiredError(`SalesDiscount:${orderId}`);
  }
}
