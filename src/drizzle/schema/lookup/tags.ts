import { id, normalizedName, timestamps } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { recipeTags } from "../junction/recipe-tags";

export const tags = pgTable("tags", {
  id: id(),
  name: text().notNull(),
  normalizedName: normalizedName(),
  ...timestamps,
});

export const tagsRelations = relations(tags, ({ many }) => ({
  recipes: many(recipeTags),
}));
