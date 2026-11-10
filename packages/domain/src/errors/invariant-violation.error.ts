export class InvariantViolationError extends Error {
  readonly code = 'INVARIANT_VIOLATION';
  constructor(message: string) {
    super(message);
    this.name = 'InvariantViolationError';
  }
}
