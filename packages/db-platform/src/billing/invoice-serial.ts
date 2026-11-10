export type SerialState = {
  pattern: string;
  lastNumber: number;
  resetPeriod: 'Yearly' | 'Monthly' | 'Never';
  periodKey: string;
};

const states = new Map<string, SerialState>();

export function resetSerialStore(): void {
  states.clear();
}

export function initSerialPattern(
  key: string,
  pattern: string,
  resetPeriod: SerialState['resetPeriod'] = 'Yearly',
): void {
  states.set(key, {
    pattern,
    lastNumber: 0,
    resetPeriod,
    periodKey: currentPeriodKey(resetPeriod),
  });
}

function currentPeriodKey(reset: SerialState['resetPeriod']): string {
  const d = new Date();
  if (reset === 'Never') return 'all';
  if (reset === 'Monthly') return `${d.getFullYear()}-${d.getMonth() + 1}`;
  return `${d.getFullYear()}`;
}

/** شماره فاکتور بدون پرش */
export function nextInvoiceNumber(key: string): string {
  const state = states.get(key);
  if (!state) throw new Error('Serial pattern not initialized');
  const period = currentPeriodKey(state.resetPeriod);
  if (period !== state.periodKey) {
    state.lastNumber = 0;
    state.periodKey = period;
  }
  state.lastNumber += 1;
  return state.pattern.replace('{seq}', String(state.lastNumber).padStart(6, '0'));
}

export function peekLastNumber(key: string): number {
  return states.get(key)?.lastNumber ?? 0;
}
