export class BreakGlassRequiredError extends Error {
  readonly code = 'BREAK_GLASS_REQUIRED';
  constructor() {
    super('Break-glass session required for this access');
    this.name = 'BreakGlassRequiredError';
  }
}
