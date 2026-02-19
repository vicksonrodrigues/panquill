ALTER TABLE "recipes" RENAME COLUMN "created_by_user_id" TO "author_id";--> statement-breakpoint
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_created_by_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "is_published" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;