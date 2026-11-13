import { ManufacturingModuleShell } from '../../components/manufacturing/ManufacturingModuleShell';

export default function ManufacturingLayout({ children }: { children: React.ReactNode }) {
  return <ManufacturingModuleShell>{children}</ManufacturingModuleShell>;
}
