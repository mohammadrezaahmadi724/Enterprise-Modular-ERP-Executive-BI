import type { ReactNode } from 'react';

export type MenuItem = { path: string; labelFa: string; icon?: string };

export function AppShell({
  menu,
  children,
  title = 'داشبورد',
}: {
  menu: MenuItem[];
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-e border-border bg-muted/30 p-4">
        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <a key={item.path} href={item.path} className="rounded-md px-3 py-2 hover:bg-accent">
              {item.labelFa}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
