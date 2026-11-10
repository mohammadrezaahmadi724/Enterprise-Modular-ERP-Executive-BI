export class IdempotencyConflictError extends Error {
  readonly code = 'IDEMPOTENCY_CONFLICT';
  constructor(message = 'Idempotency key conflict') {
    super(message);
    this.name = 'IdempotencyConflictError';
  }
}
