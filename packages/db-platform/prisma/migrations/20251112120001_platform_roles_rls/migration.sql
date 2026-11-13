ALTER TABLE platform.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform.user_role_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_roles ON platform.roles
  USING (
    tenant_id IS NULL
    OR tenant_id::text = current_setting('app.current_tenant_id', true)
    OR current_setting('app.is_super_admin', true) = 'true'
  );

CREATE POLICY tenant_isolation_user_roles ON platform.user_role_assignments
  USING (
    EXISTS (
      SELECT 1 FROM platform.users u
      WHERE u.id = user_id
        AND (
          u.tenant_id::text = current_setting('app.current_tenant_id', true)
          OR current_setting('app.is_super_admin', true) = 'true'
        )
    )
  );
