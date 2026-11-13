import { startOutboxRelayWorker } from './workers/outbox-relay.worker';
import { startDomainEventsWorker } from './workers/domain-events.worker';
import { startRiskEvaluatorWorker } from './workers/risk-evaluator.worker';
import { startRetentionWorker } from './workers/retention.worker';
import { startAlertEvaluatorWorker } from './workers/alert-evaluator.worker';
import { startNotificationOrchestratorWorker } from './workers/notification-orchestrator.worker';
import { startWmsExpiryScanWorker } from './workers/wms-expiry-scan.worker';

const relay = startOutboxRelayWorker();
const domainEvents = startDomainEventsWorker();
const risk = startRiskEvaluatorWorker();
const retention = startRetentionWorker(process.env.DEFAULT_TENANT_ID ?? '11111111-1111-4111-8111-111111111111');
const alertEvaluator = startAlertEvaluatorWorker();
const notificationOrchestrator = startNotificationOrchestratorWorker();
const wmsExpiryScan = startWmsExpiryScanWorker();

setInterval(() => risk.tickDaily(), 24 * 3600 * 1000);
setInterval(() => retention.run(), 24 * 3600 * 1000);

process.on('SIGTERM', async () => {
  await relay.close();
  await domainEvents.close();
  await alertEvaluator.close();
  await notificationOrchestrator.close();
  await wmsExpiryScan.close();
  process.exit(0);
});
