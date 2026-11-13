'use client';

import { Bot, Sparkles } from 'lucide-react';
import { SakhtarModuleShell } from '@repo/ui';
import { AI_FORMULA_FA, AI_MESSAGING_TABS } from '../../lib/ai-hub-config';

export function AiMessagingModuleShell({ children }: { children: React.ReactNode }) {
  return (
    <SakhtarModuleShell
      theme="ai"
      title="AI و پیام"
      subtitle="مکالمه هوشمند، صندوق یکپارچه و VoIP"
      formula={AI_FORMULA_FA}
      tabs={AI_MESSAGING_TABS}
      cta={{ href: '/ai/conversations', label: '+ گفتگوی جدید' }}
      icon={Sparkles}
      mascot={{ href: '/ai/settings', label: 'دستیار ساختار', icon: Bot }}
    >
      {children}
    </SakhtarModuleShell>
  );
}
