export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  readonly ok = true as const;
  constructor(readonly value: T) {}
  map<U>(fn: (v: T) => U): Result<U, E> {
    return new Ok(fn(this.value));
  }
  flatMap<U>(fn: (v: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }
  unwrapOr(_default: T): T {
    return this.value;
  }
}

export class Err<T, E> {
  readonly ok = false as const;
  constructor(readonly error: E) {}
  map<U>(_fn: (v: T) => U): Result<U, E> {
    return new Err(this.error);
  }
  flatMap<U>(_fn: (v: T) => Result<U, E>): Result<U, E> {
    return new Err(this.error);
  }
  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }
}

export function ok<T, E = Error>(value: T): Result<T, E> {
  return new Ok(value);
}

export function err<T, E>(error: E): Result<T, E> {
  return new Err(error);
}
