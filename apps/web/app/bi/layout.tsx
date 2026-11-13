import { BiModuleShell } from '../../components/bi/BiModuleShell';

export default function BiLayout({ children }: { children: React.ReactNode }) {
  return <BiModuleShell>{children}</BiModuleShell>;
}
