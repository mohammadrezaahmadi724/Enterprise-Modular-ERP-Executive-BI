import { EventEmitter } from 'node:events';
import type { AlertRecord } from '../alerts/alert.service.js';

const hub = new EventEmitter();

export function emitAlertSocket(tenantId: string, alert: AlertRecord): void {
  hub.emit(`alert:${tenantId}`, alert);
}

export function subscribeAlerts(tenantId: string, handler: (alert: AlertRecord) => void): () => void {
  const channel = `alert:${tenantId}`;
  hub.on(channel, handler);
  return () => hub.off(channel, handler);
}

export function getSocketHub() {
  return hub;
}
