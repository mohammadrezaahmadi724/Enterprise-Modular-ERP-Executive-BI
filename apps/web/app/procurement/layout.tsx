import type { Metadata } from 'next';
import { ProcurementModuleShell } from '../../components/procurement/ProcurementModuleShell';

export const metadata: Metadata = {
  title: 'خرید و تأمین',
};

export default function ProcurementLayout({ children }: { children: React.ReactNode }) {
  return <ProcurementModuleShell>{children}</ProcurementModuleShell>;
}
