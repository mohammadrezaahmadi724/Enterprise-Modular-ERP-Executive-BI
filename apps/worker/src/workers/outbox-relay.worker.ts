import { Queue } from 'bullmq';
import { PrismaClient } from '@repo/db-platform';
import { getBullConnection } from '../redis';
import { logger } from '@repo/observability';

const prisma = new PrismaClient();

export function startOutboxRelayWorker(): { close: () => Promise<void> } {
  const connection = getBullConnection();
  const eventsQueue = new Queue('domain-events', { connection });

  const tick = async () => {
    try {
      const pending = await prisma.domainEventOutbox.findMany({
        where: { status: 'Pending' },
        orderBy: { createdAt: 'asc' },
        take: 50,
      });
      let relayed = 0;
      for (const evt of pending) {
        await eventsQueue.add(
          evt.eventType,
          {
            eventId: evt.eventId,
            tenantId: evt.tenantId,
            correlationId: evt.correlationId,
            payload: evt.payload as Record<string, unknown>,
          },
          { jobId: evt.eventId },
        );
        await prisma.domainEventOutbox.update({
          where: { id: evt.id },
          data: { status: 'Published', publishedAt: new Date() },
        });
        relayed++;
      }
      if (relayed > 0) logger.info({ relayed }, 'Outbox relay batch');
    } catch (err) {
      logger.error({ err }, 'Outbox relay error');
    }
  };

  void tick();
  const handle = setInterval(() => void tick(), 5_000);

  return {
    close: async () => {
      clearInterval(handle);
      await eventsQueue.close();
      await prisma.$disconnect();
    },
  };
}
