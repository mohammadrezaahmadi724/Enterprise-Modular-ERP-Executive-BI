export function AdminFooter({ env = 'production', version = '6.1.0' }: { env?: string; version?: string }) {
  return (
    <footer className="border-t px-4 py-2 text-xs text-muted-foreground flex justify-between" dir="rtl">
      <span>
        نسخه {version} • محیط: {env}
      </span>
      <span>مستندات • گزارش Incident</span>
    </footer>
  );
}
