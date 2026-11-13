'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Shield, UserPlus, Users, X } from 'lucide-react';
import { PERMISSION_CATALOG, type PermissionCatalogEntry } from '@repo/contracts';
import {
  activateTenantUser,
  deactivateTenantUser,
  fetchTenantUsers,
  inviteTenantUser,
  patchTenantUserRoles,
  type TenantUserRow,
} from '../../lib/tenant-users-api';
import {
  createTenantRole,
  fetchRbacCatalog,
  fetchTenantRoles,
  updateTenantRole,
  type TenantRoleRow,
} from '../../lib/tenant-roles-api';

type Tab = 'users' | 'roles';
type UserFilter = 'all' | 'active' | 'suspended' | 'invited';
type TableDensity = 'compact' | 'comfortable';

const MODULE_LABELS: Record<string, string> = {
  tenant: 'مدیریت سازمان',
  finance: 'مالی',
  sales: 'فروش و CRM',
  inventory: 'عملیات و انبار',
  hr: 'منابع انسانی',
  platform: 'پلتفرم',
  other: 'سایر',
};

const INVITE_CHIPS: { label: string; match: (r: TenantRoleRow) => boolean }[] = [
  { label: 'مدیر فروش', match: (r) => /SALES|CRM|CFO/i.test(r.code) },
  { label: 'کارشناس فروش', match: (r) => /SALES|CRM/i.test(r.code) },
  { label: 'حسابدار', match: (r) => r.code === 'CFO' || /مالی|حسابدار/i.test(r.name) },
  { label: 'انباردار', match: (r) => r.code === 'WAREHOUSE' || /انبار/i.test(r.name) },
  { label: 'مسئول تدارکات', match: (r) => /OPERATIONS|WAREHOUSE/i.test(r.code) },
  { label: 'مدیر پروژه', match: (r) => /PROJECT|COMPANY/i.test(r.code) },
];

function groupCatalog(catalog: PermissionCatalogEntry[]) {
  const map = new Map<string, PermissionCatalogEntry[]>();
  for (const p of catalog) {
    const key = p.module ?? 'other';
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(p);
  }
  const order = ['tenant', 'finance', 'sales', 'inventory', 'hr', 'platform', 'other'];
  return order.filter((k) => map.has(k)).map((k) => ({ key: k, items: map.get(k)! }));
}

