import { GRAVITY, WINDOW_TIME } from '@/data/constantVariables'
import { prisma } from '@/prisma/db'

export async function markRecipeViewed(userId: string, recipeId: string) {
    const recipeViewed = await prisma.recipeView.upsert({
        where: { userId_recipeId: { userId, recipeId } },
        create: { userId, recipeId },
        update: { viewedAt: new Date() },
    })

    return recipeViewed
}

export async function incrementViewCount(recipeId: string) {
    const viewCount = await prisma.recipe.update({
        where: {
            id: recipeId,
        },
        data: {
            viewCount: { increment: 1 },
        },
        select: {
            viewCount: true,
        },
    })
    return viewCount
}

export async function computeHotScores() {
    const windowStart = new Date(Date.now() - WINDOW_TIME)
    const [recentFavourites, recentRatings, recipes] = await Promise.all([
        prisma.favouriteRecipe.groupBy({
            by: ['recipeId'],
            where: { createdAt: { gte: windowStart } },
            _count: true,
        }),
        prisma.recipeRating.groupBy({
            by: ['recipeId'],
            where: { createdAt: { gte: windowStart } },
            _count: true,
        }),
        prisma.recipe.findMany({
            where: { isPublished: true },
            select: {
                id: true,
                viewCount: true,
                publishedDate: true,
                createdAt: true,
            },
        }),
    ])
    const favMap = new Map(recentFavourites.map((f) => [f.recipeId, f._count]))
    const ratingMap = new Map(recentRatings.map((r) => [r.recipeId, r._count]))
    const updates = recipes.map((r) => {
        const points =
            (favMap.get(r.id) ?? 0) * 5 +
            (ratingMap.get(r.id) ?? 0) * 3 +
            (r.viewCount ?? 0) * 0.05
        const publishedAt = r.publishedDate ?? r.createdAt
        const ageHours = Math.max(
            (Date.now() - publishedAt.getTime()) / (1000 * 60 * 60),
            0
        )
        const hotScore = points / Math.pow(ageHours + 2, GRAVITY)
        return { id: r.id, hotScore }
    })
    await prisma.$transaction(
        updates.map((u) =>
            prisma.recipe.update({
                where: { id: u.id },
                data: { hotScore: u.hotScore },
            })
        )
    )

    return updates.length
}

export function createFavourite(userId: string, recipeId: string) {
    return prisma.favouriteRecipe.create({ data: { userId, recipeId } })
}

export function deleteFavourite(userId: string, recipeId: string) {
    return prisma.favouriteRecipe.delete({
        where: { userId_recipeId: { userId, recipeId } },
    })
}

export function upsertRating(userId: string, recipeId: string, rating: number) {
    return prisma.recipeRating.upsert({
        where: { recipeId_userId: { recipeId, userId } },
        create: { userId, recipeId, rating },
        update: { rating },
    })
}
