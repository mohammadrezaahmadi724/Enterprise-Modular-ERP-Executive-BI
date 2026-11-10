import type { DomainEvent } from './domain-event.js';
/** کلاس پایه Aggregate Root */
export declare abstract class BaseAggregate {
    protected aggregateVersion: number;
    private readonly domainEvents;
    protected addEvent(event: DomainEvent): void;
    clearEvents(): DomainEvent[];
    protected incrementVersion(): void;
    get version(): number;
}
//# sourceMappingURL=base-aggregate.d.ts.map