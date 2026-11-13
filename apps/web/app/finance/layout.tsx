import type { Metadata } from 'next';
import { FinanceModuleShell } from '../../components/finance/FinanceModuleShell';

export const metadata: Metadata = {
  title: 'مالی و حسابداری',
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return <FinanceModuleShell>{children}</FinanceModuleShell>;
}
