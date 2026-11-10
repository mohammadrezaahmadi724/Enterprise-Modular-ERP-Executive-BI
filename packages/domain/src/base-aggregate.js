/** کلاس پایه Aggregate Root */
export class BaseAggregate {
    aggregateVersion = 0;
    domainEvents = [];
    addEvent(event) {
        this.domainEvents.push(event);
        this.incrementVersion();
    }
    clearEvents() {
        const events = [...this.domainEvents];
        this.domainEvents.length = 0;
        return events;
    }
    incrementVersion() {
        this.aggregateVersion += 1;
    }
    get version() {
        return this.aggregateVersion;
    }
}
//# sourceMappingURL=base-aggregate.js.map