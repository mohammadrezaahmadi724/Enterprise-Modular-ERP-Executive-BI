import type { Metadata } from 'next';
import { WmsModuleShell } from '../../components/wms/WmsModuleShell';

export const metadata: Metadata = {
  title: 'انبار',
};

export default function WmsLayout({ children }: { children: React.ReactNode }) {
  return <WmsModuleShell>{children}</WmsModuleShell>;
}
