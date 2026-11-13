import { QcModuleShell } from '../../components/qc/QcModuleShell';

export default function QcLayout({ children }: { children: React.ReactNode }) {
  return <QcModuleShell>{children}</QcModuleShell>;
}
