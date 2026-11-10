import { describe, expect, it, beforeEach } from 'vitest';
import { resetWorkflowEngine } from '@repo/db-erp-finance';
import {
  addTaxBracket,
  calculatePayroll,
  finalizePayslip,
  resetPayrollStore,
  updatePayslipDraft,
} from '../src/payroll/payroll.service';

const TENANT = '11111111-1111-4111-8111-111111111111';

beforeEach(() => {
  resetPayrollStore();
  resetWorkflowEngine();
  addTaxBracket({ effectiveYear: 1402, minIncome: 0, maxIncome: null, rate: 0.1 });
});

describe('Payslip immutability', () => {
  it('UPDATE پس از Finalize باید fail شود', () => {
    const slip = calculatePayroll({
      tenantId: TENANT,
      employeeId: 'emp-1',
      periodStart: new Date('2023-07-01T00:00:00Z'),
      periodEnd: new Date('2023-07-31T00:00:00Z'),
      baseSalary: 20_000_000,
    });
    finalizePayslip(slip.id, 'hr_manager');
    expect(() => updatePayslipDraft(slip.id, { overtime: 1_000_000 })).toThrow(/IMMUTABLE/);
  });
});
