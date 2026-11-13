'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { cn } from '@repo/ui';
import { BookOpen, ExternalLink, Shield } from 'lucide-react';
import { LEDGER_BOOKS, type LedgerBook } from '../../lib/finance-ledgers-demo';

const DEFAULT_LEDGER = LEDGER_BOOKS[0]!;

export function FinanceLedgersScreen() {
  const [selected, setSelected] = useState<string>(
    LEDGER_BOOKS.find((l) => l.isDefault)?.code ?? DEFAULT_LEDGER.code,
  );
  const book: LedgerBook = LEDGER_BOOKS.find((l) => l.code === selected) ?? DEFAULT_LEDGER;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        دفترها — دفتر قانونی برای اظهار مالیاتی و مودیان الزامی است و قابل حذف نیست؛ دفتر مدیریتی برای گزارش‌های داخلی و
        تفصیل مرکز هزینه استفاده می‌شود.
      </p>

      <div className="grid gap-4 lg:grid-cols-[1fr_minmax(0,320px)]">
        <Card className="finance-aging-card">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base">دفترهای حسابداری</CardTitle>
              <p className="text-xs text-muted-foreground">سری اسناد، اتصال VAT/مودیان و وضعیت فعال</p>
            </div>
            <Button size="sm" variant="outline" disabled>
              + دفتر جدید
            </Button>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-xs">
                  <th className="py-2 text-right">کد</th>
                  <th className="py-2 text-right">نوع</th>
                  <th className="py-2 text-right">عنوان</th>
                  <th className="py-2 text-right">سری</th>
                  <th className="py-2 text-right">مودیان</th>
                  <th className="py-2 text-right">اسناد ماه</th>
                  <th className="py-2 text-right">آخرین ثبت قطعی</th>
                  <th className="py-2 text-right">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {LEDGER_BOOKS.map((r) => (
                  <tr
                    key={r.code}
                    className={cn(
                      'border-b border-dashed cursor-pointer hover:bg-muted/40',
                      selected === r.code && 'bg-primary/5',
                    )}
                    onClick={() => setSelected(r.code)}
                  >
                    <td className="py-2.5 font-mono text-xs">{r.code}</td>
                    <td className="py-2.5">{r.type}</td>
                    <td className="py-2.5">{r.titleFa}</td>
                    <td className="py-2.5 font-mono text-xs">{r.series}</td>
                    <td className="py-2.5">
                      {r.vatMoadian ? (
                        <Badge className="bg-emerald-600 hover:bg-emerald-600">فعال</Badge>
                      ) : (
                        <span className="text-muted-foreground">غیرفعال</span>
                      )}
                    </td>
                    <td className="py-2.5">{r.journalCountMtd}</td>
                    <td className="py-2.5 text-muted-foreground">{r.lastPostedAt ?? '—'}</td>
                    <td className="py-2.5">
                      <Badge>{r.status}</Badge>
                      {r.isDefault ? (
                        <Badge variant="outline" className="mr-1">
                          پیش‌فرض
                        </Badge>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <LedgerDetailPanel book={book} />
      </div>
    </div>
  );
}

function LedgerDetailPanel({ book }: { book: LedgerBook }) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BookOpen className="size-4" />
          {book.code}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{book.titleFa}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="rounded-lg border p-3 space-y-2">
          <Row label="نوع دفتر" value={book.type} />
          <Row label="سری اسناد" value={book.series} />
          <Row
            label="اتصال مودیان"
            value={book.vatMoadian ? 'فعال — فقط فاکتورهای این دفتر' : 'خاموش'}
          />
          <Row label="اسناد ثبت‌شده این ماه" value={String(book.journalCountMtd)} />
        </div>

        {book.type === 'قانونی' ? (
          <div className="flex gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-900 dark:text-amber-100">
            <Shield className="size-4 shrink-0" />
            دفتر قانونی پس از فعال‌سازی قفل حسابداری، حذف و تغییر ساختار کدینگ محدود می‌شود.
          </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <Button asChild variant="outline" size="sm" className="w-full justify-between">
            <Link href="/finance/chart-of-accounts">
              مشاهده کدینگ
              <ExternalLink className="size-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" className="w-full justify-between">
            <Link href="/finance/reports">
              گزارش گردش حساب
              <ExternalLink className="size-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 border-b border-dashed pb-1.5 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-left">{value}</span>
    </div>
  );
}
