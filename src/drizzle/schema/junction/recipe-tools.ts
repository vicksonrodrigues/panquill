import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { recipes } from "../core/recipes";
import { tools } from "../lookup/tools";
import { relations } from "drizzle-orm";
import { id } from "@/drizzle/schemaHelpers";

export const recipeTools = pgTable(
  "recipe_tools",
  {
    id: id(),
    recipeId: uuid()
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    toolId: uuid()
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.recipeId, t.toolId)]
);

export const recipeToolsRelations = relations(recipeTools, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTools.recipeId],
    references: [recipes.id],
  }),
  tool: one(tools, {
    fields: [recipeTools.toolId],
    references: [tools.id],
  }),
}));
