import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';

function loadRootEnv(): void {
  const envPath = resolve(__dirname, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadRootEnv();

const apiUrl = process.env.E2E_API_URL ?? 'http://127.0.0.1:3000';
const webUrl = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3001';

export default defineConfig({
  testDir: 'e2e',
  testMatch: /(projects-context|master-data-hub)\.spec\.ts/,
  timeout: 90_000,
  use: {
    baseURL: webUrl,
    ...devices['Desktop Chrome'],
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.E2E_SKIP_WEB_SERVER
    ? undefined
    : [
        {
          command: 'pnpm exec tsx src/main.ts',
          cwd: 'apps/api',
          url: `${apiUrl}/health`,
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
          env: {
            ...process.env,
            PORT: '3000',
            NODE_ENV: 'development',
          },
        },
        {
          command: process.env.CI ? 'pnpm --filter @repo/web start' : 'pnpm --filter @repo/web dev',
          url: `${webUrl}/dashboard`,
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
          env: {
            ...process.env,
            PORT: '3001',
            NEXT_PUBLIC_API_URL: apiUrl,
          },
        },
      ],
});
