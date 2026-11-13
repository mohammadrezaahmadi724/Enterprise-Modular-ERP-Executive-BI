import { OPS_EVENTS } from '@repo/contracts';
import { registerAlertRule } from './alert-evaluator.js';

const registeredTenants = new Set<string>();

export function ensureWmsLotAlertRules(tenantId: string): void {
  if (registeredTenants.has(tenantId)) return;
  registeredTenants.add(tenantId);

  registerAlertRule({
    id: `wms-lot-expiring-${tenantId}`,
    tenantId,
    moduleCode: 'operations-base',
    eventType: OPS_EVENTS.STOCK_LOT_EXPIRING,
    condition: {},
    severity: 'warning',
    templateKey: 'subscription_expiring_7d',
    recipients: [{ role: 'warehouse_manager' }],
    deduplicationWindowSec: 86_400,
    channels: ['InApp'],
    isActive: true,
  });

  registerAlertRule({
    id: `wms-lot-expired-${tenantId}`,
    tenantId,
    moduleCode: 'operations-base',
    eventType: OPS_EVENTS.STOCK_LOT_EXPIRED,
    condition: {},
    severity: 'critical',
    templateKey: 'new_alert_critical',
    recipients: [{ role: 'warehouse_manager' }],
    deduplicationWindowSec: 86_400,
    channels: ['InApp'],
    isActive: true,
  });
}

export function resetWmsLotAlertRulesForTest(): void {
  registeredTenants.clear();
}
