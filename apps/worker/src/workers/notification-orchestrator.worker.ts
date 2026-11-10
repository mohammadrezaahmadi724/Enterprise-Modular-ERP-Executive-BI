import { Worker, Queue } from 'bullmq';
import { getBullConnection } from '../redis';
import { logger } from '@repo/observability';
import { orchestrateNotifications, type AlertRecord, type AlertSeverity } from '@repo/db-alerts';

export function startNotificationOrchestratorWorker(): Worker {
  const connection = getBullConnection();
  const queue = new Queue('notification-orchestrator', {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
    },
  });

  const worker = new Worker(
    'notification-orchestrator',
    async (job) => {
      const data = job.data as {
        tenantId: string;
        alert: AlertRecord;
        templateKey: string;
        recipients: { userId?: string; role?: string }[];
        severity: AlertSeverity;
        entityId: string;
        templateVersion: number;
        correlationId: string;
      };
      await orchestrateNotifications(data);
      logger.info({ templateKey: data.templateKey }, 'Notification orchestrator');
      return { ok: true };
    },
    { connection, concurrency: 8 },
  );

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Notification orchestrator failed — DLQ');
  });

  void queue;
  return worker;
}
