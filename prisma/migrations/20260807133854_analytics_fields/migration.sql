-- AlterTable
ALTER TABLE "recipe_cuisines" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_primary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "recipe_tags" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_primary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "hot_score" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "recipe_views" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "viewed_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "recipe_id" UUID NOT NULL,

    CONSTRAINT "recipe_views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recipe_views_user_id_viewed_at_idx" ON "recipe_views"("user_id", "viewed_at");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_views_user_id_recipe_id_key" ON "recipe_views"("user_id", "recipe_id");

-- CreateIndex
CREATE INDEX "recipes_is_published_hot_score_idx" ON "recipes"("is_published", "hot_score");

-- AddForeignKey
ALTER TABLE "recipe_views" ADD CONSTRAINT "recipe_views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_views" ADD CONSTRAINT "recipe_views_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
