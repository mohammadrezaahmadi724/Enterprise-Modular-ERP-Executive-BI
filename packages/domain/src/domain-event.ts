export type EventStatus = 'Pending' | 'Published' | 'Consumed' | 'Failed' | 'Dead';

/** قرارداد پایه رویدادهای دامنه */
export interface DomainEvent {
  eventId: string;
  eventType: string;
  schemaVersion: number;
  aggregateId: string;
  aggregateVersion: number;
  correlationId: string;
  causationId: string;
  tenantId: string;
  occurredAt: Date;
  payload: unknown;
}
