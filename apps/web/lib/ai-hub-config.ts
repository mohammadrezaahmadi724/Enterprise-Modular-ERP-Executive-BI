export type AiMessagingTab = { id: string; label: string; href: string };

export const AI_FORMULA_FA = 'مکالمه + کانال + VoIP — با audit و tenant_id در هر درخواست';

export const AI_MESSAGING_TABS: AiMessagingTab[] = [
  { id: 'overview', label: 'نمای کلی', href: '/ai' },
  { id: 'conversations', label: 'مکالمات AI', href: '/ai/conversations' },
  { id: 'settings', label: 'تنظیمات AI', href: '/ai/settings' },
  { id: 'inbox', label: 'صندوق پیام', href: '/messaging/inbox' },
  { id: 'channels', label: 'کانال‌ها', href: '/messaging/channels' },
  { id: 'surveys', label: 'نظرسنجی', href: '/messaging/surveys' },
  { id: 'dialer', label: 'VoIP شماره‌گیر', href: '/voip/dialer' },
  { id: 'calls', label: 'تماس‌ها', href: '/voip/calls' },
];
