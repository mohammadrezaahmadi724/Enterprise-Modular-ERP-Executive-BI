import { FinanceModuleShell } from '../../components/finance/FinanceModuleShell';

export default function TreasuryFinanceLayout({ children }: { children: React.ReactNode }) {
  return <FinanceModuleShell>{children}</FinanceModuleShell>;
}
