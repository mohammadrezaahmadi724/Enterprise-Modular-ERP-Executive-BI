/**
 * تولید کلاینت Prisma برای همهٔ پکیج‌ها — ترتیبی (کاهش EPERM روی Windows).
 * قبل از اجرا سرورهای dev/api را ببندید.
 */
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
  console.log(`\n▶ prisma generate — ${pkg}\n`);
  const cwd = resolve(process.cwd(), pkg);
  const result = spawnSync('pnpm', ['exec', 'prisma', 'generate'], {
    cwd,
    stdio: 'inherit',
    shell: false,
    env: process.env,
  });
  if (result.status !== 0) {
    console.error(
      `\n✖ generate failed for ${pkg}. On Windows, close dev servers (api/web) and retry.\n`,
    );
    process.exit(result.status ?? 1);
  }
}

console.log('\n✔ db:generate:all complete\n');
