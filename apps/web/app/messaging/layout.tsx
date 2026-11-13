import { AiMessagingModuleShell } from '../../components/ai/AiMessagingModuleShell';

export default function MessagingLayout({ children }: { children: React.ReactNode }) {
  return <AiMessagingModuleShell>{children}</AiMessagingModuleShell>;
}
