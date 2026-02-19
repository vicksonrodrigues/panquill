import { id, timestamps } from "@/drizzle/schemaHelpers";
import { pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "../core/users";
import { recipes } from "../core/recipes";
import { relations } from "drizzle-orm";

export const favouriteRecipes = pgTable(
  "favourite_recipes",
  {
    id: id(),
    userId: varchar()
      .notNull()
      .references(() => users.id),
    recipeId: uuid()
      .notNull()
      .references(() => recipes.id),
    ...timestamps,
  },
  (t) => [unique().on(t.userId, t.recipeId)]
);

export const favouriteRecipesRelations = relations(
  favouriteRecipes,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [favouriteRecipes.recipeId],
      references: [recipes.id],
    }),
    user: one(users, {
      fields: [favouriteRecipes.userId],
      references: [users.id],
    }),
  })
);
