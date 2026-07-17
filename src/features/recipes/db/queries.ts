import { db } from '@/drizzle/db'
import { courses, cuisines, ingredients, tags, tools } from '@/drizzle/schema'
import { asc, ilike, sql } from 'drizzle-orm'

export async function findCourses(search: string) {
    const allCourseData = await db
        .select()
        .from(courses)
        .where(search ? ilike(courses.value, `%${search}%`) : undefined)
    return allCourseData
}

export async function findCuisines(search: string) {
    const allCuisineData = await db
        .select()
        .from(cuisines)
        .where(search ? ilike(cuisines.value, `%${search}%`) : undefined)
    return allCuisineData
}

export async function findTags(search: string) {
    const allTagsData = await db
        .select()
        .from(tags)
        .where(search ? ilike(tags.value, `%${search}%`) : undefined)
    return allTagsData
}

export async function findIngredients(search: string) {
    const allIngredientsData = await db
        .select()
        .from(ingredients)
        .where(search ? ilike(ingredients.value, `%${search}%`) : undefined)
    return allIngredientsData
}

export async function findTools(search: string) {
    const normalized = search.toLowerCase().replace(/\s+/g, '')
    const whereClause = ilike(tools.value, `%${normalized}%`)
    const results = await db
        .select({
            id: tools.id,
            label: tools.label,
            value: tools.value,
        })
        .from(tools)
        .where(whereClause)
        .orderBy(asc(tools.value))
        .limit(31)

    return {
        items: results.slice(0, 30), // Return only 30
        hasMore: results.length > 30,
    }
}
