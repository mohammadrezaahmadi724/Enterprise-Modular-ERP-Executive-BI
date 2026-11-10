export class EventOrderingError extends Error {
  readonly code = 'EVENT_OUT_OF_ORDER';
  constructor(
    public readonly aggregateId: string,
    public readonly expected: number,
    public readonly actual: number,
  ) {
    super(`Out-of-order event for ${aggregateId}: expected v${expected}, got v${actual}`);
    this.name = 'EventOrderingError';
  }
}

/** بررسی ترتیم aggregateVersion قبل از مصرف رویداد */
export function assertEventOrdering(
  aggregateId: string,
  eventVersion: number,
  lastProcessedVersion: number,
): void {
  const expected = lastProcessedVersion + 1;
  if (eventVersion !== expected) {
    throw new EventOrderingError(aggregateId, expected, eventVersion);
  }
}
