import { describe, expect, it } from 'vitest';
import { runMigration } from '../src/pipeline.js';

describe('Migration reconciliation', () => {
  it('Dry-Run بدون insert', () => {
    const report = runMigration({
      source: 'csv',
      target: 'postgres',
      dryRun: true,
      tenantId: 't1',
    });
    expect(report.inserted).toBe(0);
    expect(report.extracted).toBeGreaterThan(0);
    expect(report.contractViolations).toHaveLength(0);
  });
});
