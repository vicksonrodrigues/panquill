import { prisma } from '@/prisma/db'
import { FullRecipeView, recipeWithDetailsInclude } from '../types'

export async function findCourses(search: string) {
    const allCourseData = await prisma.course.findMany({
        where: search
            ? { value: { contains: search, mode: 'insensitive' } }
            : undefined,
    })

    return allCourseData
}

export async function findCuisines(search: string) {
    const allCuisineData = await prisma.cuisine.findMany({
        where: search
            ? { value: { contains: search, mode: 'insensitive' } }
            : undefined,
    })
    return allCuisineData
}

export async function findTags(search: string) {
    return prisma.tag.findMany({
        where: search
            ? { value: { contains: search, mode: 'insensitive' } }
            : undefined,
    })
}

export async function findIngredients(search: string) {
    return prisma.ingredient.findMany({
        where: search
            ? { value: { contains: search, mode: 'insensitive' } }
            : undefined,
    })
}

export async function findTools(search: string) {
    const normalized = search.toLowerCase().replace(/\s+/g, '')
    const results = await prisma.tool.findMany({
        where: { value: { contains: normalized, mode: 'insensitive' } },
        select: { id: true, label: true, value: true },
        orderBy: { value: 'asc' },
        take: 31,
    })

    return {
        items: results.slice(0, 30),
        hasMore: results.length > 30,
    }
}

export async function getRecipeFromId(
    id: string,
    currentUserId: string | null
): Promise<FullRecipeView | null> {
    const [
        recipe,
        favouriteCount,
        ratingAgg,
        currentUserFavourite,
        currentUserRatingRow,
    ] = await Promise.all([
        prisma.recipe.findUnique({
            where: { id: id },
            include: recipeWithDetailsInclude,
        }),
        countFavourites(id),
        getAggregateRating(id),
        currentUserId
            ? findFavourite(currentUserId, id)
            : Promise.resolve(null),
        currentUserId
            ? findUserRating(currentUserId, id)
            : Promise.resolve(null),
    ])

    if (!recipe) return null

    return {
        ...recipe,
        favouriteCount,
        averageRating: ratingAgg.averageRating,
        ratingCount: ratingAgg.ratingCount,
        isFavouritedByCurrentUser: Boolean(currentUserFavourite),
        currentUserRating: currentUserRatingRow?.rating ?? null,
    }
}

export function findUserRating(userId: string, recipeId: string) {
    return prisma.recipeRating.findUnique({
        where: { recipeId_userId: { userId, recipeId } },
        select: { rating: true },
    })
}

export async function getAggregateRating(recipeId: string) {
    const result = await prisma.recipeRating.aggregate({
        where: { recipeId },
        _avg: { rating: true },
        _count: true,
    })
    return {
        averageRating: result._avg.rating ?? 0,
        ratingCount: result._count,
    }
}

export function countFavourites(recipeId: string) {
    return prisma.favouriteRecipe.count({ where: { recipeId } })
}

export function findFavourite(userId: string, recipeId: string) {
    return prisma.favouriteRecipe.findUnique({
        where: { userId_recipeId: { userId, recipeId } },
        select: { id: true },
    })
}
