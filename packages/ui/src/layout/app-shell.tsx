'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../components/button';

export function AppShell({
  sidebar,
  header,
  children,
}: {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">{sidebar}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            aria-label="بستن منو"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-64 animate-slide-in-right">{sidebar}</div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b px-2 py-2 lg:hidden">
          <Button variant="ghost" size="icon" type="button" onClick={() => setMobileOpen(true)} aria-label="باز کردن منو">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {header}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
