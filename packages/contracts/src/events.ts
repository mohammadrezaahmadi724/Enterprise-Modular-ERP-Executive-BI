export const PLATFORM_EVENTS = {
  MODULE_ACTIVATED: 'platform.module.activated.v1',
  MODULE_DEACTIVATED: 'platform.module.deactivated.v1',
  TENANT_REGISTERED: 'platform.tenant.registered.v1',
  SEAT_LIMIT_REACHED: 'platform.seat.limit_reached.v1',
  BREAK_GLASS_REQUESTED: 'platform.break_glass.requested.v1',
  BREAK_GLASS_APPROVED: 'platform.break_glass.approved.v1',
  TRIAL_ABUSE_BLOCKED: 'platform.trial.abuse_blocked.v1',
  SUBSCRIPTION_PURCHASED: 'platform.subscription.purchased.v1',
  PAYMENT_SUCCEEDED: 'platform.payment.succeeded.v1',
} as const;

export const FINANCE_EVENTS = {
  GL_ENTRY_POSTED: 'finance.gl_entry.posted.v1',
  GL_ENTRY_REVERSED: 'finance.gl_entry.reversed.v1',
  FISCAL_PERIOD_CLOSED: 'finance.fiscal_period.closed.v1',
  TREASURY_TRANSACTION_POSTED: 'finance.treasury_transaction.posted.v1',
} as const;

export const SALES_EVENTS = {
  SALES_ORDER_CONFIRMED: 'sales.order.confirmed.v1',
} as const;

export const WORKFLOW_EVENTS = {
  WORKFLOW_STARTED: 'workflow.instance.started.v1',
  WORKFLOW_APPROVED: 'workflow.instance.approved.v1',
  WORKFLOW_ESCALATED: 'workflow.instance.escalated.v1',
} as const;

export const OPS_EVENTS = {
  PROCUREMENT_COMPLETED: 'operations.procurement.completed.v1',
  DELIVERY_CONFIRMED: 'operations.delivery.confirmed.v1',
  PRODUCTION_COMPLETED: 'operations.production.completed.v1',
  LEAVE_APPROVED: 'hr.leave.approved.v1',
  POS_TRANSACTION_COMPLETED: 'operations.pos.transaction.completed.v1',
} as const;

export const RISK_EVENTS = {
  RISK_FINDING_CREATED: 'risk.finding.created.v1',
} as const;

export const HR_EVENTS = {
  PAYSLIP_FINALIZED: 'hr.payslip.finalized.v1',
} as const;

export const ASSET_EVENTS = {
  DEPRECIATION_POSTED: 'finance.depreciation.posted.v1',
} as const;

export const INTEGRATION_EVENTS = {
  N8N_WORKFLOW_EXECUTED: 'integrations.n8n.workflow.executed.v1',
  BACKUP_FAILED: 'platform.backup.failed.v1',
  BACKUP_RESTORED: 'platform.backup.restored.v1',
} as const;

export const ALERT_EVENTS = {
  ALERT_CREATED: 'alerts.alert.created.v1',
  NOTIFICATION_QUEUED: 'alerts.notification.queued.v1',
  NOTIFICATION_SENT: 'alerts.notification.sent.v1',
  NOTIFICATION_BOUNCED: 'alerts.notification.bounced.v1',
} as const;
