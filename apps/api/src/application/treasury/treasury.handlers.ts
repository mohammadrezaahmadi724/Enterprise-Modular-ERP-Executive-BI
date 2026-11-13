import { TenantContext } from '@repo/domain';
import { postTreasuryTransaction } from '@repo/db-erp-finance';

export function postTreasuryTransactionCommand(input: {
  tenantId?: string;
  amount: bigint;
  bankGlAccountId: string;
  cashGlAccountId: string;
  workflowApproved: boolean;
}) {
  const tenantId = TenantContext.requireTenantId();
  return postTreasuryTransaction({ ...input, tenantId });
}
