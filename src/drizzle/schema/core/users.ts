import { timestamps } from '@/drizzle/schemaHelpers'
import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, varchar } from 'drizzle-orm/pg-core'

import { favouriteRecipes } from '../junction/favourite-recipes'
import { recipes } from './recipes'
import { recipeRatings } from '../junction/recipe-ratings'

export const users = pgTable('users', {
    id: varchar().primaryKey(),
    firstName: text().notNull(),
    lastName: text(),
    email: text().notNull().unique(),
    profileImageUrl: text(),
    isAdmin: boolean(),
    ...timestamps,
})

export const usersRelations = relations(users, ({ many }) => ({
    favouriteRecipes: many(favouriteRecipes),
    recipes: many(recipes),
    recipeRatings: many(recipeRatings),
}))
