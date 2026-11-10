export class Ok {
    value;
    ok = true;
    constructor(value) {
        this.value = value;
    }
    map(fn) {
        return new Ok(fn(this.value));
    }
    flatMap(fn) {
        return fn(this.value);
    }
    unwrapOr(_default) {
        return this.value;
    }
}
export class Err {
    error;
    ok = false;
    constructor(error) {
        this.error = error;
    }
    map(_fn) {
        return new Err(this.error);
    }
    flatMap(_fn) {
        return new Err(this.error);
    }
    unwrapOr(defaultValue) {
        return defaultValue;
    }
}
export function ok(value) {
    return new Ok(value);
}
export function err(error) {
    return new Err(error);
}
//# sourceMappingURL=result.js.map