/**
 * اجرای Prisma CLI با بارگذاری `.env` ریشه monorepo (برای db:push از PowerShell).
 *
 * Usage (from repo root):
 *   tsx tools/prisma-cli.ts packages/db-platform db push --accept-data-loss
 */
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { loadRootEnv } from './e2e/load-root-env';

loadRootEnv();

const packageDir = process.argv[2];
const prismaArgs = process.argv.slice(3);

if (!packageDir?.trim()) {
  console.error('Usage: tsx tools/prisma-cli.ts <package-path> <prisma subcommand> [...args]');
  process.exit(1);
}

if (!prismaArgs.length) {
  console.error('Missing prisma subcommand (e.g. db push, generate)');
  process.exit(1);
}

const cwd = resolve(process.cwd(), packageDir);
const result = spawnSync('pnpm', ['exec', 'prisma', ...prismaArgs], {
  cwd,
  stdio: 'inherit',
  shell: false,
  env: process.env,
});

process.exit(result.status ?? 1);
