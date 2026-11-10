import { runDailyRiskEvaluation, runEventDrivenRisk } from '@repo/db-erp-bi-risk';

const TENANT = process.env.DEFAULT_TENANT_ID ?? '11111111-1111-4111-8111-111111111111';

export function startRiskEvaluatorWorker(): { tickDaily: () => void; onEvent: (type: string) => void } {
  return {
    tickDaily: () => runDailyRiskEvaluation(TENANT),
    onEvent: (type: string) => runEventDrivenRisk(TENANT, type),
  };
}
