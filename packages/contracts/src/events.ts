export const PLATFORM_EVENTS = {
  MODULE_ACTIVATED: 'platform.module.activated.v1',
  MODULE_DEACTIVATED: 'platform.module.deactivated.v1',
  TENANT_REGISTERED: 'platform.tenant.registered.v1',
  SEAT_LIMIT_REACHED: 'platform.seat.limit_reached.v1',
  BREAK_GLASS_REQUESTED: 'platform.break_glass.requested.v1',
  BREAK_GLASS_APPROVED: 'platform.break_glass.approved.v1',
  TENANT_USER_INVITED: 'platform.tenant_user.invited.v1',
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
  SALES_ORDER_SHIPPED: 'sales.order.shipped.v1',
  SALES_INVOICE_POSTED: 'sales.invoice.posted.v1',
  SALES_RETURN_POSTED: 'sales.return.posted.v1',
  SALES_RETURN_RESTOCKED: 'sales.return.restocked.v1',
} as const;

export const WORKFLOW_EVENTS = {
  WORKFLOW_STARTED: 'workflow.instance.started.v1',
  WORKFLOW_APPROVED: 'workflow.instance.approved.v1',
  WORKFLOW_ESCALATED: 'workflow.instance.escalated.v1',
} as const;

export const OPS_EVENTS = {
  PURCHASE_REQUEST_SUBMITTED: 'operations.purchase_request.submitted.v1',
  PURCHASE_REQUEST_APPROVED: 'operations.purchase_request.approved.v1',
  PURCHASE_ORDER_PLACED: 'operations.purchase_order.placed.v1',
  PURCHASE_ORDER_APPROVED: 'operations.purchase_order.approved.v1',
  RFQ_AWARDED: 'operations.rfq.awarded.v1',
  PROCUREMENT_COMPLETED: 'operations.procurement.completed.v1',
  DELIVERY_CONFIRMED: 'operations.delivery.confirmed.v1',
  PRODUCTION_COMPLETED: 'operations.production.completed.v1',
  LEAVE_APPROVED: 'hr.leave.approved.v1',
  POS_TRANSACTION_COMPLETED: 'operations.pos.transaction.completed.v1',
  STOCK_RECEIPT_POSTED: 'operations.stock_receipt.posted.v1',
  STOCK_ISSUE_POSTED: 'operations.stock_issue.posted.v1',
  STOCK_RESERVATION_CREATED: 'operations.stock_reservation.created.v1',
  STOCK_RECONCILIATION_RUN: 'operations.stock_reconciliation.run.v1',
  STOCK_COUNT_POSTED: 'operations.stock_count.posted.v1',
  STOCK_SERIAL_REGISTERED: 'operations.stock_serial.registered.v1',
  STOCK_LOT_REGISTERED: 'operations.stock_lot.registered.v1',
  STOCK_LOT_EXPIRING: 'operations.stock_lot.expiring.v1',
  STOCK_LOT_EXPIRED: 'operations.stock_lot.expired.v1',
  STOCK_LOT_CONSUMED: 'operations.stock_lot.consumed.v1',
  PROJECT_CREATED: 'operations.project.created.v1',
  PROJECT_TASK_CREATED: 'operations.project.task.created.v1',
  PROJECT_TASK_UPDATED: 'operations.project.task.updated.v1',
  MASTER_RECORD_ARCHIVED: 'operations.master_record.archived.v1',
  TENANT_BRANDING_UPDATED: 'operations.tenant_branding.updated.v1',
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
