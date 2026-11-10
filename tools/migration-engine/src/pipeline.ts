import { SALES_EVENTS, PLATFORM_EVENTS } from '@repo/contracts';

export type MigrationConfig = {
  source: 'sqlite' | 'mysql' | 'csv';
  target: 'postgres';
  dryRun: boolean;
  tenantId: string;
};

export type ReconciliationReport = {
  extracted: number;
  transformed: number;
  inserted: number;
  mismatches: string[];
  contractViolations: string[];
};

export function extractRows(source: MigrationConfig['source']): Record<string, unknown>[] {
  if (source === 'csv') {
    return [
      { orderNumber: 'LEG-1001', total: 1_000_000 },
      { orderNumber: 'LEG-1002', total: 2_000_000 },
    ];
  }
  return [{ orderNumber: 'LEG-2001', total: 500_000 }];
}

export function transformRows(rows: Record<string, unknown>[], tenantId: string) {
  return rows.map((r) => ({
    tenantId,
    orderNumber: String(r.orderNumber),
    total: Number(r.total),
    correlationId: `migrate-${String(r.orderNumber)}`,
  }));
}

export function validateContracts(events: string[]): string[] {
  const allowed = new Set([...Object.values(SALES_EVENTS), ...Object.values(PLATFORM_EVENTS)]);
  return events.filter((e) => !allowed.has(e));
}

export function runMigration(config: MigrationConfig): ReconciliationReport {
  const rows = extractRows(config.source);
  const transformed = transformRows(rows, config.tenantId);
  const plannedEvents = transformed.map(() => SALES_EVENTS.SALES_ORDER_CONFIRMED);
  const contractViolations = validateContracts(plannedEvents);
  const inserted = config.dryRun ? 0 : transformed.length;
  return {
    extracted: rows.length,
    transformed: transformed.length,
    inserted,
    mismatches: rows.length === transformed.length ? [] : ['row-count-mismatch'],
    contractViolations,
  };
}
