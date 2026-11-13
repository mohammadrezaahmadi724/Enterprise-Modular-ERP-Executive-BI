import {
  MARKETING_SITE_SETTING_KEY,
  mergeMarketingSite,
  type MarketingSiteContent,
} from '@repo/contracts';
import { platformDb } from '../../prisma/platform-db';

export async function loadMarketingSite(): Promise<MarketingSiteContent> {
  try {
    const setting = await platformDb.platformSetting.findUnique({
      where: { key: MARKETING_SITE_SETTING_KEY },
    });
    return mergeMarketingSite(setting?.value as Partial<MarketingSiteContent> | undefined);
  } catch {
    return mergeMarketingSite(null);
  }
}

export async function saveMarketingSite(patch: Partial<MarketingSiteContent>): Promise<MarketingSiteContent> {
  const value = mergeMarketingSite(patch);
  await platformDb.platformSetting.upsert({
    where: { key: MARKETING_SITE_SETTING_KEY },
    create: { key: MARKETING_SITE_SETTING_KEY, value },
    update: { value },
  });
  return value;
}
