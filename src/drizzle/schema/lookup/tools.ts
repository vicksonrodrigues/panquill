import { id, normalizedName, timestamps } from '@/drizzle/schemaHelpers'
import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { recipeTools } from '../junction/recipe-tools'

export const tools = pgTable('tools', {
    id: id(),
    label: text().notNull(),
    value: normalizedName(),
    ...timestamps,
})

export const toolsRelations = relations(tools, ({ many }) => ({
    recipes: many(recipeTools),
}))
