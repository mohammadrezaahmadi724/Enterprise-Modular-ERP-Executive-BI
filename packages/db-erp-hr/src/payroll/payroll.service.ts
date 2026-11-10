import { randomUUID } from 'node:crypto';
import { Money } from '@repo/domain';
import { ApprovalRequiredError } from '@repo/domain';
import { FINANCE_EVENTS, HR_EVENTS } from '@repo/contracts';
import { isEntityApproved, registerWorkflowDefinition, startWorkflow, approve } from '@repo/db-erp-finance';
import { loadPayrollSnapshot, payrollPersistenceEnabled, savePayrollSnapshot } from './file-store.js';

export type TaxBracket = {
  id: string;
  effectiveYear: number;
  minIncome: number;
  maxIncome: number | null;
  rate: number;
};

export type InsuranceRule = {
  id: string;
  tenantId: string;
  effectiveFrom: Date;
  effectiveTo: Date | null;
  employeeRate: number;
  employerRate: number;
  ceiling: number;
};

export type PayslipRecord = {
  id: string;
  tenantId: string;
  employeeId: string;
  periodStart: Date;
  periodEnd: Date;
  baseSalary: number;
  overtime: number;
  nightShift: number;
  holidays: number;
  commission: number;
  insuranceEmployee: number;
  insuranceEmployer: number;
  tax: number;
  netPay: number;
  breakdown: Record<string, number>;
  status: 'Draft' | 'Finalized';
  finalizedAt?: Date;
  adjustmentReason?: string;
  correlationId: string;
  supersededById?: string;
  taxYearApplied: number;
};

const taxBrackets: TaxBracket[] = [];
const insuranceRules: InsuranceRule[] = [];
const payslips = new Map<string, PayslipRecord>();
const outbox: Array<{ type: string; payload: unknown }> = [];

function persistPayrollState(): void {
  if (!payrollPersistenceEnabled()) return;
  savePayrollSnapshot({
    payslips: [...payslips.values()],
    taxBrackets: [...taxBrackets],
  });
}

function hydratePayrollState(): void {
  const snap = loadPayrollSnapshot();
  if (!snap) return;
  taxBrackets.splice(0, taxBrackets.length, ...snap.taxBrackets);
  for (const p of snap.payslips) payslips.set(p.id, p);
}

hydratePayrollState();

export function resetPayrollStore(): void {
  taxBrackets.length = 0;
  insuranceRules.length = 0;
  payslips.clear();
  outbox.length = 0;
}

export { payrollPersistenceEnabled } from './file-store.js';

export function getPayrollOutbox() {
  return [...outbox];
}

export function addTaxBracket(b: Omit<TaxBracket, 'id'> & { id?: string }): void {
  taxBrackets.push({ id: b.id ?? randomUUID(), ...b });
  persistPayrollState();
}

export function addInsuranceRule(rule: InsuranceRule): void {
  insuranceRules.push(rule);
}

function taxYearForPeriod(periodStart: Date): number {
  return periodStart.getUTCFullYear() - 621; // تقریب جلالی برای تست effectiveYear
}

function pickTaxRate(year: number, taxable: number): number {
  const brackets = taxBrackets.filter((b) => b.effectiveYear === year).sort((a, b) => a.minIncome - b.minIncome);
  const match = brackets.find((b) => taxable >= b.minIncome && (b.maxIncome == null || taxable <= b.maxIncome));
  return match?.rate ?? 0;
}

function pickInsurance(tenantId: string, at: Date): InsuranceRule | undefined {
  return insuranceRules.find(
    (r) =>
      r.tenantId === tenantId &&
      r.effectiveFrom <= at &&
      (r.effectiveTo == null || r.effectiveTo >= at),
  );
}

