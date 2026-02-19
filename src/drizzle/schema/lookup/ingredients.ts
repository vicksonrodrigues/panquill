import { id, normalizedName, timestamps } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { recipeIngredients } from "../junction/recipe-ingredients";

export const ingredients = pgTable("ingredients", {
  id: id(),
  name: text().notNull(),
  normalizedName: normalizedName(),
  ...timestamps,
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  recipes: many(recipeIngredients),
}));
