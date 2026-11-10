import { createHash } from 'node:crypto';
import { createAlert, type AlertSeverity } from './alert.service.js';
import { evaluateCondition } from './condition-evaluator.js';
import { orchestrateNotifications } from '../notifications/orchestrator.js';

export type AlertRule = {
  id: string;
  tenantId: string;
  moduleCode: string;
  eventType: string;
  condition: Record<string, unknown>;
  severity: AlertSeverity;
  templateKey: string;
  recipients: { userId?: string; role?: string }[];
  deduplicationWindowSec: number;
  channels: string[];
  isActive: boolean;
};

const rules: AlertRule[] = [];

export function resetAlertRules(): void {
  rules.length = 0;
}

export function registerAlertRule(rule: AlertRule): void {
  rules.push(rule);
}

export function evaluateDomainEvent(input: {
  tenantId: string;
  eventType: string;
  payload: Record<string, unknown>;
  correlationId: string;
}): number {
  let created = 0;
  const active = rules.filter(
    (r) => r.isActive && r.tenantId === input.tenantId && r.eventType === input.eventType,
  );
  for (const rule of active) {
    if (!evaluateCondition(rule.condition, input.payload)) continue;
    const entityId = String(input.payload.entityId ?? input.payload.id ?? input.correlationId);
    const deduplicationKey = createHash('sha256')
      .update(`${rule.eventType}:${entityId}`)
      .digest('hex')
      .slice(0, 32);
    const alert = createAlert({
      tenantId: input.tenantId,
      moduleCode: rule.moduleCode,
      category: rule.eventType,
      severity: rule.severity,
      titleFa: `رویداد ${rule.eventType}`,
      bodyFa: JSON.stringify(input.payload),
      deduplicationKey,
      deduplicationWindowSec: rule.deduplicationWindowSec,
      sourceEntityId: entityId,
      sourceEntityType: rule.moduleCode,
    });
    if (!alert) continue;
    created += 1;
    orchestrateNotifications({
      tenantId: input.tenantId,
      alert,
      templateKey: rule.templateKey,
      recipients: rule.recipients,
      severity: rule.severity,
      entityId,
      templateVersion: 1,
      correlationId: input.correlationId,
    });
  }
  return created;
}
