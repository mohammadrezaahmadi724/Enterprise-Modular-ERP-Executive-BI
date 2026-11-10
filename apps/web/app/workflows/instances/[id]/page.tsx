type Props = { params: Promise<{ id: string }> };

export default async function WorkflowInstancePage({ params }: Props) {
  const { id } = await params;
  const steps = [
    { at: '۱۴۰۴/۰۸/۱۰', label: 'شروع گردش کار', status: 'done' },
    { at: '—', label: 'تایید مدیر', status: 'pending' },
  ];
  return (
    <main className="p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold">گردش کار #{id.slice(0, 8)}</h1>
      <ol className="border-r-2 border-primary pr-4 space-y-4">
        {steps.map((s) => (
          <li key={s.label} className="relative">
            <span className="absolute -right-[9px] top-1 h-3 w-3 rounded-full bg-primary" />
            <p className="text-sm font-medium">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.at}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
