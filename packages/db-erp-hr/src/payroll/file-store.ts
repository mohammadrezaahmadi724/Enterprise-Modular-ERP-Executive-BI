import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { PayslipRecord, TaxBracket } from './payroll.service.js';

export function payrollPersistenceEnabled(): boolean {
  return process.env.ERP_PAYROLL_PERSISTENCE === '1';
}

function storePath(): string {
  return process.env.ERP_PAYROLL_STORE_PATH ?? join(process.cwd(), '.data', 'payroll-store.json');
}

export type PayrollSnapshot = {
  payslips: PayslipRecord[];
  taxBrackets: TaxBracket[];
};

export function loadPayrollSnapshot(): PayrollSnapshot | null {
  if (!payrollPersistenceEnabled()) return null;
  const path = storePath();
  if (!existsSync(path)) return null;
  try {
    const raw = JSON.parse(readFileSync(path, 'utf8')) as PayrollSnapshot;
    return {
      payslips: raw.payslips.map((p) => ({
        ...p,
        periodStart: new Date(p.periodStart),
        periodEnd: new Date(p.periodEnd),
        finalizedAt: p.finalizedAt ? new Date(p.finalizedAt) : undefined,
      })),
      taxBrackets: raw.taxBrackets,
    };
  } catch {
    return null;
  }
}

export function savePayrollSnapshot(snapshot: PayrollSnapshot): void {
  if (!payrollPersistenceEnabled()) return;
  const path = storePath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(snapshot, null, 2), 'utf8');
}
