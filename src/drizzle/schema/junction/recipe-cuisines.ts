import { id } from '@/drizzle/schemaHelpers'
import { pgTable, unique, uuid } from 'drizzle-orm/pg-core'
import { recipes } from '../core/recipes'
import { cuisines } from '../lookup/cuisines'
import { relations } from 'drizzle-orm'

export const recipeCuisines = pgTable(
    'recipe_cuisines',
    {
        id: id(),
        recipeId: uuid()
            .notNull()
            .references(() => recipes.id),
        cuisineId: uuid()
            .notNull()
            .references(() => cuisines.id),
    },
    (t) => [unique().on(t.recipeId, t.cuisineId)]
)

export const recipeCuisinesRelation = relations(recipeCuisines, ({ one }) => ({
    recipe: one(recipes, {
        fields: [recipeCuisines.recipeId],
        references: [recipes.id],
    }),
    cuisine: one(cuisines, {
        fields: [recipeCuisines.cuisineId],
        references: [cuisines.id],
    }),
}))
