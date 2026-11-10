import { describe, expect, it, beforeEach } from 'vitest';
import { resetWorkflowEngine } from '@repo/db-erp-finance';
import {
  addTaxBracket,
  calculatePayroll,
  finalizePayslip,
  getPayslip,
  resetPayrollStore,
} from '../src/payroll/payroll.service';

const TENANT = '11111111-1111-4111-8111-111111111111';

beforeEach(() => {
  resetPayrollStore();
  resetWorkflowEngine();
  addTaxBracket({ effectiveYear: 1402, minIncome: 0, maxIncome: null, rate: 0.1 });
});

describe('Payroll effective-dated tax (خلأ ۱۴)', () => {
  it('تغییر tax_brackets در ۱۴۰۳ نباید Payslip نهایی ۱۴۰۲ را تغییر دهد', () => {
    const periodStart = new Date('2023-07-01T00:00:00Z');
    const slip = calculatePayroll({
      tenantId: TENANT,
      employeeId: 'emp-1',
      periodStart,
      periodEnd: new Date('2023-07-31T00:00:00Z'),
      baseSalary: 50_000_000,
    });
    finalizePayslip(slip.id, 'hr_manager');
    const frozen = getPayslip(slip.id)!;
    const taxBefore = frozen.tax;

    addTaxBracket({ effectiveYear: 1403, minIncome: 0, maxIncome: null, rate: 0.25 });

    const after = getPayslip(slip.id)!;
    expect(after.tax).toBe(taxBefore);
    expect(after.status).toBe('Finalized');
    expect(after.taxYearApplied).toBe(1402);
  });
});
