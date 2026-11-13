import Link from 'next/link';

type Props = { params: Promise<{ id: string }> };

export default async function TenantDetailPage({ params }: Props) {
  const { id } = await params;
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';
  let tenant: { name?: string; slug?: string; status?: string; id?: string } | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(`${apiBase}/api/v1/platform/admin/tenants`, {
      headers: {
        'x-super-admin': 'true',
        'x-user-id': '00000000-0000-4000-8000-000000000001',
        'x-tenant-id': '11111111-1111-4111-8111-111111111111',
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const body = (await res.json()) as { rows?: { id: string; name: string; slug: string; status: string }[] };
      tenant = body.rows?.find((r) => r.id === id || r.slug === id) ?? null;
    } else {
      error = `API ${res.status}`;
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'خطا در بارگذاری';
  }

  return (
    <main className="p-6 space-y-4" dir="rtl">
      <Link href="/tenants" className="text-sm text-primary">
        ← بازگشت به فهرست مستأجران
      </Link>
      <h1 className="text-2xl font-bold">جزئیات مستأجر</h1>
      {error ? <p className="text-sm text-amber-700">{error}</p> : null}
      {tenant ? (
        <dl className="text-sm space-y-2 rounded-lg border p-4">
          <div>
            <dt className="text-muted-foreground">شناسه</dt>
            <dd className="font-mono text-xs">{tenant.id ?? id}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">نام</dt>
            <dd>{tenant.name ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">اسلاگ</dt>
            <dd>{tenant.slug ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">وضعیت</dt>
            <dd>{tenant.status ?? '—'}</dd>
          </div>
        </dl>
      ) : !error ? (
        <p className="text-sm text-muted-foreground">
          مستأجر با شناسه یا اسلاگ <code className="text-xs">{id}</code> در فهرست پلتفرم یافت نشد (مثلاً QA-Tenant-02
          باید از پنل Super Admin ایجاد شود).
        </p>
      ) : null}
    </main>
  );
}
