export class PeriodLockedError extends Error {
  readonly code = 'PERIOD_LOCKED';
  constructor(periodId: string) {
    super(`Fiscal period is closed: ${periodId}`);
    this.name = 'PeriodLockedError';
  }
}
