export type ChannelPrefs = {
  InApp: boolean;
  Email: boolean;
  SMS: boolean;
  WebPush: boolean;
};

export type UserNotificationPreference = {
  userId: string;
  tenantId: string;
  channels: ChannelPrefs;
  categoryPrefs: Record<string, boolean>;
  quietHours?: { start: string; end: string };
};

const prefs = new Map<string, UserNotificationPreference>();

function key(tenantId: string, userId: string) {
  return `${tenantId}:${userId}`;
}

export function resetPreferencesStore(): void {
  prefs.clear();
}

export function upsertPreferences(pref: UserNotificationPreference): void {
  prefs.set(key(pref.tenantId, pref.userId), pref);
}

export function getPreferences(tenantId: string, userId: string): UserNotificationPreference {
  return (
    prefs.get(key(tenantId, userId)) ?? {
      userId,
      tenantId,
      channels: { InApp: true, Email: true, SMS: false, WebPush: false },
      categoryPrefs: {},
    }
  );
}

export function isQuietHours(pref: UserNotificationPreference, now = new Date()): boolean {
  if (!pref.quietHours) return false;
  const hh = now.getHours();
  const start = Number.parseInt(pref.quietHours.start.split(':')[0] ?? '22', 10);
  const end = Number.parseInt(pref.quietHours.end.split(':')[0] ?? '7', 10);
  return hh >= start || hh < end;
}
