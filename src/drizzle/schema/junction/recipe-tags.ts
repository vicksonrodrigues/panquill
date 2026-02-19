import { pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { recipes } from "../core/recipes";
import { relations } from "drizzle-orm";
import { id } from "@/drizzle/schemaHelpers";
import { tags } from "../lookup/tags";

export const recipeTags = pgTable(
  "recipe_tags",
  {
    id: id(),
    recipeId: uuid()
      .notNull()
      .references(() => recipes.id, { onDelete: "cascade" }),
    tagId: uuid()
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.recipeId, t.tagId)]
);

export const recipeTagsRelation = relations(recipeTags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTags.recipeId],
    references: [recipes.id],
  }),
  tag: one(tags, {
    fields: [recipeTags.tagId],
    references: [tags.id],
  }),
}));
