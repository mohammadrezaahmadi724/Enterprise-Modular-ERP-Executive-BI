import { randomUUID } from 'node:crypto';
import { ApprovalRequiredError, TenantContext } from '@repo/domain';
import { isEntityApproved, registerWorkflowDefinition, startWorkflow, approve } from '@repo/db-erp-finance';
import { rlsSessionEnabled, withRlsRead } from '@repo/db-core-adapter';
import { hrPersistenceEnabled, hrPrisma } from './client.js';
import { hrTransaction } from './rls.js';

export type EmployeeRow = {
  id: string;
  tenantId: string;
  employeeNumber: string;
  fullName: string;
  email?: string | null;
  status: string;
};

export type PayslipRow = {
  id: string;
  tenantId: string;
  employeeId: string;
  periodStart: Date;
  periodEnd: Date;
  netPay: { toString(): string };
  status: string;
  finalizedAt?: Date | null;
};

const DEMO_EMPLOYEE_ID = 'e0000000-0000-4000-8000-000000000001';

export async function ensureHrDemoSeed(tenantId: string): Promise<void> {
  if (!hrPersistenceEnabled()) return;
  await hrPrisma.employee.upsert({
    where: { tenantId_employeeNumber: { tenantId, employeeNumber: 'EMP-001' } },
    update: {},
    create: {
      id: DEMO_EMPLOYEE_ID,
      tenantId,
      employeeNumber: 'EMP-001',
      fullName: 'کارمند نمونه',
      nationalId: '0012345678',
      birthDate: new Date('1990-01-01'),
      hireDate: new Date('2020-03-21'),
      email: 'employee@demo.ir',
      status: 'Active',
    },
  });
}

export async function listEmployeesPrisma(): Promise<EmployeeRow[]> {
  if (!hrPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  await ensureHrDemoSeed(tenantId);
  const query = (client: typeof hrPrisma) =>
    client.employee.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  if (rlsSessionEnabled()) {
    return (await withRlsRead(hrPrisma, (tx) => query(tx as typeof hrPrisma))) as EmployeeRow[];
  }
  return query(hrPrisma);
}

export async function listPayslipsPrisma(): Promise<PayslipRow[]> {
  if (!hrPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  const query = (client: typeof hrPrisma) =>
    client.payslipSnapshot.findMany({
      where: { tenantId },
      orderBy: { periodEnd: 'desc' },
      take: 50,
    });
  if (rlsSessionEnabled()) {
    return (await withRlsRead(hrPrisma, (tx) => query(tx as typeof hrPrisma))) as PayslipRow[];
  }
  return query(hrPrisma);
}

export async function createPayslipDraftPrisma(input: {
  employeeId: string;
  netPay: number;
  baseSalary: number;
}): Promise<PayslipRow> {
  const tenantId = TenantContext.requireTenantId();
  const ctx = TenantContext.get();
  const periodStart = new Date();
  periodStart.setDate(1);
  const periodEnd = new Date(periodStart);
  periodEnd.setMonth(periodEnd.getMonth() + 1);
  periodEnd.setDate(0);
  const data = {
    id: randomUUID(),
    tenantId,
    employeeId: input.employeeId,
    periodStart,
    periodEnd,
    baseSalary: input.baseSalary,
    overtime: 0,
    nightShift: 0,
    holidays: 0,
    commission: 0,
    insuranceEmployee: 0,
    insuranceEmployer: 0,
    tax: 0,
    netPay: input.netPay,
    breakdown: { base: input.baseSalary },
    status: 'Draft' as const,
    correlationId: ctx?.correlationId ?? randomUUID(),
    taxYearApplied: periodStart.getFullYear(),
  };
  return rlsSessionEnabled()
    ? hrTransaction((tx) => tx.payslipSnapshot.create({ data }))
    : hrPrisma.payslipSnapshot.create({ data });
}

function ensurePayslipWorkflow(tenantId: string) {
  registerWorkflowDefinition({
    id: '00000000-0000-4000-8000-payroll0001',
    tenantId,
    code: 'payslip_finalize',
    version: 1,
    steps: [{ stepOrder: 1, nameFa: 'تأیید حقوق', approverRole: 'HR_MANAGER', timeoutHours: 48 }],
  });
}

export async function finalizePayslipPrisma(
  payslipId: string,
  approverRole = 'HR_MANAGER',
): Promise<PayslipRow> {
  if (!hrPersistenceEnabled()) throw new Error('HR_PERSISTENCE disabled');
  const tenantId = TenantContext.requireTenantId();
  ensurePayslipWorkflow(tenantId);

  if (!isEntityApproved('payslip', payslipId)) {
    const wf = startWorkflow({
      tenantId,
      definitionCode: 'payslip_finalize',
      version: 1,
      entityType: 'payslip',
      entityId: payslipId,
    });
    approve(wf.id, 'hr-api', approverRole);
  }

  if (!isEntityApproved('payslip', payslipId)) {
    throw new ApprovalRequiredError('PayslipFinalize');
  }

  const run = async (tx: import('../generated/index.js').Prisma.TransactionClient) => {
    const slip = await tx.payslipSnapshot.findFirst({ where: { id: payslipId, tenantId } });
    if (!slip) throw new Error('Payslip not found');
    if (slip.status === 'Finalized') return slip;
    return tx.payslipSnapshot.update({
      where: { id: payslipId },
      data: { status: 'Finalized', finalizedAt: new Date() },
    });
  };

  return rlsSessionEnabled() ? hrTransaction(run) : hrPrisma.$transaction(run);
}
