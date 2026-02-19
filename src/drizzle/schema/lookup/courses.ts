import { pgTable, text } from "drizzle-orm/pg-core";
import { id, normalizedName, timestamps } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { recipes } from "../core/recipes";

export const courses = pgTable("courses", {
  id: id(),
  name: text().notNull(),
  normalizedName: normalizedName(),
  ...timestamps,
});

export const coursesRelations = relations(courses, ({ many }) => ({
  recipes: many(recipes),
}));
