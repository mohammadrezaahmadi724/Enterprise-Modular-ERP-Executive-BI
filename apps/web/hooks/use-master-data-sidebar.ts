'use client';

import { useMasterDataEntitlements } from './use-master-data-entitlements';

export function useMasterDataSidebarHrefs(): string[] {
  const { hiddenMenuHrefs } = useMasterDataEntitlements();
  return hiddenMenuHrefs;
}
