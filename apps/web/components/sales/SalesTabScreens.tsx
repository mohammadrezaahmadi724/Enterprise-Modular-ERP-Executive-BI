'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Button, Card, CardContent } from '@repo/ui';
import { SalesLeadsScreen } from './SalesLeadsScreen';
import { SalesCustomersScreen } from './SalesCustomersScreen';
import { SalesActivitiesScreen } from './SalesActivitiesScreen';
import { SalesQuotesScreen } from './SalesQuotesScreen';
import { SalesOrdersScreen } from './SalesOrdersScreen';
import { SalesInvoicesScreen } from './SalesInvoicesScreen';
import { SalesReturnsScreen } from './SalesReturnsScreen';
import { SalesMySalesScreen } from './SalesMySalesScreen';
import { SalesTeamPerformanceScreen } from './SalesTeamPerformanceScreen';
import { SalesContactsScreen } from './SalesContactsScreen';
import { SalesSmsScreen } from './SalesSmsScreen';

export function SalesAssistantScreen() {
  return (
    <Card>
      <CardContent className="py-10 text-center space-y-3">
        <p className="font-semibold">دستیار فروش — ERP Roshd</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          در محیط نمایشی، پیشنهاد اقدام بعدی و خلاصهٔ سرنخ غیرفعال است.
        </p>
        <Button asChild>
          <Link href="/ai/conversations">رفتن به دستیار</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

const SALES_SCREEN_MAP: Record<string, () => React.ReactNode> = {
  '/sales/leads': function SalesLeadsRoute() {
    return (
      <Suspense fallback={<p className="text-sm text-muted-foreground">در حال بارگذاری سرنخ‌ها…</p>}>
        <SalesLeadsScreen />
      </Suspense>
    );
  },
  '/sales/customers': SalesCustomersScreen,
  '/sales/activities': SalesActivitiesScreen,
  '/sales/quotes': SalesQuotesScreen,
  '/sales/orders': function SalesOrdersRoute() {
    return (
      <Suspense fallback={<p className="text-sm text-muted-foreground">در حال بارگذاری سفارش‌ها…</p>}>
        <SalesOrdersScreen />
      </Suspense>
    );
  },
  '/sales/invoices': SalesInvoicesScreen,
  '/sales/returns': SalesReturnsScreen,
  '/sales/my-sales': SalesMySalesScreen,
  '/sales/team-performance': SalesTeamPerformanceScreen,
  '/sales/contacts': SalesContactsScreen,
  '/sales/sms': SalesSmsScreen,
  '/sales/assistant': SalesAssistantScreen,
};

export function renderSalesScreen(href: string): React.ReactNode | null {
  const exact = SALES_SCREEN_MAP[href];
  if (exact) return exact();
  return null;
}
