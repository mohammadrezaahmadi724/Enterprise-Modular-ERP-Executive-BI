import { DistributionModuleShell } from '../../components/distribution/DistributionModuleShell';

export default function DistributionLayout({ children }: { children: React.ReactNode }) {
  return <DistributionModuleShell>{children}</DistributionModuleShell>;
}
