import {
  boolean,
  check,
  integer,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { id, timestamps } from "@/drizzle/schemaHelpers";
import { courses } from "../lookup/courses";
import { users } from "./users";
import { cuisines } from "../lookup/cuisines";
import { relations, sql } from "drizzle-orm";
import { recipeTools } from "../junction/recipe-tools";
import { recipeIngredients } from "../junction/recipe-ingredients";
import { recipeTags } from "../junction/recipe-tags";
import { favouriteRecipes } from "../junction/favourite-recipes";

export const recipes = pgTable(
  "recipes",
  {
    /* recipe basic info */
    id: id(),
    title: text().notNull(),
    imageUrl: text().notNull(),
    description: text().notNull(),
    // references
    courseId: uuid().references(() => courses.id),
    cuisineId: uuid().references(() => cuisines.id),
    // recipe metrics
    prepTime: smallint(),
    cookTime: smallint(),
    servings: smallint(),
    viewCount: integer().default(0),
    steps: jsonb().$type<string[]>().notNull(),
    tips: jsonb().$type<string[]>(),
    authorId: varchar().references(() => users.id),
    isAdminRecipe: boolean().default(false),
    isPublished: boolean().default(false),
    publishedDate: timestamp({ withTimezone: true }),
    ...timestamps,
  },
  (t) => [
    check(
      "publishConsistency",
      sql`(${t.isPublished}=false AND ${t.publishedDate} IS NULL) OR (${t.isPublished}=true AND ${t.publishedDate} IS NOT NULL)`,
    ),
  ],
);

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  tags: many(recipeTags),
  course: one(courses, {
    fields: [recipes.courseId],
    references: [courses.id],
  }),
  cuisine: one(cuisines, {
    fields: [recipes.cuisineId],
    references: [cuisines.id],
  }),
  tools: many(recipeTools),
  ingredients: many(recipeIngredients),
  author: one(users, {
    fields: [recipes.authorId],
    references: [users.id],
  }),
  favourites: many(favouriteRecipes),
}));
