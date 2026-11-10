import { describe, expect, it, beforeEach } from 'vitest';
import { ApprovalRequiredError } from '@repo/domain';
import { approve, resetWorkflowEngine } from '@repo/db-erp-finance';
import {
  assertSalesDiscountApproved,
  beginSalesDiscountApproval,
  setTenantSalesDiscountThreshold,
} from '@repo/db-erp-operations';

const TENANT = '11111111-1111-4111-8111-111111111111';

beforeEach(() => {
  resetWorkflowEngine();
  setTenantSalesDiscountThreshold(TENANT, 10);
});

describe('Sales discount approval', () => {
  it('تخفیف زیر آستانه بدون workflow', () => {
    expect(() => assertSalesDiscountApproved(TENANT, 'o1', 5)).not.toThrow();
  });

  it('تخفیف بالای آستانه بدون Approved → ApprovalRequiredError', () => {
    beginSalesDiscountApproval({
      tenantId: TENANT,
      orderId: 'o2',
      baseTotal: 1_000_000,
      discountPercent: 15,
    });
    expect(() => assertSalesDiscountApproved(TENANT, 'o2', 15)).toThrow(ApprovalRequiredError);
  });

  it('پس از Approve مجاز است', () => {
    const wfId = beginSalesDiscountApproval({
      tenantId: TENANT,
      orderId: 'o3',
      baseTotal: 2_000_000,
      discountPercent: 20,
    });
    approve(wfId, 'mgr', 'sales_manager');
    expect(() => assertSalesDiscountApproved(TENANT, 'o3', 20)).not.toThrow();
  });
});
