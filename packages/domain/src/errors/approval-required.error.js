export class ApprovalRequiredError extends Error {
    code = 'APPROVAL_REQUIRED';
    constructor(operation) {
        super(`Approval workflow required for: ${operation}`);
        this.name = 'ApprovalRequiredError';
    }
}
//# sourceMappingURL=approval-required.error.js.map