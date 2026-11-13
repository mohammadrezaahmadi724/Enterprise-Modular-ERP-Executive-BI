import { AI_HUB_KPIS } from './ai-hub-demo';

export type AiHubOverview = {
  openConversations: number;
  inboxUnread: number;
  callsToday: number;
  channelsActive: number;
  source: string;
};

type ConversationDto = { id: string; messages?: unknown[] };
type MessageDto = { channel: string; direction: string; status: string };
type CallDto = { status: string };

export async function fetchAiHubOverview(): Promise<AiHubOverview> {
  try {
    const [convRes, msgRes, callRes] = await Promise.all([
      fetch('/api/ai/conversations', { cache: 'no-store' }),
      fetch('/api/messaging/inbox', { cache: 'no-store' }),
      fetch('/api/voip/calls', { cache: 'no-store' }),
    ]);
    if (!convRes.ok || !msgRes.ok || !callRes.ok) throw new Error('hub fetch failed');

    const conversations = ((await convRes.json()) as { conversations: ConversationDto[] }).conversations ?? [];
    const messages = ((await msgRes.json()) as { messages: MessageDto[] }).messages ?? [];
    const calls = ((await callRes.json()) as { calls: CallDto[] }).calls ?? [];

    const openConversations = conversations.filter((c) => (c.messages?.length ?? 0) >= 0).length;
    const inboxUnread = messages.filter(
      (m) => m.direction === 'Inbound' && (m.status === 'Delivered' || m.status === 'Sent'),
    ).length;
    const callsToday = calls.filter((c) => c.status === 'Completed' || c.status === 'InProgress').length;
    const channelsActive = new Set(messages.map((m) => m.channel)).size;

    return {
      openConversations: openConversations || AI_HUB_KPIS.openConversations,
      inboxUnread: inboxUnread || AI_HUB_KPIS.inboxUnread,
      callsToday: callsToday || AI_HUB_KPIS.callsToday,
      channelsActive: channelsActive || AI_HUB_KPIS.channelsActive,
      source: '/api/ai · /api/messaging/inbox · /api/voip/calls',
    };
  } catch {
    return {
      ...AI_HUB_KPIS,
      source: 'demo fallback',
    };
  }
}
