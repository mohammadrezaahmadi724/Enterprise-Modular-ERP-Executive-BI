import { InvariantViolationError } from './errors/invariant-violation.error.js';

export type CurrencyCode = 'IRR' | 'IRT' | 'USD' | 'EUR';

/** مبلغ پولی با دقت bigint (ریال/سنت) */
export class Money {
  readonly amount: bigint;
  readonly currency: CurrencyCode;

  private constructor(amount: bigint, currency: CurrencyCode) {
    this.amount = amount;
    this.currency = currency;
  }

  static of(amount: bigint, currency: CurrencyCode): Money {
    return new Money(amount, currency);
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new InvariantViolationError(
        `Currency mismatch: ${this.currency} vs ${other.currency}`,
      );
    }
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.of(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.of(this.amount - other.amount, this.currency);
  }

  multiply(factor: bigint): Money {
    return Money.of(this.amount * factor, this.currency);
  }

  format(locale = 'fa-IR'): string {
    const minorUnit = this.currency === 'IRR' || this.currency === 'IRT' ? 0 : 2;
    const major = Number(this.amount) / 10 ** minorUnit;
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency,
      maximumFractionDigits: minorUnit,
    }).format(major);
  }
}
