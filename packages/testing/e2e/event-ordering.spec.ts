import { describe, it, expect } from 'vitest';
import { assertEventOrdering, EventOrderingError } from '@repo/module-sdk';

describe('Event ordering DLQ — Wave 2', () => {
  it('ترتیب صحیح مجاز', () => {
    expect(() => assertEventOrdering('agg-1', 2, 1)).not.toThrow();
  });

  it('out-of-order → EventOrderingError', () => {
    expect(() => assertEventOrdering('agg-1', 3, 1)).toThrow(EventOrderingError);
  });
});
