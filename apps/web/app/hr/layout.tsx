import type { Metadata } from 'next';
import { HrModuleShell } from '../../components/hr/HrModuleShell';

export const metadata: Metadata = {
  title: 'منابع انسانی',
};

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return <HrModuleShell>{children}</HrModuleShell>;
}
