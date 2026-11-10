import type { DomainEvent } from './domain-event.js';

/** کلاس پایه Aggregate Root */
export abstract class BaseAggregate {
  protected aggregateVersion = 0;
  private readonly domainEvents: DomainEvent[] = [];

  protected addEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
    this.incrementVersion();
  }

  clearEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    return events;
  }

  protected incrementVersion(): void {
    this.aggregateVersion += 1;
  }

  get version(): number {
    return this.aggregateVersion;
  }
}
