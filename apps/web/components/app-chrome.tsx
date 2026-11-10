'use client';

import { PublicHeader, TenantHeader } from '@repo/ui';
import { usePathname } from 'next/navigation';
import { AlertBell } from './alert-bell';

export function AppChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? '/';
  const isPublicCheckout = path.startsWith('/checkout') || path === '/register';

  return (
    <>
      {isPublicCheckout ? (
        <PublicHeader homeHref={process.env.NEXT_PUBLIC_MARKETING_URL ?? '/'} loginHref="/login" registerHref="/register" />
      ) : (
        <TenantHeader tenantName="نمونه‌سازی">
          <AlertBell />
        </TenantHeader>
      )}
      {children}
    </>
  );
}
