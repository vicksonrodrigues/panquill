import { db } from '@/drizzle/db'
import { recipes } from '@/drizzle/schema'
import { ilike } from 'drizzle-orm'

export async function findRecipes(search: string) {
    const allRecipeData = await db
        .select()
        .from(recipes)
        .where(search ? ilike(recipes.title, `%${search}%`) : undefined)
    return allRecipeData
}
