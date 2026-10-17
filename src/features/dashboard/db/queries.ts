import {
    CANDIDATE_POOL,
    RECOMMENDATION_WEIGHTS,
} from '@/data/constantVariables'
import { getRelativeTime } from '@/lib/calRelativeTime'
import { prisma } from '@/prisma/db'
import { addWeights, formatReason, getTopMatch } from '../helperFunction'
import { RecWeightEntry } from '../types'

export async function getLastViewedRecipes(userId: string) {
    const views = await prisma.recipeView.findMany({
        where: { userId },
        orderBy: { viewedAt: 'desc' },
        take: 8,
        include: {
            recipe: { select: { id: true, title: true, imageUrl: true } },
        },
    })
    return views.map((v) => ({
        id: v.recipe.id,
        url: `/recipes/${v.recipe.id}`,
        image: v.recipe.imageUrl ?? '/placeholder-recipe.jpg',
        title: v.recipe.title,
        viewedAtLabel: getRelativeTime(v.viewedAt),
    }))
}

export async function getTrendingRecipes() {
    const recipeList = await prisma.recipe.findMany({
        where: { isPublished: true },
        orderBy: { hotScore: 'desc' },
        take: 10,
        include: {
            course: true,
            author: { select: { firstName: true, lastName: true } },
            recipeCuisines: { include: { cuisine: true } },
            recipeTags: { include: { tag: true } },
            _count: { select: { favouritesRecipes: true } },
        },
    })

    return recipeList
}

export async function getEditorsChoice() {
    const picks = await prisma.editorsChoice.findMany({
        orderBy: { order: 'asc' },
        include: {
            recipe: {
                include: {
                    course: true,
                    author: { select: { firstName: true, lastName: true } },
                    recipeCuisines: { include: { cuisine: true } },
                    recipeTags: { include: { tag: true } },
                    _count: { select: { favouritesRecipes: true } },
                },
            },
        },
    })
    return picks.map((p) => p.recipe)
}

const tagCuisineSelect = {
    recipeTags: {
        select: {
            tagId: true,
            isPrimary: true,
            tag: { select: { label: true } },
        },
    },
    recipeCuisines: {
        select: {
            cuisineId: true,
            isPrimary: true,
            cuisine: { select: { label: true } },
        },
    },
} as const

export async function getRecommendationRecipes(userId: string, limit = 12) {
    const [favourited, ratedHigh, recentlyViewed] = await Promise.all([
        prisma.recipe.findMany({
            where: { favouritesRecipes: { some: { userId } } },
            select: { id: true, ...tagCuisineSelect },
        }),
        prisma.recipe.findMany({
            where: {
                recipeRatings: { some: { userId, rating: { gte: 3 } } },
            },
            select: { id: true, ...tagCuisineSelect },
        }),
        prisma.recipeView
            .findMany({
                where: { userId },
                orderBy: { viewedAt: 'desc' },
                take: 8,
                select: {
                    recipe: { select: { id: true, ...tagCuisineSelect } },
                },
            })
            .then((views) => views.map((v) => v.recipe)),
    ])

    const seenIds = new Set([
        ...favourited.map((r) => r.id),
        ...ratedHigh.map((r) => r.id),
        ...recentlyViewed.map((r) => r.id),
    ])

    if (seenIds.size === 0) {
        const trending = await prisma.recipe.findMany({
            where: { isPublished: true },
            orderBy: { hotScore: 'desc' },
            take: limit,
            include: {
                course: true,
                author: { select: { firstName: true, lastName: true } },
                recipeCuisines: { include: { cuisine: true } },
                recipeTags: { include: { tag: true } },
                _count: { select: { favouritesRecipes: true } },
            },
        })
        return trending.map((r) => ({ ...r, reason: 'Popular right now' }))
    }

    const tagWeights = new Map<string, RecWeightEntry>()
    const cuisineWeights = new Map<string, RecWeightEntry>()
    for (const r of favourited)
        addWeights(
            tagWeights,
            cuisineWeights,
            r.recipeTags,
            r.recipeCuisines,
            RECOMMENDATION_WEIGHTS.favorite,
            'favourite'
        )
    for (const r of ratedHigh)
        addWeights(
            tagWeights,
            cuisineWeights,
            r.recipeTags,
            r.recipeCuisines,
            RECOMMENDATION_WEIGHTS.rating,
            'rating'
        )
    for (const r of recentlyViewed)
        addWeights(
            tagWeights,
            cuisineWeights,
            r.recipeTags,
            r.recipeCuisines,
            RECOMMENDATION_WEIGHTS.view,
            'view'
        )

    const candidate = await prisma.recipe.findMany({
        where: {
            isPublished: true,
            id: { notIn: [...seenIds] },
            OR: [
                {
                    recipeTags: {
                        some: { tagId: { in: [...tagWeights.keys()] } },
                    },
                },
                {
                    recipeCuisines: {
                        some: { cuisineId: { in: [...cuisineWeights.keys()] } },
                    },
                },
            ],
        },
        select: { id: true, hotScore: true, ...tagCuisineSelect },
        take: CANDIDATE_POOL,
    })

    const scored = candidate
        .map((c) => {
            const tagScore = c.recipeTags.reduce(
                (s, t) => s + (tagWeights.get(t.tagId)?.weight ?? 0),
                0
            )
            const cuisineScore = c.recipeCuisines.reduce(
                (s, cu) => s + (cuisineWeights.get(cu.cuisineId)?.weight ?? 0),
                0
            )
            const score =
                tagScore +
                cuisineScore +
                c.hotScore * RECOMMENDATION_WEIGHTS.hotScoreTiebreak

            const reason = formatReason(
                getTopMatch(
                    c.recipeTags,
                    c.recipeCuisines,
                    tagWeights,
                    cuisineWeights
                )
            )
            return { id: c.id, score, reason }
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)

    const recipes = await prisma.recipe.findMany({
        where: { id: { in: scored.map((s) => s.id) } },
        include: {
            course: true,
            author: { select: { firstName: true, lastName: true } },
            recipeCuisines: { include: { cuisine: true } },
            recipeTags: { include: { tag: true } },
            _count: { select: { favouritesRecipes: true } },
        },
    })
    const byId = new Map(recipes.map((r) => [r.id, r]))
    return scored.map((s) => ({ ...byId.get(s.id)!, reason: s.reason }))
}
