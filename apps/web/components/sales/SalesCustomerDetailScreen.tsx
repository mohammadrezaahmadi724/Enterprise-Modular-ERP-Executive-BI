'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { ArrowRight, Building2, Mail, Phone, User } from 'lucide-react';
import {
  crmPartyToCustomer,
  findCustomerByCode,
  partyTypeLabel,
  type SalesCustomer,
} from '../../lib/sales-customers-demo';
import { fetchCrmCustomerByCode, type CrmCustomerPartyDto } from '../../lib/sales-api';

type Props = {
  code: string;
};

export function SalesCustomerDetailScreen({ code }: Props) {
  const [demo] = useState(() => findCustomerByCode(code));
  const [apiParty, setApiParty] = useState<CrmCustomerPartyDto | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCrmCustomerByCode(code);
        if (!cancelled) {
          setApiParty(res.customer);
          setSource(res.source);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'خطا');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code]);

  const customer: SalesCustomer | undefined =
    demo ?? (apiParty ? crmPartyToCustomer(apiParty) : undefined);

  if (!customer && !loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center space-y-3">
          <p className="font-semibold">مشتری یافت نشد</p>
          <p className="text-sm text-muted-foreground">کد «{code}» در دیتابیس یا دادهٔ نمونه وجود ندارد.</p>
          <Button variant="outline" asChild>
            <Link href="/sales/customers">بازگشت به فهرست</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const enriched = apiParty ?? null;
  const fromApi = Boolean(enriched) && !demo;

  return (
    <div className="flex flex-col gap-4">
      <Button variant="ghost" size="sm" className="w-fit -mr-2" asChild>
        <Link href="/sales/customers">
          <ArrowRight className="size-4 ml-1" />
          فهرست مشتریان
        </Link>
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            کد: <span className="font-mono ltr inline-block" dir="ltr">{code}</span>
          </p>
          <h1 className="text-2xl font-bold">{customer?.name ?? '…'}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {partyTypeLabel(customer?.partyType ?? 'organization')} · نقش مشتری
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {customer?.status === 'active' ? (
            <Badge className="bg-emerald-600 hover:bg-emerald-600">فعال</Badge>
          ) : (
            <Badge variant="secondary">غیرفعال</Badge>
          )}
          {fromApi ? <Badge variant="outline">API · {source}</Badge> : <Badge variant="outline">دادهٔ نمونه</Badge>}
        </div>
      </div>

      {loading ? <p className="text-xs text-muted-foreground">بارگذاری از CRM…</p> : null}
      {error ? <p className="text-xs text-amber-600">API: {error} — نمایش دادهٔ محلی</p> : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">اطلاعات طرف‌حساب</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 text-sm">
            <InfoRow icon={User} label="نام" value={customer?.name ?? '—'} />
            <InfoRow icon={Building2} label="نوع" value={partyTypeLabel(customer?.partyType ?? 'person')} />
            <InfoRow icon={Mail} label="ایمیل" value={enriched?.email ?? '—'} />
            <InfoRow icon={Phone} label="تلفن" value={enriched?.phone ?? '—'} />
            <InfoRow icon={Building2} label="شرکت" value={enriched?.company ?? '—'} />
            <InfoRow icon={User} label="برچسب‌ها" value={customer?.tags ?? '—'} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">نقش‌ها و وضعیت</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-1">
              {customer?.roles.map((r) => (
                <Badge key={r} variant="outline">
                  {r}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">آخرین تغییر: {customer?.updatedAt}</p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/finance/receivables">مانده دریافتنی</Link>
            </Button>
            <Button size="sm" className="w-full" asChild>
              <Link href="/sales/quotes">صدور پیش‌فاکتور</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">سوابق فروش</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          پیش‌فاکتور، سفارش و فاکتور این مشتری پس از اتصال ماژول عملیات در همین صفحه نمایش داده می‌شود.
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2 rounded-lg border px-3 py-2">
      <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="font-medium truncate">{value}</p>
      </div>
    </div>
  );
}
