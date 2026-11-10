import { runRetentionJob } from '@repo/db-alerts';

export function startRetentionWorker(tenantId: string): { run: (at?: Date) => number } {
  return {
    run: (at?: Date) => runRetentionJob(tenantId, at ?? new Date()),
  };
}
