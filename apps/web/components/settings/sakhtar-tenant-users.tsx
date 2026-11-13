'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserPlus, Shield } from 'lucide-react';
import { fetchTenantUsers, type TenantUserRow } from '../../lib/tenant-users-api';

export function SakhtarTenantUsers() {
  const [users, setUsers] = useState<TenantUserRow[]>([]);
  const [seatsUsed, setSeatsUsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchTenantUsers()
      .then((d) => {
        setUsers(d.users);
        setSeatsUsed(d.seatsUsed);
        setError(null);
      })
      .catch(() => setError('بارگذاری کاربران از API ممکن نشد — دمو زیر نمایش داده می‌شود.'));
  }, []);

  const list = users.length
    ? users
    : [
        {
          id: 'demo',
          fullName: 'مدیر مالی نمونه',
          email: 'cfo@demo.ir',
          roles: 'مدیر مالی · CFO',
          lastLogin: '—',
          status: 'فعال',
        },
      ];

  return (
    <div className="tc-subscription space-y-5" dir="rtl">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">کاربران و دسترسی‌ها</h1>
          <p className="text-sm text-muted-foreground mt-1">
            مدیریت صندلی، نقش و ورود کاربران سازمان — tenant-scoped از `platform.users`.
          </p>
        </div>
        <Link href="/settings/subscription" className="tc-quick-chip inline-flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" /> اشتراک و صندلی
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="tc-stat-card">
          <span className="text-xs text-muted-foreground">کاربر فعال</span>
          <strong className="block text-2xl mt-1">{seatsUsed || list.length}</strong>
        </div>
        <div className="tc-stat-card">
          <span className="text-xs text-muted-foreground">نقش‌های RBAC</span>
          <strong className="block text-sm mt-1">از platform.roles</strong>
        </div>
        <div className="tc-stat-card flex items-center justify-center">
          <button type="button" className="tc-btn-buy-module text-sm w-full" disabled title="فاز بعدی">
            <UserPlus className="inline h-4 w-4 ml-1" />
            دعوت کاربر جدید
          </button>
        </div>
      </div>

      {error ? <p className="text-xs text-amber-700 bg-amber-50 dark:bg-amber-950/30 rounded px-3 py-2">{error}</p> : null}

      <div className="tc-panel overflow-x-auto">
        <table className="pc-users-table">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th>نام</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>آخرین ورود</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id}>
                <td className="font-medium">{u.fullName}</td>
                <td dir="ltr" className="font-mono text-xs">
                  {u.email}
                </td>
                <td>{u.roles}</td>
                <td>{u.lastLogin}</td>
                <td>
                  <span className="tc-badge-active">{u.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
