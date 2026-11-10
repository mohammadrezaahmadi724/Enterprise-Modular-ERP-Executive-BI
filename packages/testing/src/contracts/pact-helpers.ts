/** کمک‌کننده سبک قرارداد — Wave 0 بدون Pact کامل */
export type ContractExpectation = {
  consumer: string;
  provider: string;
  interaction: string;
};

export function createInMemoryPact(): {
  expectations: ContractExpectation[];
  add: (e: ContractExpectation) => void;
} {
  const expectations: ContractExpectation[] = [];
  return {
    expectations,
    add: (e) => expectations.push(e),
  };
}
