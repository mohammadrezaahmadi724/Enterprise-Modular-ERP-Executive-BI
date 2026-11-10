export class BreakGlassRequiredError extends Error {
    code = 'BREAK_GLASS_REQUIRED';
    constructor() {
        super('Break-glass session required for this access');
        this.name = 'BreakGlassRequiredError';
    }
}
//# sourceMappingURL=break-glass-required.error.js.map