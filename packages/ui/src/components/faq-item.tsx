export function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-lg border p-3 text-sm group">
      <summary className="cursor-pointer font-medium list-none">{q}</summary>
      <p className="mt-2 text-muted-foreground">{a}</p>
    </details>
  );
}
