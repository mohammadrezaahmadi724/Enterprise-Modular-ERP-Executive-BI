import { Worker, Queue } from 'bullmq';
import { getBullConnection } from '../redis';
import { logger } from '@repo/observability';
import { evaluateDomainEvent } from '@repo/db-alerts';

export function startAlertEvaluatorWorker(): Worker {
  const connection = getBullConnection();
  const queue = new Queue('alert-evaluator', { connection });

  const worker = new Worker(
    'alert-evaluator',
    async (job) => {
      const data = job.data as {
        tenantId: string;
        eventType: string;
        payload: Record<string, unknown>;
        correlationId: string;
      };
      const created = evaluateDomainEvent(data);
      logger.info({ created, eventType: data.eventType }, 'Alert evaluator');
      return { created };
    },
    { connection, concurrency: 4, settings: { backoffStrategy: () => 2000 } },
  );

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Alert evaluator failed');
  });

  void queue;
  return worker;
}
