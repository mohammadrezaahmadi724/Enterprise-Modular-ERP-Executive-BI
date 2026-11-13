-- RLS چندمستأجری برای schemaهای ERP (erp_hr · erp_finance · erp_operations)
-- پیش‌نیاز: session vars از اپ — SET LOCAL app.current_tenant_id / app.is_super_admin
-- اجرا: psql $DATABASE_URL -f packages/db-core-adapter/sql/erp-tenant-rls.sql

CREATE OR REPLACE FUNCTION erp_core.apply_tenant_isolation_policy(schema_name text, table_name text) RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  policy_name text := 'tenant_isolation_' || table_name;
  qualified text := quote_ident(schema_name) || '.' || quote_ident(table_name);
BEGIN
  EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', qualified);
  EXECUTE format('DROP POLICY IF EXISTS %I ON %s', policy_name, qualified);
  EXECUTE format(
    'CREATE POLICY %I ON %s FOR ALL USING (
      tenant_id::text = current_setting(''app.current_tenant_id'', true)
      OR current_setting(''app.is_super_admin'', true) = ''true''
    )',
    policy_name,
    qualified
  );
END;
$$;

DO $$
DECLARE
  r record;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'erp_core') THEN
    CREATE SCHEMA erp_core;
  END IF;

  FOR r IN
    SELECT table_schema, table_name
    FROM information_schema.columns
    WHERE column_name = 'tenant_id'
      AND table_schema IN ('erp_hr', 'erp_finance', 'erp_operations')
    GROUP BY table_schema, table_name
  LOOP
    PERFORM erp_core.apply_tenant_isolation_policy(r.table_schema, r.table_name);
    RAISE NOTICE 'RLS applied: %.%', r.table_schema, r.table_name;
  END LOOP;
END;
$$;
