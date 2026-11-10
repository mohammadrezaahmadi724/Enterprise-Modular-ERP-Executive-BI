import type { AlertRecord } from '../../alerts/alert.service.js';
import { emitAlertSocket } from '../../realtime/socket-hub.js';

export function deliverInApp(tenantId: string, alert: AlertRecord): { ok: true } {
  emitAlertSocket(tenantId, alert);
  return { ok: true };
}
