export class InvariantViolationError extends Error {
    code = 'INVARIANT_VIOLATION';
    constructor(message) {
        super(message);
        this.name = 'InvariantViolationError';
    }
}
//# sourceMappingURL=invariant-violation.error.js.map