import { id, normalizedName, timestamps } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { recipes } from "../core/recipes";

export const cuisines = pgTable("cuisines", {
  id: id(),
  name: text().notNull(),
  normalizedName: normalizedName(),
  ...timestamps,
});

export const cuisinesRelations = relations(cuisines, ({ many }) => ({
  recipes: many(recipes),
}));
