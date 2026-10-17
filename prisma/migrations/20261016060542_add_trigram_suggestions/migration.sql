CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX "recipes_title_trgm_idx" ON "recipes" USING GIN (title gin_trgm_ops);