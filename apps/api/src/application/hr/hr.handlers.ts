import { ApprovalRequiredError } from '@repo/domain';
import {
  createPayslipDraftPrisma,
  finalizePayslipPrisma,
  hrPersistenceEnabled,
  listEmployeesPrisma,
  listPayslipsPrisma,
} from '@repo/db-erp-hr';
import { postPayrollPayslipGl } from '../../bridges/hr-payroll-gl.bridge';

export async function listEmployeesQuery() {
  if (!hrPersistenceEnabled()) return { employees: [], persistence: 'memory' as const };
  return { employees: await listEmployeesPrisma(), persistence: 'prisma' as const };
}

export async function listPayslipsQuery() {
  if (!hrPersistenceEnabled()) return { payslips: [], persistence: 'memory' as const };
  const rows = await listPayslipsPrisma();
  return {
    persistence: 'prisma' as const,
    payslips: rows.map((p) => ({
      ...p,
      netPay: p.netPay.toString(),
      periodStart: p.periodStart.toISOString(),
      periodEnd: p.periodEnd.toISOString(),
    })),
  };
}

export async function createPayslipDraftCommand(body: {
  employeeId: string;
  netPay: number;
  baseSalary: number;
}) {
  if (!hrPersistenceEnabled()) return { ok: false as const, reason: 'HR_PERSISTENCE disabled' };
  const row = await createPayslipDraftPrisma(body);
  return {
    ok: true as const,
    payslip: { id: row.id, netPay: row.netPay.toString(), status: row.status },
  };
}

export async function finalizePayslipCommand(id: string, approverRole?: string) {
  if (!hrPersistenceEnabled()) return { ok: false as const, reason: 'HR_PERSISTENCE disabled' };
  try {
    const slip = await finalizePayslipPrisma(id, approverRole ?? 'HR_MANAGER');
    const autoGl = process.env.PAYROLL_AUTO_GL === '1' || process.env.PAYROLL_AUTO_GL === 'true';
    const gl = autoGl
      ? await postPayrollPayslipGl({
          payslipId: slip.id,
          employeeId: slip.employeeId,
          netPayRial: BigInt(String(slip.netPay)),
        })
      : null;
    return {
      ok: true as const,
      payslip: {
        id: slip.id,
        status: slip.status,
        finalizedAt: slip.finalizedAt?.toISOString() ?? null,
        netPay: slip.netPay.toString(),
      },
      glPosted: gl ?? undefined,
    };
  } catch (error) {
    if (error instanceof ApprovalRequiredError) {
      return { ok: false as const, code: 'APPROVAL_REQUIRED' as const, message: 'تأیید workflow حقوق الزامی است.' };
    }
    throw error;
  }
}
