'use client';

import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { cn } from '@repo/ui';
import { Contact, Plus } from 'lucide-react';
import { CONTACTS_TOTAL, SALES_CONTACTS, type SalesContact } from '../../lib/sales-contacts-demo';
import { fetchCrmCustomers } from '../../lib/sales-api';
import { SalesGridToolbar, SalesListCardHeader, rowPadding, type RowDensity } from './sales-screen-bits';

function consentBadge(c: SalesContact['consent']) {
  if (c === 'yes') return <Badge className="bg-emerald-600 hover:bg-emerald-600">رضایت</Badge>;
  if (c === 'pending') return <Badge variant="outline">در انتظار</Badge>;
  return <Badge variant="secondary">بدون رضایت</Badge>;
}

export function SalesContactsScreen() {
  const [search, setSearch] = useState('');
  const [density, setDensity] = useState<RowDensity>('normal');
  const [extra, setExtra] = useState<SalesContact[]>([]);

  useEffect(() => {
    fetchCrmCustomers()
      .then(({ customers }) => {
        setExtra(
          customers.map((c) => ({
            id: c.contactId,
            name: c.name,
            company: c.company,
            phone: c.phone ?? '—',
            email: c.email,
            role: 'مشتری',
            consent: 'yes' as const,
          })),
        );
      })
      .catch(() => setExtra([]));
  }, []);

  const rows = useMemo(() => {
    const merged = [...extra, ...SALES_CONTACTS];
    const q = search.trim();
    if (!q) return merged.slice(0, 30);
    return merged.filter((r) => r.name.includes(q) || r.phone.includes(q) || r.id.includes(q));
  }, [search, extra]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button className="bg-rose-700 hover:bg-rose-800">
          <Plus className="size-4 ml-1" />
          مخاطب جدید
        </Button>
      </div>
      <Card className="finance-aging-card overflow-hidden p-0">
        <SalesListCardHeader
          icon={<Contact className="size-4" />}
          title="پایگاه تماس"
          subtitle={`${CONTACTS_TOTAL.toLocaleString('fa-IR')} مخاطب · PII با audit`}
        />
        <SalesGridToolbar search={search} onSearch={setSearch} placeholder="نام، تلفن یا کد" density={density} onDensity={setDensity} />
        <div className="overflow-x-auto max-h-[520px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted/90">
              <tr className="border-b text-xs text-muted-foreground">
                <th className="py-2 px-3 text-right">کد</th>
                <th className="py-2 px-3 text-right">نام</th>
                <th className="py-2 px-3 text-right">شرکت</th>
                <th className="py-2 px-3 text-right">تلفن</th>
                <th className="py-2 px-3 text-right">ایمیل</th>
                <th className="py-2 px-3 text-right">نقش</th>
                <th className="py-2 px-3 text-right">رضایت تماس</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-dashed hover:bg-muted/40">
                  <td className={cn('px-3 font-mono text-xs', rowPadding(density))}>{r.id}</td>
                  <td className={cn('px-3 font-medium', rowPadding(density))}>{r.name}</td>
                  <td className={cn('px-3 text-muted-foreground', rowPadding(density))}>{r.company ?? '—'}</td>
                  <td className={cn('px-3 tabular-nums', rowPadding(density))}>{r.phone}</td>
                  <td className={cn('px-3 text-xs', rowPadding(density))}>{r.email ?? '—'}</td>
                  <td className={cn('px-3', rowPadding(density))}>{r.role}</td>
                  <td className={cn('px-3', rowPadding(density))}>{consentBadge(r.consent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
