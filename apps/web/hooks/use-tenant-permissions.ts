'use client';

import { useEffect, useState } from 'react';
import { filterRailIdsByPermissions } from '@repo/contracts';
import { fetchTenantRbacMe } from '../lib/tenant-roles-api';

export function useTenantRailFilter() {
  const [hiddenRailIds, setHiddenRailIds] = useState<string[]>([]);

  useEffect(() => {
    void fetchTenantRbacMe().then(({ permissions }) => {
      const allow = filterRailIdsByPermissions(permissions);
      const hide = [
        'sales',
        'finance',
        'procurement',
        'wms',
        'projects',
        'hr',
        'manufacturing',
        'distribution',
        'retail',
        'bi',
        'ai',
        'qc',
        'workflows',
        'master',
        'users',
        'subscription',
        'security',
        'home',
      ].filter((id) => !allow(id));
      setHiddenRailIds(hide);
    });
  }, []);

  return { hiddenRailIds };
}
