import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./e2e/global-setup.ts'),
  testDir: 'e2e',
  testMatch: 'estimate-wizard-marketing.spec.ts',
  timeout: 120_000,
  use: {
    baseURL: process.env.E2E_MARKETING_URL ?? 'http://127.0.0.1:3003',
    locale: 'fa-IR',
    ...devices['Desktop Chrome'],
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
