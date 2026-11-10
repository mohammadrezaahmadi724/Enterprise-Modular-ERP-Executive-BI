import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      'packages/**/test/**/*.spec.ts',
      'packages/**/contracts/**/*.spec.ts',
      'packages/**/integration/**/*.spec.ts',
      'packages/**/e2e/**/*.spec.ts',
      'apps/**/test/**/*.spec.ts',
      'apps/web/test/**/*.spec.ts',
      'apps/marketing/test/**/*.spec.ts',
      'packages/contracts/test/**/*.spec.ts',
      'tools/**/test/**/*.spec.ts',
    ],
    testTimeout: 120_000,
    hookTimeout: 120_000,
    pool: 'forks',
  },
  resolve: {
    alias: {
      '@repo/domain': path.resolve(__dirname, 'packages/domain/src/index.ts'),
      '@repo/module-sdk': path.resolve(__dirname, 'packages/module-sdk/src/index.ts'),
      '@repo/db-core-adapter': path.resolve(__dirname, 'packages/db-core-adapter/src/index.ts'),
      '@repo/observability': path.resolve(__dirname, 'packages/observability/src/index.ts'),
      '@repo/testing': path.resolve(__dirname, 'packages/testing/src/index.ts'),
      '@repo/contracts': path.resolve(__dirname, 'packages/contracts/src/index.ts'),
      '@repo/db-erp-finance': path.resolve(__dirname, 'packages/db-erp-finance/src/index.ts'),
      '@repo/db-erp-operations': path.resolve(__dirname, 'packages/db-erp-operations/src/index.ts'),
      '@repo/db-erp-bi-risk': path.resolve(__dirname, 'packages/db-erp-bi-risk/src/index.ts'),
      '@repo/db-platform': path.resolve(__dirname, 'packages/db-platform/src/index.ts'),
      '@repo/db-erp-hr': path.resolve(__dirname, 'packages/db-erp-hr/src/index.ts'),
      '@repo/db-alerts': path.resolve(__dirname, 'packages/db-alerts/src/index.ts'),
    },
  },
});
