'use client';

import { AdminResourceCrud } from './admin-resource-crud';
import { ADMIN_RESOURCES } from '../lib/platform-admin-config';

export function AdminResourcePage({ resourceKey }: { resourceKey: keyof typeof ADMIN_RESOURCES }) {
  const config = ADMIN_RESOURCES[resourceKey];
  if (!config) return null;
  return <AdminResourceCrud config={config} apiResource={resourceKey} />;
}
