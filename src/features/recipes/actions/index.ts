'use server'
import { auth } from '@clerk/nextjs/server'
import {
    createFavourite,
    deleteFavourite,
    incrementViewCount,
    markRecipeViewed,
    upsertRating,
} from '../db/mutations'
import {
    countFavourites,
    findCourses,
    findCuisines,
    findFavourite,
    findIngredients,
    findTags,
    findTools,
    getAggregateRating,
} from '../db/queries'

import { z } from 'zod'

const ratingSchema = z.number().int().min(1).max(5)

export async function getCourses(keyword: string) {
    return findCourses(keyword)
}

export async function getCuisines(keyword: string) {
    return findCuisines(keyword)
}

export async function getIngredients(keyword: string) {
    return findIngredients(keyword)
}

export async function getTags(keyword: string) {
    return findTags(keyword)
}

export async function getTools(keyword: string) {
    return findTools(keyword)
}

export async function registerRecipeVisit(recipeId: string) {
    const { userId } = await auth.protect()

    const recipeVisited = await markRecipeViewed(userId, recipeId)

    return recipeVisited
}

export async function registerRecipeView(recipeId: string) {
    const recipe = await incrementViewCount(recipeId)
    return recipe
}

export async function toggleFavouriteRecipe(recipeId: string) {
    const { userId } = await auth.protect()
    const existing = await findFavourite(userId, recipeId)
    if (existing) {
        await deleteFavourite(userId, recipeId)
    } else {
        await createFavourite(userId, recipeId)
    }

    const favouriteCount = await countFavourites(recipeId)

    return { success: true as const, isFavourited: !existing, favouriteCount }
}

export async function rateRecipe(recipeId: string, rating: number) {
    const { userId } = await auth.protect()

    const parsed = ratingSchema.safeParse(rating)
    if (!parsed.success)
        return { success: false as const, error: 'Invalid rating' }
    await upsertRating(userId, recipeId, rating)
    const { averageRating, ratingCount } = await getAggregateRating(recipeId)

    return {
        success: true as const,
        userRating: parsed.data,
        averageRating,
        ratingCount,
    }
}
