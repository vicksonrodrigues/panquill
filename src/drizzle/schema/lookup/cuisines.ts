import { id, normalizedName, timestamps } from '@/drizzle/schemaHelpers'
import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { recipeCuisines } from '../junction/recipe-cuisines'

export const cuisines = pgTable('cuisines', {
    id: id(),
    label: text().notNull(),
    value: normalizedName(),
    ...timestamps,
})

export const cuisinesRelations = relations(cuisines, ({ many }) => ({
    recipes: many(recipeCuisines),
}))
