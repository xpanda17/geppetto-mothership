CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "enum_users_role" AS ENUM ('admin', 'staff');

CREATE TABLE "users" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "username" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "role" "enum_users_role" NOT NULL,

    -- Timestamps (from baseAttributes)
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Constraints
    CONSTRAINT "uk_users_username" UNIQUE ("username")
);
