CREATE TABLE IF NOT EXISTS "products" (
    "accurate_product_id" TEXT PRIMARY KEY,
    "product_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "item_type" TEXT NOT NULL,
    "selling_price" DECIMAL(18, 2) NOT NULL,
    "base_price" DECIMAL(18, 2) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "uk_products_accurateProductId" UNIQUE ("accurate_product_id"),
    CONSTRAINT "uk_products_productNumber" UNIQUE ("product_number")
);