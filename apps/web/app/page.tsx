import Link from 'next/link';
import { Button } from '@repo/ui';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">پلتفرم ERP</h1>
      <p className="text-muted-foreground">Wave 1 — Platform + Finance + CRM</p>
      <HomeActions className="flex gap-3">
        <Link href="/login">
          <Button>ورود</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">داشبورد</Button>
        </Link>
      </HomeActions>
    </main>
  );
}

function HomeActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
