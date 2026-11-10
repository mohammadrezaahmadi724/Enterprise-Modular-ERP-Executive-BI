# Break-Glass

- Super Admin به‌صورت پیش‌فرض به داده tenant دسترسی ندارد
- `breakGlassSessionId` در TenantContext
- RLS روی `sensitive_access_logs` فقط با `app.is_break_glass=true`
