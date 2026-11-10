export class CircularDependencyError extends Error {
  readonly code = 'CIRCULAR_MODULE_DEPENDENCY';
  constructor(public readonly cyclePath: string[]) {
    super(`Circular module dependency detected: ${cyclePath.join(' -> ')}`);
    this.name = 'CircularDependencyError';
  }
}
