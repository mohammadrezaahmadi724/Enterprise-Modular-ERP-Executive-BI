export function StepCard({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="flex gap-3 text-sm">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
        {n}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-muted-foreground text-xs mt-1">{desc}</p>
      </div>
    </div>
  );
}
