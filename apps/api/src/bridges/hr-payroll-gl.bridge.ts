import { HR_EVENTS } from '@repo/contracts';
import { TenantContext } from '@repo/domain';
import {
  createJournalDraftPrisma,
  financePersistenceEnabled,
  postJournalDraftPrisma,
} from '@repo/db-erp-finance';
import { recordDomainEvent } from '../outbox/record-domain-event';

export const PAYROLL_GL_ACCOUNTS = {
  payrollExpense: '5101',
  salariesPayable: '2101',
} as const;

/** Application bridge — HR حقوق ↔ GL بدون import Prisma متقابل. */
export async function postPayrollPayslipGl(input: {
  payslipId: string;
  netPayRial: bigint;
  employeeId: string;
}): Promise<{ journalEntryId: string } | null> {
  if (!financePersistenceEnabled()) return null;
  const tenantId = TenantContext.requireTenantId();
  const draft = await createJournalDraftPrisma(tenantId, [
    {
      accountId: PAYROLL_GL_ACCOUNTS.payrollExpense,
      debit: input.netPayRial,
      credit: 0n,
    },
    {
      accountId: PAYROLL_GL_ACCOUNTS.salariesPayable,
      debit: 0n,
      credit: input.netPayRial,
    },
  ]);
  const posted = await postJournalDraftPrisma(draft.id);
  await recordDomainEvent({
    eventType: HR_EVENTS.PAYSLIP_FINALIZED,
    aggregateId: input.payslipId,
    payload: {
      payslipId: input.payslipId,
      employeeId: input.employeeId,
      journalEntryId: posted.id,
      netPay: input.netPayRial.toString(),
    },
  });
  return { journalEntryId: posted.id };
}
