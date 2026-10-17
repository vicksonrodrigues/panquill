/*
  Warnings:

  - Made the column `prep_time` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cook_time` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passive_time` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `servings` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `view_count` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_admin_recipe` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_published` on table `recipes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "recipeUrl" TEXT,
ALTER COLUMN "prep_time" SET NOT NULL,
ALTER COLUMN "prep_time" SET DEFAULT 0,
ALTER COLUMN "cook_time" SET NOT NULL,
ALTER COLUMN "cook_time" SET DEFAULT 0,
ALTER COLUMN "passive_time" SET NOT NULL,
ALTER COLUMN "passive_time" SET DEFAULT 0,
ALTER COLUMN "servings" SET NOT NULL,
ALTER COLUMN "servings" SET DEFAULT 0,
ALTER COLUMN "view_count" SET NOT NULL,
ALTER COLUMN "is_admin_recipe" SET NOT NULL,
ALTER COLUMN "is_published" SET NOT NULL;
