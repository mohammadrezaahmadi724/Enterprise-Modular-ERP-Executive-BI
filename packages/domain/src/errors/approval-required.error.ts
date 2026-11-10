export class ApprovalRequiredError extends Error {
  readonly code = 'APPROVAL_REQUIRED';
  constructor(operation: string) {
    super(`Approval workflow required for: ${operation}`);
    this.name = 'ApprovalRequiredError';
  }
}
