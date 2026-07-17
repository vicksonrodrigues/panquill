import { id, timestamps } from '@/drizzle/schemaHelpers'
import {
    check,
    pgTable,
    smallint,
    unique,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import { recipes } from '../core/recipes'
import { users } from '../core/users'

import { relations, sql } from 'drizzle-orm'

export const recipeRatings = pgTable(
    'recipe_ratings',
    {
        id: id(),
        recipeId: uuid()
            .notNull()
            .references(() => recipes.id),
        userId: varchar()
            .notNull()
            .references(() => users.id),
        rating: smallint().notNull(),
        ...timestamps,
    },
    (t) => [
        unique('uniqueUserRecipeRating').on(t.recipeId, t.userId),
        check('ratingRange', sql`(${t.rating} >= 1 AND ${t.rating} <= 5)`),
    ]
)

export const recipeRatingsRelations = relations(recipeRatings, ({ one }) => ({
    recipe: one(recipes, {
        fields: [recipeRatings.recipeId],
        references: [recipes.id],
    }),
    user: one(users, {
        fields: [recipeRatings.userId],
        references: [users.id],
    }),
}))
