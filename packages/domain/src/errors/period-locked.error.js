export class PeriodLockedError extends Error {
    code = 'PERIOD_LOCKED';
    constructor(periodId) {
        super(`Fiscal period is closed: ${periodId}`);
        this.name = 'PeriodLockedError';
    }
}
//# sourceMappingURL=period-locked.error.js.map