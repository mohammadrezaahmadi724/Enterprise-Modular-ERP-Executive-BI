import { AiMessagingModuleShell } from '../../components/ai/AiMessagingModuleShell';

export default function VoipLayout({ children }: { children: React.ReactNode }) {
  return <AiMessagingModuleShell>{children}</AiMessagingModuleShell>;
}
