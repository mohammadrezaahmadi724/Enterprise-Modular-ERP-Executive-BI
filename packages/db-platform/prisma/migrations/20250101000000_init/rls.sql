-- RLS policies برای ایزولاسیون مستأجر — Wave 0

ALTER TABLE platform.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.tenant_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.module_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.idempotency_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_outbox.domain_events_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.sensitive_access_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_tenants ON platform.tenants
  USING (
    id::text = current_setting('app.current_tenant_id', true)
    OR current_setting('app.is_super_admin', true) = 'true'
  );

CREATE POLICY tenant_isolation_users ON platform.users
  USING (
    tenant_id::text = current_setting('app.current_tenant_id', true)
    OR current_setting('app.is_super_admin', true) = 'true'
  );

CREATE POLICY tenant_isolation_audit ON platform.audit_logs
  USING (
    tenant_id::text = current_setting('app.current_tenant_id', true)
    OR current_setting('app.is_super_admin', true) = 'true'
  );

CREATE POLICY tenant_isolation_modules ON platform.tenant_modules
  USING (
    tenant_id::text = current_setting('app.current_tenant_id', true)
    OR current_setting('app.is_super_admin', true) = 'true'
  );

CREATE POLICY tenant_isolation_flags ON platform.module_flags
  USING (
    tenant_id::text = current_setting('app.current_tenant_id', true)
    OR current_setting('app.is_super_admin', true) = 'true'
  );

CREATE POLICY tenant_isolation_idempotency ON platform.idempotency_keys
  USING (tenant_id::text = current_setting('app.current_tenant_id', true));

CREATE POLICY tenant_isolation_outbox ON platform_outbox.domain_events_outbox
  USING (tenant_id::text = current_setting('app.current_tenant_id', true));

CREATE POLICY break_glass_sensitive ON platform.sensitive_access_logs
  USING (current_setting('app.is_break_glass', true) = 'true');
