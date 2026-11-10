export function EnvironmentBadge() {
  const env = process.env.NEXT_PUBLIC_APP_ENV ?? 'development';
  const variants: Record<string, string> = {
    production: 'bg-success/10 text-success border-success/20',
    staging: 'bg-warning/10 text-warning border-warning/20',
    development: 'bg-muted text-muted-foreground border-border',
  };
  const label = env === 'production' ? 'پروداکشن' : env === 'staging' ? 'استیجینگ' : 'توسعه';
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${variants[env] ?? variants.development}`}>
      {label}
    </span>
  );
}
