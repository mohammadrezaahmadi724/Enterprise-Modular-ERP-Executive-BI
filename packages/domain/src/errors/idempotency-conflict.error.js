export class IdempotencyConflictError extends Error {
    code = 'IDEMPOTENCY_CONFLICT';
    constructor(message = 'Idempotency key conflict') {
        super(message);
        this.name = 'IdempotencyConflictError';
    }
}
//# sourceMappingURL=idempotency-conflict.error.js.map