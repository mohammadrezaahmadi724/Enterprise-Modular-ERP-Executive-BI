import { Queue, Worker } from 'bullmq';
import { FINANCE_EVENTS, OPS_EVENTS, SALES_EVENTS } from '@repo/contracts';
import { ensureWmsLotAlertRules } from '@repo/db-alerts';
import {
  publishSalesFulfillmentProjection,
  publishSalesReverseSupplyProjection,
  publishWmsExpiryKpi,
  seedMetric,
  seedProjection,
  type SalesFulfillmentKpis,
  type SalesReverseSupplyKpis,
} from '@repo/db-erp-bi-risk';
import { getBullConnection } from '../redis';
import { logger } from '@repo/observability';
import { processGlEntryPostedEvent } from './financial-projection.worker';
import { processWmsStockDomainEvent } from './wms-projection.worker';
import { runWithTenantContext, type TenantJobData } from '../base-worker';
import { startRiskEvaluatorWorker } from './risk-evaluator.worker';

type DomainJob = TenantJobData & {
  eventId: string;
  payload: Record<string, unknown>;
};

export function startDomainEventsWorker(): { close: () => Promise<void> } {
  const connection = getBullConnection();
  const risk = startRiskEvaluatorWorker();
  const alertQueue = new Queue('alert-evaluator', { connection });

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
        if (
          job.name === OPS_EVENTS.STOCK_RECEIPT_POSTED ||
          job.name === OPS_EVENTS.STOCK_ISSUE_POSTED ||
          job.name === OPS_EVENTS.STOCK_RESERVATION_CREATED ||
          job.name === OPS_EVENTS.STOCK_RECONCILIATION_RUN ||
          job.name === OPS_EVENTS.STOCK_COUNT_POSTED ||
          job.name === OPS_EVENTS.STOCK_SERIAL_REGISTERED
        ) {
          processWmsStockDomainEvent({
            tenantId: job.data.tenantId,
            eventId,
            eventType: job.name,
            payload,
          });
        }
        if (job.name === OPS_EVENTS.STOCK_LOT_EXPIRING || job.name === OPS_EVENTS.STOCK_LOT_EXPIRED) {
          if (
            job.name === OPS_EVENTS.STOCK_LOT_EXPIRING &&
            typeof payload.expiringCount === 'number' &&
            payload.snapshot === true
          ) {
            publishWmsExpiryKpi(job.data.tenantId, payload.expiringCount);
          } else {
            ensureWmsLotAlertRules(job.data.tenantId);
            const entityId = String(payload.entityId ?? payload.batchNo ?? eventId);
            await alertQueue.add(
              'wms-lot',
              {
                tenantId: job.data.tenantId,
                eventType: job.name,
                payload: { ...payload, entityId },
                correlationId: job.data.correlationId,
              },
              { jobId: `${job.name}:${entityId}:${job.data.tenantId}` },
            );
          }
        }
        if (
          job.name === SALES_EVENTS.SALES_ORDER_SHIPPED ||
          job.name === SALES_EVENTS.SALES_ORDER_CONFIRMED
        ) {
          const kpis = payload.fulfillmentKpis as SalesFulfillmentKpis | undefined;
          if (kpis && typeof kpis.ordersShipped === 'number') {
            publishSalesFulfillmentProjection(job.data.tenantId, {
              ordersReadyToShip: kpis.ordersReadyToShip,
              ordersShipped: kpis.ordersShipped,
              ordersAwaitingSupply: kpis.ordersAwaitingSupply,
            });
          }
        }
        if (job.name === SALES_EVENTS.SALES_ORDER_SHIPPED) {
          const day = new Date().toISOString().slice(0, 10);
          seedMetric(job.data.tenantId, 'sales_orders_shipped', 1, day);
        }
        if (
          job.name === SALES_EVENTS.SALES_RETURN_POSTED ||
          job.name === SALES_EVENTS.SALES_RETURN_RESTOCKED
        ) {
          const kpis = payload.reverseSupplyKpis as SalesReverseSupplyKpis | undefined;
          if (kpis && typeof kpis.returnsPostedMonth === 'number') {
            publishSalesReverseSupplyProjection(job.data.tenantId, {
              returnsPostedMonth: kpis.returnsPostedMonth,
              restockReceiptsMonth: kpis.restockReceiptsMonth,
              returnCreditTomanMonth: kpis.returnCreditTomanMonth,
            });
          }
          if (job.name === SALES_EVENTS.SALES_RETURN_POSTED) {
            const day = new Date().toISOString().slice(0, 10);
            seedMetric(job.data.tenantId, 'sales_returns_posted', 1, day);
          }
        }
        if (job.name === OPS_EVENTS.STOCK_RECEIPT_POSTED && payload.restockFromReturn) {
          const day = new Date().toISOString().slice(0, 10);
          seedMetric(job.data.tenantId, 'sales_restock_receipts', 1, day);
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
      await alertQueue.close();
      await worker.close();
    },
  };
}
