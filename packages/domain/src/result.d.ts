export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;
export declare class Ok<T, E> {
    readonly value: T;
    readonly ok: true;
    constructor(value: T);
    map<U>(fn: (v: T) => U): Result<U, E>;
    flatMap<U>(fn: (v: T) => Result<U, E>): Result<U, E>;
    unwrapOr(_default: T): T;
}
export declare class Err<T, E> {
    readonly error: E;
    readonly ok: false;
    constructor(error: E);
    map<U>(_fn: (v: T) => U): Result<U, E>;
    flatMap<U>(_fn: (v: T) => Result<U, E>): Result<U, E>;
    unwrapOr(defaultValue: T): T;
}
export declare function ok<T, E = Error>(value: T): Result<T, E>;
export declare function err<T, E>(error: E): Result<T, E>;
//# sourceMappingURL=result.d.ts.map