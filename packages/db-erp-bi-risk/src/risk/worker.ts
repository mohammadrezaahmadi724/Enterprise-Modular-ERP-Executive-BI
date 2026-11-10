import { onDomainEvent } from './evaluator.js';

export function runDailyRiskEvaluation(tenantId: string): void {
  onDomainEvent(tenantId, 'cron.daily');
}

export function runEventDrivenRisk(tenantId: string, eventType: string): void {
  onDomainEvent(tenantId, eventType);
}
