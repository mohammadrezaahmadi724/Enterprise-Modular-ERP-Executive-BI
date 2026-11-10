import { describe, expect, it, beforeEach } from 'vitest';
import { evaluateRisks, listBuiltinRules, listFindings, resetRiskEngine } from '../src/risk/evaluator';

beforeEach(() => resetRiskEngine());

describe('Risk evaluator', () => {
  it('۶ قاعده و ۴ الگوریتم', () => {
    expect(listBuiltinRules()).toHaveLength(6);
    evaluateRisks('t1', [
      { ruleCode: 'cash_pressure', value: 0.3 },
      { ruleCode: 'sales_concentration_hhi', shares: [0.8, 0.1, 0.1] },
    ]);
    expect(listFindings('t1').length).toBeGreaterThanOrEqual(2);
  });
});
