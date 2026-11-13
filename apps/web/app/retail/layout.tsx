import { RetailModuleShell } from '../../components/retail/RetailModuleShell';

export default function RetailLayout({ children }: { children: React.ReactNode }) {
  return <RetailModuleShell>{children}</RetailModuleShell>;
}
