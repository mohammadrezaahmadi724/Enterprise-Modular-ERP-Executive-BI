'use client';

import { AppShell, PublicHeader, TenantHeader, TenantSidebar } from '@repo/ui';
import { usePathname } from 'next/navigation';
import { AlertBell } from './alert-bell';

const PUBLIC_PREFIXES = ['/checkout', '/login', '/register'];

export function TenantShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? '/';
  const isPublic = PUBLIC_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

  if (isPublic) {
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
    <AppShell sidebar={<TenantSidebar />} header={<TenantHeader tenantName="شرکت نمونه"><AlertBell /></TenantHeader>}>
      {children}
    </AppShell>
  );
}
