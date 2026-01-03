CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "enum_users_role" AS ENUM ('ADMIN', 'STAFF');

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

INSERT INTO users VALUES (
    '1f5ae0a2-4f63-4b52-af03-ad09b9fe3518',
    'superadmin',
    'Super Admin',
    '$2b$10$bgsqt1qzbs7e5ExJwWw3Bu5EreHigAqQwHrUWYRYu558uBAhXHmU2',
    'ADMIN',
    now(),
    now()
);
