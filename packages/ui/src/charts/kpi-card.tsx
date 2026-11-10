import { Card, CardContent, CardHeader, CardTitle } from '../primitives/card';
import { Badge } from '../primitives/badge';
import { cn } from '../lib/utils';

export function KPICard({
  title,
  value,
  hint,
  tag,
  delta,
  deltaLabel,
  status,
  statusTone = 'neutral',
}: {
  title: string;
  value: string;
  hint?: string;
  tag?: string;
  delta?: string;
  deltaLabel?: string;
  status?: string;
  statusTone?: 'neutral' | 'warn' | 'danger' | 'ok';
}) {
  const toneClass =
    statusTone === 'danger'
      ? 'text-destructive'
      : statusTone === 'warn'
        ? 'text-amber-600 dark:text-amber-400'
        : statusTone === 'ok'
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-muted-foreground';

  return (
    <Card className="relative overflow-hidden">
      {tag && (
        <Badge variant="outline" className="absolute start-3 top-3 text-[10px] font-semibold tracking-wide">
          {tag}
        </Badge>
      )}
      <CardHeader className={cn('pb-2', tag && 'pt-10')}>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {(delta || deltaLabel) && (
          <p className="text-xs text-muted-foreground">
            {delta && <span className={cn('font-semibold', toneClass)}>{delta}</span>}
            {delta && deltaLabel && ' '}
            {deltaLabel}
          </p>
        )}
        {status && <p className={cn('text-xs font-medium', toneClass)}>{status}</p>}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
