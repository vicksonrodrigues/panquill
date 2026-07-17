import { db } from '@/drizzle/db'
import { recipes } from '@/drizzle/schema'
import { sql } from 'drizzle-orm'

export async function getTrendingRecipes() {
    const recipeList = db.query.recipes.findMany({
        orderBy: { viewCount: 'desc' },
    })
    /* .select()
    .from(recipes)
    .orderBy(sql`(${recipes.viewCount} + ${recipes.} * 3) DESC`)
    .limit(limit); */

    return recipeList
}
