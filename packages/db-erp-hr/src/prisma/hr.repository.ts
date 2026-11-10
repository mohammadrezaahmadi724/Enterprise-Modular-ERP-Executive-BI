import { randomUUID } from 'node:crypto';
import { TenantContext } from '@repo/domain';
import { rlsSessionEnabled } from '@repo/db-core-adapter';
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
  return hrPrisma.employee.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function listPayslipsPrisma(): Promise<PayslipRow[]> {
  if (!hrPersistenceEnabled()) return [];
  const tenantId = TenantContext.requireTenantId();
  return hrPrisma.payslipSnapshot.findMany({
    where: { tenantId },
    orderBy: { periodEnd: 'desc' },
    take: 50,
  });
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
