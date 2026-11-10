export type CurrencyCode = 'IRR' | 'IRT' | 'USD' | 'EUR';
/** مبلغ پولی با دقت bigint (ریال/سنت) */
export declare class Money {
    readonly amount: bigint;
    readonly currency: CurrencyCode;
    private constructor();
    static of(amount: bigint, currency: CurrencyCode): Money;
    private assertSameCurrency;
    add(other: Money): Money;
    subtract(other: Money): Money;
    multiply(factor: bigint): Money;
    format(locale?: string): string;
}
//# sourceMappingURL=money.d.ts.map