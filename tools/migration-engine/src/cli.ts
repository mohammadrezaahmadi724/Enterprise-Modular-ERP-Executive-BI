#!/usr/bin/env node
import { runMigration } from './pipeline.js';

const args = process.argv.slice(2);
const source = (args.find((a) => a.startsWith('--source='))?.split('=')[1] ?? 'csv') as 'csv' | 'sqlite' | 'mysql';
const target = (args.find((a) => a.startsWith('--target='))?.split('=')[1] ?? 'postgres') as 'postgres';
const dryRun = args.includes('--dry-run') || !args.includes('--write');
const tenantId = process.env.MIGRATION_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

if (target !== 'postgres') {
  console.error('Only postgres target supported in Wave 5');
  process.exit(1);
}

const report = runMigration({ source, target, dryRun, tenantId });
console.log(JSON.stringify(report, null, 2));
if (report.contractViolations.length > 0) process.exit(2);
