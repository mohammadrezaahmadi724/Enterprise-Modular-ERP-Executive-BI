import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { loadRootEnv } from './e2e/load-root-env';

loadRootEnv();

const packages = [
  'packages/db-platform',
  'packages/db-erp-finance',
  'packages/db-erp-operations',
  'packages/db-erp-bi-risk',
  'packages/db-erp-hr',
  'packages/db-alerts',
];

for (const pkg of packages) {
  console.log(`\n▶ prisma db push — ${pkg}\n`);
  const cwd = resolve(process.cwd(), pkg);
  const result = spawnSync('pnpm', ['exec', 'prisma', 'db', 'push', '--accept-data-loss'], {
    cwd,
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('\n✔ db:push:all complete\n');