export function TenantAdminHub() {
  const [tab, setTab] = useState<Tab>('users');
  const [users, setUsers] = useState<TenantUserRow[]>([]);
  const [roles, setRoles] = useState<TenantRoleRow[]>([]);
  const [catalog, setCatalog] = useState<PermissionCatalogEntry[]>([]);
  const [seatsUsed, setSeatsUsed] = useState(0);
  const [seatsTotal, setSeatsTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [rolesModalOpen, setRolesModalOpen] = useState(false);
  const [userDrawer, setUserDrawer] = useState<TenantUserRow | null>(null);

  const [inviteForm, setInviteForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    jobTitle: '',
    email: '',
  });
  const [inviteRoleIds, setInviteRoleIds] = useState<string[]>([]);
  const [invitePermissions, setInvitePermissions] = useState<string[]>([]);

  const [editRoleId, setEditRoleId] = useState('');
  const [roleForm, setRoleForm] = useState({ code: '', name: '', permissions: [] as string[] });

  const [userRoleId, setUserRoleId] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<UserFilter>('all');
  const [roleFilterId, setRoleFilterId] = useState('');
  const [tableDensity, setTableDensity] = useState<TableDensity>('comfortable');
  const [roleCreateMode, setRoleCreateMode] = useState(false);
  const [inviteDetail, setInviteDetail] = useState<TenantUserRow | null>(null);
  const [rowBusyId, setRowBusyId] = useState<string | null>(null);

  const catalogGroups = useMemo(() => groupCatalog(catalog), [catalog]);

  const load = useCallback(async () => {
    try {
      const [u, r] = await Promise.all([fetchTenantUsers(), fetchTenantRoles()]);
      setUsers(u.users);
      setSeatsUsed(u.seatsUsed);
      setSeatsTotal(u.seatsTotal);
      setRoles(r);
      setError(null);
      try {
        const c = await fetchRbacCatalog();
        setCatalog(c.catalog.length ? c.catalog : PERMISSION_CATALOG);
      } catch {
        setCatalog(PERMISSION_CATALOG);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا در بارگذاری');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (roleCreateMode) return;
    if (roles.length > 0 && !editRoleId) setEditRoleId(roles[0].id);
  }, [roles, editRoleId, roleCreateMode]);

  useEffect(() => {
    const perms = new Set<string>();
    for (const id of inviteRoleIds) {
      const role = roles.find((r) => r.id === id);
      role?.permissions.forEach((p) => perms.add(p));
    }
    setInvitePermissions([...perms]);
  }, [inviteRoleIds, roles]);

  useEffect(() => {
    if (roleCreateMode) return;
    const role = roles.find((r) => r.id === editRoleId);
    if (role) {
      setRoleForm({ code: role.code, name: role.name, permissions: [...role.permissions] });
    }
  }, [editRoleId, roles, roleCreateMode]);

  const roleOptions = useMemo(
    () => roles.map((r) => ({ id: r.id, label: `${r.name} (${r.code})` })),
    [roles],
  );

  const togglePerm = (code: string, list: string[], set: (p: string[]) => void) => {
    set(list.includes(code) ? list.filter((p) => p !== code) : [...list, code]);
  };

  const resolveChipRoleId = (label: string): string | undefined => {
    const chip = INVITE_CHIPS.find((c) => c.label === label);
    if (!chip) return undefined;
    return roles.find(chip.match)?.id;
  };

  const toggleInviteChip = (label: string) => {
    const id = resolveChipRoleId(label);
    if (!id) return;
    setInviteRoleIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const chipActive = (label: string) => {
    const id = resolveChipRoleId(label);
    return id ? inviteRoleIds.includes(id) : false;
  };

  const openInvite = () => {
    setInviteForm({ firstName: '', lastName: '', phone: '', jobTitle: '', email: '' });
    setInviteRoleIds([]);
    setInvitePermissions([]);
    setInviteOpen(true);
    void fetchRbacCatalog()
      .then((c) => setCatalog(c.catalog))
      .catch(() => undefined);
  };

  const openRolesModal = () => {
    setRoleCreateMode(false);
    setRolesModalOpen(true);
    if (roles[0] && !editRoleId) setEditRoleId(roles[0].id);
  };

  const startCreateRole = () => {
    setRoleCreateMode(true);
    setEditRoleId('');
    setRoleForm({ code: '', name: '', permissions: [] });
    setRolesModalOpen(true);
  };

  const closeRolesModal = () => {
    setRolesModalOpen(false);
    setRoleCreateMode(false);
  };

  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    return users.filter((u) => {
      if (userFilter === 'active' && u.accountStatus !== 'Active') return false;
      if (userFilter === 'suspended' && u.accountStatus !== 'Suspended') return false;
      if (userFilter === 'invited' && !u.invitePending) return false;
      if (roleFilterId && !u.roleIds.includes(roleFilterId)) return false;
      if (!q) return true;
      const phoneHint = u.email.match(/invite\+(\d+)/i)?.[1] ?? '';
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.roles.toLowerCase().includes(q) ||
        phoneHint.includes(q.replace(/\D/g, ''))
      );
    });
  }, [users, userSearch, userFilter, roleFilterId]);

  const inviteFieldsFromDom = () => {
    const form = document.getElementById('invite-form');
    if (form instanceof HTMLFormElement) {
      const data = new FormData(form);
      return {
        firstName: String(data.get('firstName') ?? '').trim(),
        lastName: String(data.get('lastName') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        jobTitle: String(data.get('jobTitle') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
      };
    }
    return {
      firstName: inviteForm.firstName.trim(),
      lastName: inviteForm.lastName.trim(),
      phone: inviteForm.phone.trim(),
      jobTitle: inviteForm.jobTitle.trim(),
      email: inviteForm.email.trim(),
    };
  };

  const submitInvite = async () => {
    const { firstName, lastName, phone, jobTitle, email } = inviteFieldsFromDom();
    if (!firstName || !lastName || !phone || !jobTitle) {
      setError('نام، نام خانوادگی، موبایل و سمت سازمانی الزامی است.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const baseRolePerms = new Set<string>();
      inviteRoleIds.forEach((id) => roles.find((r) => r.id === id)?.permissions.forEach((p) => baseRolePerms.add(p)));
      const custom =
        invitePermissions.length && invitePermissions.some((p) => !baseRolePerms.has(p))
          ? invitePermissions
          : undefined;
      await inviteTenantUser({
        firstName,
        lastName,
        phone,
        jobTitle,
        email: email || undefined,
        roleIds: inviteRoleIds.length ? inviteRoleIds : undefined,
        customPermissions: custom,
      });
      setInviteOpen(false);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'دعوت ناموفق');
    } finally {
      setBusy(false);
    }
  };

  const saveRoleFromModal = async () => {
    setBusy(true);
    try {
      if (roleCreateMode) {
        const form = document.getElementById('role-form');
        let code = roleForm.code.trim();
        let name = roleForm.name.trim();
        if (form instanceof HTMLFormElement) {
          const data = new FormData(form);
          code = String(data.get('code') ?? code).trim();
          name = String(data.get('name') ?? name).trim();
        }
        if (!code || !name) {
          setError('کد و عنوان نقش الزامی است.');
          return;
        }
        const created = await createTenantRole({
          code,
          name,
          permissions: roleForm.permissions,
        });
        setEditRoleId(created.id);
        setRoleCreateMode(false);
      } else {
        const role = roles.find((r) => r.id === editRoleId);
        if (!role) return;
        await updateTenantRole(role.id, { name: roleForm.name, permissions: roleForm.permissions });
      }
      closeRolesModal();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'ذخیره نقش ناموفق');
    } finally {
      setBusy(false);
    }
  };

  const onInlineRoleChange = async (userId: string, roleId: string) => {
    setRowBusyId(userId);
    try {
      await patchTenantUserRoles(userId, roleId ? [roleId] : []);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'تغییر نقش ناموفق');
    } finally {
      setRowBusyId(null);
    }
  };

  const PermissionMatrix = ({
    permissions,
    onChange,
  }: {
    permissions: string[];
    onChange: (p: string[]) => void;
  }) => (
  <>
    <div className="ta-perm-toolbar">
      <button type="button" onClick={() => onChange(catalog.map((c) => c.code))}>
        انتخاب همه
      </button>
      <button type="button" onClick={() => onChange([])}>
        حذف همه
      </button>
    </div>
    {catalogGroups.map(({ key, items }) => (
      <div key={key} className="ta-perm-module">
        <div className="ta-perm-module-title">{MODULE_LABELS[key] ?? key}</div>
        <div className="ta-perm-grid" style={{ maxHeight: 'none' }}>
          {items.map((p) => (
            <label key={p.code} className="ta-perm-item">
              <input
                type="checkbox"
                checked={permissions.includes(p.code)}
                onChange={() => togglePerm(p.code, permissions, onChange)}
              />
              <span className="flex flex-col">
                <strong>{p.labelFa}</strong>
                <span dir="ltr">{p.code}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    ))}
  </>
  );

  return (
    <div className="ta-hub tc-subscription" dir="rtl">
      <header className="ta-hub-header">
        <div>
          <h1 className="ta-title">کاربران و دسترسی‌ها</h1>
          <p className="ta-sub">دعوت همکار، نقش‌ها و مجوزهای ماژول — مشابه cloud.sakhtar.net</p>
        </div>
      </header>

      <div className="ta-actions-row">
        <button type="button" className="ta-btn ta-btn--outline" onClick={openRolesModal}>
          <Shield className="inline h-4 w-4 ml-1" />
          ویرایش دسترسی نقش‌ها
        </button>
        <button type="button" className="ta-btn ta-btn--outline" onClick={startCreateRole}>
          نقش جدید
        </button>
        <button
          type="button"
          className="ta-btn"
          disabled={seatsUsed >= seatsTotal && seatsTotal > 0}
          onClick={openInvite}
        >
          <UserPlus className="inline h-4 w-4 ml-1" />
          دعوت همکار جدید
        </button>
        <Link href="/settings/subscription" className="ta-btn ta-btn--ghost text-xs self-center">
          اشتراک ({seatsUsed}/{seatsTotal || '—'} صندلی)
        </Link>
      </div>

      <div className="ta-tabs mb-3 inline-flex" role="tablist">
        <button type="button" className="ta-tab" data-active={tab === 'users'} onClick={() => setTab('users')}>
          <Users className="inline h-3.5 w-3.5 ml-1" />
          کاربران
        </button>
        <button type="button" className="ta-tab" data-active={tab === 'roles'} onClick={() => setTab('roles')}>
          <Shield className="inline h-3.5 w-3.5 ml-1" />
          نقش‌ها
        </button>
      </div>

      {error ? <div className="ta-error">{error}</div> : null}

      {tab === 'users' ? (
        <div className="ta-panel overflow-x-auto">
          <div className="ta-filter-bar">
            <input
              className="ta-filter-search"
              placeholder="نام، ایمیل یا شماره همراه"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
            <div className="ta-filter-chips" role="radiogroup" aria-label="وضعیت">
              {(
                [
                  ['all', 'همه'],
                  ['invited', 'دعوت ارسال‌شده'],
                  ['active', 'پذیرفته‌شده'],
                  ['suspended', 'معلق'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className="ta-chip"
                  data-active={userFilter === id}
                  onClick={() => setUserFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <select
              className="ta-filter-select"
              value={roleFilterId}
              onChange={(e) => setRoleFilterId(e.target.value)}
              aria-label="فیلتر نقش"
            >
              <option value="">همهٔ نقش‌ها</option>
              {roleOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <div className="ta-density">
              <button
                type="button"
                className="ta-chip"
                data-active={tableDensity === 'compact'}
                onClick={() => setTableDensity('compact')}
              >
                فشرده
              </button>
              <button
                type="button"
                className="ta-chip"
                data-active={tableDensity === 'comfortable'}
                onClick={() => setTableDensity('comfortable')}
              >
                عادی
              </button>
            </div>
          </div>
          <table className={`ta-table ${tableDensity === 'compact' ? 'ta-table--compact' : ''}`}>
            <thead>
              <tr>
                <th>نام</th>
                <th>ایمیل</th>
                <th>نقش</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td className="font-semibold">{u.fullName}</td>
                  <td dir="ltr" className="font-mono text-xs">
                    {u.email}
                  </td>
                  <td>
                    <select
                      className="ta-inline-select"
                      disabled={rowBusyId === u.id}
                      value={u.roleIds[0] ?? ''}
                      onChange={(e) => void onInlineRoleChange(u.id, e.target.value)}
                    >
                      <option value="">بدون نقش</option>
                      {roleOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span
                      className={`ta-badge ${
                        u.accountStatus === 'Active'
                          ? u.invitePending
                            ? 'ta-badge--invite'
                            : 'ta-badge--ok'
                          : 'ta-badge--off'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <div className="ta-row-actions">
                      <button type="button" className="ta-link-btn" onClick={() => setInviteDetail(u)}>
                        مشاهده دعوت‌نامه
                      </button>
                      {u.accountStatus === 'Active' ? (
                        <button
                          type="button"
                          className="ta-link-btn ta-link-btn--danger"
                          onClick={() => void deactivateTenantUser(u.id).then(() => load())}
                        >
                          غیرفعال‌سازی
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="ta-link-btn"
                          onClick={() => void activateTenantUser(u.id).then(() => load())}
                        >
                          فعال‌سازی
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="ta-panel overflow-x-auto">
          <div className="flex justify-end p-3 border-b border-border">
            <button
              type="button"
              className="ta-btn text-xs"
              onClick={openRolesModal}
            >
              نقش جدید / ویرایش
            </button>
          </div>
          <table className="ta-table">
            <thead>
              <tr>
                <th>کد</th>
                <th>نام</th>
                <th>مجوزها</th>
                <th>انتساب</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono text-xs">{r.code}</td>
                  <td>{r.name}</td>
                  <td className="text-xs text-muted-foreground max-w-md truncate">{r.permissions.join(' · ')}</td>
                  <td>{r.assignees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {inviteOpen ? (
        <div
          className="ta-modal-backdrop"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && setInviteOpen(false)}
        >
          <div className="ta-modal ta-modal--wide" aria-labelledby="invite-title">
            <div className="ta-modal-header">
              <h2 id="invite-title">دعوت همکار جدید</h2>
              <button type="button" className="ta-btn ta-btn--ghost p-1" aria-label="بستن" onClick={() => setInviteOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              id="invite-form"
              className="ta-modal-body"
              onSubmit={(e) => {
                e.preventDefault();
                void submitInvite();
              }}
            >
              <div className="ta-field-row">
                <label className="ta-field">
                  نام *
                  <input
                    name="firstName"
                    placeholder="مثال: علی"
                    value={inviteForm.firstName}
                    onChange={(e) => setInviteForm((f) => ({ ...f, firstName: e.target.value }))}
                  />
                </label>
                <label className="ta-field">
                  نام خانوادگی *
                  <input
                    name="lastName"
                    placeholder="مثال: محمدی"
                    value={inviteForm.lastName}
                    onChange={(e) => setInviteForm((f) => ({ ...f, lastName: e.target.value }))}
                  />
                </label>
              </div>
              <label className="ta-field">
                شماره همراه *
                <input
                  name="phone"
                  dir="ltr"
                  placeholder="09xxxxxxxxx"
                  value={inviteForm.phone}
                  onChange={(e) => setInviteForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </label>
              <label className="ta-field">
                سمت سازمانی *
                <input
                  name="jobTitle"
                  placeholder="مثال: حسابدار، مدیر فروش، انباردار..."
                  value={inviteForm.jobTitle}
                  onChange={(e) => setInviteForm((f) => ({ ...f, jobTitle: e.target.value }))}
                />
              </label>
              <label className="ta-field">
                ایمیل (اختیاری)
                <input
                  name="email"
                  dir="ltr"
                  type="text"
                  inputMode="email"
                  autoComplete="off"
                  placeholder="در صورت خالی بودن از موبایل ساخته می‌شود"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm((f) => ({ ...f, email: e.target.value }))}
                />
              </label>
              <p className="text-xs text-muted-foreground mt-2">نقش پیشنهادی</p>
              <div className="ta-chip-row">
                {INVITE_CHIPS.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    className="ta-chip"
                    data-active={chipActive(c.label)}
                    onClick={() => toggleInviteChip(c.label)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">دسترسی ماژول‌ها</p>
              {catalog.length ? (
                <PermissionMatrix permissions={invitePermissions} onChange={setInvitePermissions} />
              ) : (
                <p className="text-xs text-amber-700">کاتالوگ مجوز بارگذاری نشد — API را چک کنید.</p>
              )}
              <div className="ta-modal-footer">
                <button type="button" className="ta-btn ta-btn--ghost" onClick={() => setInviteOpen(false)}>
                  انصراف
                </button>
                <button type="submit" className="ta-btn" disabled={busy}>
                  ارسال دعوت و ایجاد دسترسی
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {rolesModalOpen ? (
        <div
          className="ta-modal-backdrop"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && closeRolesModal()}
        >
          <div className="ta-modal ta-modal--wide" aria-labelledby="roles-title">
            <div className="ta-modal-header">
              <h2 id="roles-title">ویرایش دسترسی نقش‌ها</h2>
              <button type="button" className="ta-btn ta-btn--ghost p-1" aria-label="بستن" onClick={closeRolesModal}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <form id="role-form" className="ta-modal-body" onSubmit={(e) => { e.preventDefault(); void saveRoleFromModal(); }}>
              {!roleCreateMode ? (
                <label className="ta-field">
                  نقش
                  <select
                    className="border rounded-md p-2 bg-background w-full"
                    value={editRoleId}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        startCreateRole();
                        return;
                      }
                      setEditRoleId(e.target.value);
                    }}
                  >
                    {roleOptions.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                    <option value="__new__">+ نقش جدید…</option>
                  </select>
                </label>
              ) : (
                <label className="ta-field">
                  کد نقش *
                  <input
                    name="code"
                    value={roleForm.code}
                    onChange={(e) => setRoleForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                    placeholder="مثال: SALES_LEAD"
                  />
                </label>
              )}
              <label className="ta-field">
                عنوان نقش *
                <input
                  name="name"
                  value={roleForm.name}
                  onChange={(e) => setRoleForm((f) => ({ ...f, name: e.target.value }))}
                />
              </label>
              {catalog.length ? (
                <PermissionMatrix
                  permissions={roleForm.permissions}
                  onChange={(p) => setRoleForm((f) => ({ ...f, permissions: p }))}
                />
              ) : (
                <p className="text-xs text-amber-700 mt-2">کاتالوگ مجوز در دسترس نیست.</p>
              )}
            </form>
            <div className="ta-modal-footer">
              <button type="button" className="ta-btn ta-btn--ghost" onClick={closeRolesModal}>
                انصراف
              </button>
              <button
                type="button"
                className="ta-btn"
                disabled={busy || (!roleCreateMode && !editRoleId)}
                onClick={() => void saveRoleFromModal()}
              >
                {roleCreateMode ? 'ایجاد نقش' : 'ذخیره دسترسی نقش'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {inviteDetail ? (
        <div
          className="ta-modal-backdrop"
          role="presentation"
          onClick={(e) => e.target === e.currentTarget && setInviteDetail(null)}
        >
          <div className="ta-modal">
            <div className="ta-modal-header">
              <h2>دعوت‌نامه — {inviteDetail.fullName}</h2>
              <button type="button" className="ta-btn ta-btn--ghost p-1" onClick={() => setInviteDetail(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="ta-modal-body text-sm space-y-2">
              <p>
                <strong>ایمیل ورود:</strong>{' '}
                <span dir="ltr" className="font-mono">
                  {inviteDetail.email}
                </span>
              </p>
              <p>
                <strong>نقش:</strong> {inviteDetail.roles || '—'}
              </p>
              <p>
                <strong>وضعیت:</strong> {inviteDetail.status}
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                لینک فعال‌سازی و SMS در موج بعدی به Outbox متصل می‌شود. کاربر با reset رمز یا ورود اولین‌بار فعال
                می‌شود.
              </p>
            </div>
            <div className="ta-modal-footer">
              <button type="button" className="ta-btn ta-btn--ghost" onClick={() => setInviteDetail(null)}>
                بستن
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {userDrawer ? (
        <>
          <button type="button" className="ta-drawer-backdrop" aria-label="بستن" onClick={() => setUserDrawer(null)} />
          <aside className="ta-drawer">
            <div className="flex justify-between items-center mb-2">
              <h2>نقش {userDrawer.fullName}</h2>
              <button type="button" className="ta-btn ta-btn--ghost p-1" onClick={() => setUserDrawer(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <label className="ta-field">
              نقش
              <select
                className="border rounded-md p-2 bg-background"
                value={userRoleId}
                onChange={(e) => setUserRoleId(e.target.value)}
              >
                {roleOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                className="ta-btn flex-1"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    await patchTenantUserRoles(userDrawer.id, userRoleId ? [userRoleId] : []);
                    setUserDrawer(null);
                    await load();
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                ذخیره
              </button>
              {userDrawer.accountStatus === 'Active' ? (
                <button
                  type="button"
                  className="ta-btn ta-btn--ghost flex-1"
                  onClick={async () => {
                    await deactivateTenantUser(userDrawer.id);
                    setUserDrawer(null);
                    await load();
                  }}
                >
                  تعلیق
                </button>
              ) : null}
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
