import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { Button } from '../components/button';
import { cn } from '../lib/utils';

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-12 text-center', className)}>
      <motion className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </motion>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Button type="button" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

function motion(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
