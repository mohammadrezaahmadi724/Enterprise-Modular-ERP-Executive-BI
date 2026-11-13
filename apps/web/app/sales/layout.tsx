import type { Metadata } from 'next';
import { SalesModuleShell } from '../../components/sales/SalesModuleShell';

export const metadata: Metadata = {
  title: 'فروش و CRM',
};

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return <SalesModuleShell>{children}</SalesModuleShell>;
}
