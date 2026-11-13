import { AiMessagingModuleShell } from '../../components/ai/AiMessagingModuleShell';

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return <AiMessagingModuleShell>{children}</AiMessagingModuleShell>;
}
