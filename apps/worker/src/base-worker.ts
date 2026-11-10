import type { Job } from 'bullmq';
import { TenantContext } from '@repo/domain';
import { logger } from '@repo/observability';

export type TenantJobData = {
  tenantId: string;
  userId?: string;
  correlationId: string;
  traceId?: string;
  [key: string]: unknown;
};

export async function runWithTenantContext<T>(
  job: Job<TenantJobData>,
  processor: (job: Job<TenantJobData>) => Promise<T>,
): Promise<T> {
  const { tenantId, correlationId, traceId, userId } = job.data;
  return TenantContext.runAsync(
    {
      tenantId,
      userId: userId ?? '00000000-0000-4000-8000-000000000099',
      correlationId,
      traceId: traceId ?? correlationId,
      isSuperAdmin: false,
    },
    async () => {
      logger.info({ jobId: job.id, name: job.name }, 'Processing job');
      return processor(job);
    },
  );
}
