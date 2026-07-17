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
} from 'drizzle-orm/pg-core'
import { id, timestamps } from '@/drizzle/schemaHelpers'
import { courses } from '../lookup/courses'
import { users } from './users'
import { relations, sql } from 'drizzle-orm'
import { recipeTools } from '../junction/recipe-tools'
import { recipeIngredients } from '../junction/recipe-ingredients'
import { recipeTags } from '../junction/recipe-tags'
import { favouriteRecipes } from '../junction/favourite-recipes'
import { recipeRatings } from '../junction/recipe-ratings'
import { recipeCuisines } from '../junction/recipe-cuisines'

export const recipes = pgTable(
    'recipes',
    {
        /* recipe basic info */
        id: id(),
        title: text().notNull(),
        description: text().notNull(),
        imageUrl: text().notNull(),
        // references
        courseId: uuid().references(() => courses.id),
        // recipe metrics
        prepTime: smallint(),
        cookTime: smallint(),
        passiveTime: smallint(),
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
            'publishConsistency',
            sql`(${t.isPublished}=false AND ${t.publishedDate} IS NULL) OR (${t.isPublished}=true AND ${t.publishedDate} IS NOT NULL)`
        ),
    ]
)

export const recipesRelations = relations(recipes, ({ one, many }) => ({
    tags: many(recipeTags),
    course: one(courses, {
        fields: [recipes.courseId],
        references: [courses.id],
    }),
    cuisine: many(recipeCuisines),
    tools: many(recipeTools),
    ingredients: many(recipeIngredients),
    author: one(users, {
        fields: [recipes.authorId],
        references: [users.id],
    }),
    favourites: many(favouriteRecipes),
    ratings: many(recipeRatings),
}))
