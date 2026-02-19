import { pgTable, uuid, text, unique } from "drizzle-orm/pg-core";
import { recipes } from "../core/recipes";
import { ingredients } from "../lookup/ingredients";
import { id, timestamps } from "@/drizzle/schemaHelpers";
import { relations } from "drizzle-orm";

export const recipeIngredients = pgTable(
  "recipe_ingredients",
  {
    id: id(),
    recipeId: uuid()
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    ingredientId: uuid()
      .notNull()
      .references(() => ingredients.id),
    quantity: text(),
    ...timestamps,
  },
  (t) => [unique().on(t.recipeId, t.ingredientId)]
);

export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id],
    }),
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredientId],
      references: [ingredients.id],
    }),
  })
);
