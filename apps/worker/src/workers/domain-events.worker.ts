import { Worker } from 'bullmq';
import { FINANCE_EVENTS } from '@repo/contracts';
import { seedMetric, seedProjection } from '@repo/db-erp-bi-risk';
import { getBullConnection } from '../redis';
import { logger } from '@repo/observability';
import { processGlEntryPostedEvent } from './financial-projection.worker';
import { runWithTenantContext, type TenantJobData } from '../base-worker';
import { startRiskEvaluatorWorker } from './risk-evaluator.worker';

type DomainJob = TenantJobData & {
  eventId: string;
  payload: Record<string, unknown>;
};

export function startDomainEventsWorker(): { close: () => Promise<void> } {
  const connection = getBullConnection();
  const risk = startRiskEvaluatorWorker();

  const worker = new Worker<DomainJob>(
    'domain-events',
    async (job) => {
      await runWithTenantContext(job, async () => {
        const { eventId, payload } = job.data;
        const day = new Date().toISOString().slice(0, 10);
        if (job.name === FINANCE_EVENTS.GL_ENTRY_POSTED) {
          const debit = Number(payload.debit ?? 0);
          const credit = Number(payload.credit ?? 0);
          processGlEntryPostedEvent({
            eventId,
            aggregateVersion: 1,
            tenantId: job.data.tenantId,
            debit,
            credit,
            accountId: String(payload.accountId ?? 'unknown'),
            periodStart: String(payload.periodStart ?? day),
          });
          seedMetric(job.data.tenantId, 'posted_gl_count', 1, day);
          seedProjection(job.data.tenantId, 'projection_financial_summary', 'cash', {
            netCash: debit - credit,
            postedToday: debit,
          });
          risk.onEvent(FINANCE_EVENTS.GL_ENTRY_POSTED);
        }
        logger.info({ jobId: job.id, name: job.name }, 'Domain event processed');
      });
    },
    { connection, concurrency: 4 },
  );

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Domain event job failed');
  });

  return {
    close: async () => {
      await worker.close();
    },
  };
}
