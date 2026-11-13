import { WorkflowsModuleShell } from '../../components/workflows/WorkflowsModuleShell';

export default function WorkflowsLayout({ children }: { children: React.ReactNode }) {
  return <WorkflowsModuleShell>{children}</WorkflowsModuleShell>;
}
