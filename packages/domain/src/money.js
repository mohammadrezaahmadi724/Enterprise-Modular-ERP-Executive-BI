import { InvariantViolationError } from './errors/invariant-violation.error.js';
/** مبلغ پولی با دقت bigint (ریال/سنت) */
export class Money {
    amount;
    currency;
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
    static of(amount, currency) {
        return new Money(amount, currency);
    }
    assertSameCurrency(other) {
        if (this.currency !== other.currency) {
            throw new InvariantViolationError(`Currency mismatch: ${this.currency} vs ${other.currency}`);
        }
    }
    add(other) {
        this.assertSameCurrency(other);
        return Money.of(this.amount + other.amount, this.currency);
    }
    subtract(other) {
        this.assertSameCurrency(other);
        return Money.of(this.amount - other.amount, this.currency);
    }
    multiply(factor) {
        return Money.of(this.amount * factor, this.currency);
    }
    format(locale = 'fa-IR') {
        const minorUnit = this.currency === 'IRR' || this.currency === 'IRT' ? 0 : 2;
        const major = Number(this.amount) / 10 ** minorUnit;
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: this.currency,
            maximumFractionDigits: minorUnit,
        }).format(major);
    }
}
//# sourceMappingURL=money.js.map