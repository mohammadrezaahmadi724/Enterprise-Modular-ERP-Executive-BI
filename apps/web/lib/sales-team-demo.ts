import { formatToman } from './finance-receivables-demo';

export type TeamMemberKpi = {
  name: string;
  salesToman: number;
  winRatePct: number;
  quoteCount: number;
  rank: number;
};

export const TEAM_MONTH_TOMAN = 42_800_000_000;
export const TEAM_TARGET_PCT = 88;

export const TEAM_MEMBERS: TeamMemberKpi[] = [
  { name: 'سارا احمدی', salesToman: 12_400_000_000, winRatePct: 32, quoteCount: 48, rank: 1 },
  { name: 'رضا کاظمی', salesToman: 9_800_000_000, winRatePct: 28, quoteCount: 41, rank: 2 },
  { name: 'مریم صادقی', salesToman: 7_200_000_000, winRatePct: 24, quoteCount: 36, rank: 3 },
  { name: 'علی رضایی', salesToman: 5_100_000_000, winRatePct: 19, quoteCount: 29, rank: 4 },
];

export { formatToman };