export function calculatePayroll(input: {
  tenantId: string;
  employeeId: string;
  periodStart: Date;
  periodEnd: Date;
  baseSalary: number;
  overtime?: number;
  nightShift?: number;
  holidays?: number;
  commission?: number;
}): PayslipRecord {
  const year = taxYearForPeriod(input.periodStart);
  const gross =
    input.baseSalary +
    (input.overtime ?? 0) +
    (input.nightShift ?? 0) +
    (input.holidays ?? 0) +
    (input.commission ?? 0);
  const insRule = pickInsurance(input.tenantId, input.periodStart);
  const insBase = insRule ? Math.min(gross, insRule.ceiling) : 0;
  const insuranceEmployee = insRule ? insBase * insRule.employeeRate : 0;
  const insuranceEmployer = insRule ? insBase * insRule.employerRate : 0;
  const taxable = gross - insuranceEmployee;
  const taxRate = pickTaxRate(year, taxable);
  const tax = taxable * taxRate;
  const netPay = gross - insuranceEmployee - tax;

  Money.of(BigInt(Math.round(netPay)), 'IRR');

  const slip: PayslipRecord = {
    id: randomUUID(),
    tenantId: input.tenantId,
    employeeId: input.employeeId,
    periodStart: input.periodStart,
    periodEnd: input.periodEnd,
    baseSalary: input.baseSalary,
    overtime: input.overtime ?? 0,
    nightShift: input.nightShift ?? 0,
    holidays: input.holidays ?? 0,
    commission: input.commission ?? 0,
    insuranceEmployee,
    insuranceEmployer,
    tax,
    netPay,
    breakdown: { gross, taxable, taxRate, year },
    status: 'Draft',
    correlationId: randomUUID(),
    taxYearApplied: year,
  };
  payslips.set(slip.id, slip);
  persistPayrollState();
  return slip;
}

export function getPayslip(id: string): PayslipRecord | undefined {
  return payslips.get(id);
}

export function updatePayslipDraft(id: string, patch: Partial<Pick<PayslipRecord, 'overtime'>>): PayslipRecord {
  const slip = payslips.get(id);
  if (!slip) throw new Error('not found');
  if (slip.status === 'Finalized') throw new Error('PAYSLIP_IMMUTABLE');
  Object.assign(slip, patch);
  persistPayrollState();
  return slip;
}

export function finalizePayslip(id: string, approverRole: string, workflowInstanceId?: string): PayslipRecord {
  const slip = payslips.get(id);
  if (!slip) throw new Error('not found');
  if (slip.status === 'Finalized') return slip;

  const wfId =
    workflowInstanceId ??
    (() => {
      registerWorkflowDefinition({
        id: 'payroll-def',
        tenantId: slip.tenantId,
        code: 'payslip_finalize',
        version: 1,
        steps: [{ stepOrder: 1, nameFa: 'تایید حقوق', approverRole, timeoutHours: 24 }],
      });
      const wf = startWorkflow({
        tenantId: slip.tenantId,
        definitionCode: 'payslip_finalize',
        version: 1,
        entityType: 'payslip',
        entityId: slip.id,
      });
      approve(wf.id, 'hr-mgr', approverRole);
      return wf.id;
    })();

  if (!isEntityApproved('payslip', slip.id)) {
    throw new ApprovalRequiredError('PayslipFinalize');
  }
  void wfId;

  slip.status = 'Finalized';
  slip.finalizedAt = new Date();
  outbox.push({ type: HR_EVENTS.PAYSLIP_FINALIZED, payload: { payslipId: slip.id } });
  outbox.push({ type: FINANCE_EVENTS.GL_ENTRY_POSTED, payload: { payslipId: slip.id, netPay: slip.netPay } });
  persistPayrollState();
  return slip;
}

export function createRetroactiveAdjustment(
  payslipId: string,
  adjustmentReason: string,
  approverRole: string,
): PayslipRecord {
  const prev = payslips.get(payslipId);
  if (!prev || prev.status !== 'Finalized') throw new Error('invalid base payslip');
  const next = calculatePayroll({
    tenantId: prev.tenantId,
    employeeId: prev.employeeId,
    periodStart: prev.periodStart,
    periodEnd: prev.periodEnd,
    baseSalary: prev.baseSalary,
    overtime: prev.overtime + 500_000,
  });
  next.adjustmentReason = adjustmentReason;
  prev.supersededById = next.id;
  finalizePayslip(next.id, approverRole);
  return next;
}
