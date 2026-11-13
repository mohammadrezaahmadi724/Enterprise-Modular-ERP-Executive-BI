-- Tenant user suspend / activate
CREATE TYPE "platform"."UserAccountStatus" AS ENUM ('Active', 'Suspended');

ALTER TABLE "platform"."users"
ADD COLUMN IF NOT EXISTS "account_status" "platform"."UserAccountStatus" NOT NULL DEFAULT 'Active';
