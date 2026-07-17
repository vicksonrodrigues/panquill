ALTER TABLE "courses" RENAME COLUMN "name" TO "label";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "normalized_name" TO "value";--> statement-breakpoint
ALTER TABLE "cuisines" RENAME COLUMN "name" TO "label";--> statement-breakpoint
ALTER TABLE "cuisines" RENAME COLUMN "normalized_name" TO "value";--> statement-breakpoint
ALTER TABLE "ingredients" RENAME COLUMN "name" TO "label";--> statement-breakpoint
ALTER TABLE "ingredients" RENAME COLUMN "normalized_name" TO "value";--> statement-breakpoint
ALTER TABLE "tools" RENAME COLUMN "name" TO "label";--> statement-breakpoint
ALTER TABLE "tools" RENAME COLUMN "normalized_name" TO "value";--> statement-breakpoint
ALTER TABLE "tags" RENAME COLUMN "name" TO "label";--> statement-breakpoint
ALTER TABLE "tags" RENAME COLUMN "normalized_name" TO "value";--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_normalizedName_unique";--> statement-breakpoint
ALTER TABLE "cuisines" DROP CONSTRAINT "cuisines_normalizedName_unique";--> statement-breakpoint
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_normalizedName_unique";--> statement-breakpoint
ALTER TABLE "tools" DROP CONSTRAINT "tools_normalizedName_unique";--> statement-breakpoint
ALTER TABLE "tags" DROP CONSTRAINT "tags_normalizedName_unique";--> statement-breakpoint
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_cuisine_id_cuisines_id_fk";
--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "passive_time" smallint;--> statement-breakpoint
ALTER TABLE "recipes" DROP COLUMN "cuisine_id";--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_value_unique" UNIQUE("value");--> statement-breakpoint
ALTER TABLE "cuisines" ADD CONSTRAINT "cuisines_value_unique" UNIQUE("value");--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_value_unique" UNIQUE("value");--> statement-breakpoint
ALTER TABLE "tools" ADD CONSTRAINT "tools_value_unique" UNIQUE("value");--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_value_unique" UNIQUE("value");