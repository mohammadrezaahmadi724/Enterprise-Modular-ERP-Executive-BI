'use client';

import { PublicHeader, TenantCloudShell } from '@repo/ui';
import { usePathname } from 'next/navigation';
import { useMasterDataSidebarHrefs } from '../hooks/use-master-data-sidebar';
import { useTenantRailFilter } from '../hooks/use-tenant-permissions';

const PUBLIC_PREFIXES = ['/checkout', '/login', '/register'];

export function TenantShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? '/';
  const masterDataHiddenHrefs = useMasterDataSidebarHrefs();
  const { hiddenRailIds } = useTenantRailFilter();
  const isPublic = PUBLIC_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

  if (isPublic) {
    const bareGate = path === '/login' || path === '/register' || path.startsWith('/login/');
    if (bareGate) return <>{children}</>;
    return (
      <>
        <PublicHeader homeHref={process.env.NEXT_PUBLIC_MARKETING_URL ?? '/'} />
        {children}
      </>
    );
  }

  if (path === '/') {
    return <>{children}</>;
  }

  return (
    <TenantCloudShell hideMenuHrefs={masterDataHiddenHrefs} hiddenRailIds={hiddenRailIds}>
      {children}
    </TenantCloudShell>
  );
}
