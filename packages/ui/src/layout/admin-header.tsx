'use client';

import { ThemeToggle } from '../primitives/theme-toggle';
import { EnvironmentBadge } from './environment-badge';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <EnvironmentBadge />
      <ThemeToggle />
    </header>
  );
}
