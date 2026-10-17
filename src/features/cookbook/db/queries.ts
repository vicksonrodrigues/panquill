import { prisma } from '@/prisma/db'
import {
    CookbookFilters,
    CookbookSearchResult,
    FilterOption,
    PAGE_SIZE,
} from '../types'
import { splitTextSearch, toCard } from '../helperFunctions'

const CARD_SELECT = {
    id: true,
    title: true,
    description: true,
    imageUrl: true,
    prepTime: true,
    cookTime: true,
    passiveTime: true,
    viewCount: true,
    isAdminRecipe: true,
    course: { select: { label: true } },
    recipeCuisines: { select: { cuisine: { select: { label: true } } } },
    recipeTags: { select: { tag: { select: { label: true } } } },
    author: { select: { firstName: true, lastName: true } },
    _count: { select: { favouritesRecipes: true } },
} as const

export async function findRecipes(search: string) {
    return prisma.recipe.findMany({
        where: search
            ? { title: { contains: search, mode: 'insensitive' } }
            : undefined,
    })
}

async function getRecipeIdsWithMinRating(minRating: number) {
    const groups = await prisma.recipeRating.groupBy({
        by: ['recipeId'],
        _avg: { rating: true },
        having: {
            rating: {
                _avg: {
                    gte: minRating,
                },
            },
        },
    })
    return groups.map((g) => g.recipeId)
}

async function getFavouritedIds(userId: string, recipeIds: string[]) {
    const rows = await prisma.favouriteRecipe.findMany({
        where: { userId, recipeId: { in: recipeIds } },
        select: { recipeId: true },
    })
    return new Set(rows.map((r) => r.recipeId))
}

const RANKED_CANDIDATE_POOL_SIZE = 200

async function getSearchSuggestions(query: string): Promise<string[]> {
    if (query.length < 3) return [] // 1-2 letters match almost anything

    const rows = await prisma.$transaction(async (tx) => {
        await tx.$executeRaw`SET LOCAL pg_trgm.word_similarity_threshold = 0.4`
        return tx.$queryRaw<{ suggestion: string }[]>`
      SELECT suggestion
      FROM (
        SELECT title AS suggestion, word_similarity(${query}, title) AS sim
        FROM recipes
        WHERE is_published = true AND ${query} <% title
        UNION ALL
        SELECT label, word_similarity(${query}, label)
        FROM cuisines
        WHERE ${query} <% label
        UNION ALL
        SELECT label, word_similarity(${query}, label)
        FROM tags
        WHERE ${query} <% label
      ) s
      GROUP BY suggestion
      ORDER BY MAX(sim) DESC, suggestion
      LIMIT 3
    `
    })
    return rows.map((r) => r.suggestion)
}

async function getRecipeIdsRankedByAllFieldsSearch(tsQuery: string) {
    const rows = await prisma.$queryRaw<{ id: string; rank: number }[]>`
    SELECT r.id, ts_rank_cd(r.search_vector, q) AS rank
    FROM recipes r, websearch_to_tsquery('english', ${tsQuery}) AS q
    WHERE r.is_published = true
      AND r.search_vector @@ q
    ORDER BY rank DESC
    LIMIT ${RANKED_CANDIDATE_POOL_SIZE}
  `
    return rows.map((r) => r.id)
}

export async function searchCookbookRecipes(
    filters: CookbookFilters,
    page: number,
    userId?: string
): Promise<CookbookSearchResult> {
    const {
        searchField,
        query,
        courseId,
        cuisineIds,
        tagIds,
        maxTotalMins,
        minRating,
        sort,
    } = filters

    const isAllSearch = searchField === 'all'
    const textSearchQuery = isAllSearch ? splitTextSearch(query) : ''
    const rankedIds = textSearchQuery
        ? await getRecipeIdsRankedByAllFieldsSearch(textSearchQuery)
        : null

    if (textSearchQuery && rankedIds && rankedIds.length === 0) {
        return {
            recipes: [],
            totalCount: 0,
            suggestions: await getSearchSuggestions(textSearchQuery),
        }
    }

    const ratingQualifiedIds = minRating
        ? await getRecipeIdsWithMinRating(minRating)
        : null

    const where = {
        isPublished: true,
        ...primarySearchWhere(searchField, query),
        ...(courseId && { courseId }),
        ...(cuisineIds.length && {
            recipeCuisines: { some: { cuisineId: { in: cuisineIds } } },
        }),
        ...(tagIds.length && {
            recipeTags: { some: { tagId: { in: tagIds } } },
        }),

        ...(maxTotalMins && { prepTime: { lte: maxTotalMins } }),

        ...((rankedIds || ratingQualifiedIds) && {
            AND: [
                ...(rankedIds ? [{ id: { in: rankedIds } }] : []),
                ...(ratingQualifiedIds
                    ? [{ id: { in: ratingQualifiedIds } }]
                    : []),
            ],
        }),
    }

    if (rankedIds) {
        const rankById = new Map(rankedIds.map((id, i) => [id, i]))
        const allMatches = await prisma.recipe.findMany({
            where,
            select: CARD_SELECT,
        })
        allMatches.sort(
            (a, b) =>
                (rankById.get(a.id) ?? Infinity) -
                (rankById.get(b.id) ?? Infinity)
        )

        const start = (page - 1) * PAGE_SIZE
        const pageItems = allMatches.slice(start, start + PAGE_SIZE)
        const favouritedIds = userId
            ? await getFavouritedIds(
                  userId,
                  pageItems.map((r) => r.id)
              )
            : undefined
        return {
            recipes: pageItems.map((r) => toCard(r, favouritedIds)),
            totalCount: allMatches.length,
        }
    }

    const [recipes, totalCount] = await Promise.all([
        prisma.recipe.findMany({
            where,
            orderBy:
                sort === 'newest'
                    ? { publishedDate: 'desc' }
                    : sort === 'quickest'
                      ? { prepTime: 'asc' }
                      : { hotScore: 'desc' },
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
            select: CARD_SELECT,
        }),
        prisma.recipe.count({ where }),
    ])

    const favouritedIds = userId
        ? await getFavouritedIds(
              userId,
              recipes.map((r) => r.id)
          )
        : undefined

    return {
        recipes: recipes.map((r) => toCard(r, favouritedIds)),
        totalCount,
    }
}

export async function getCookbookFilterOptions(): Promise<{
    courses: FilterOption[]
    cuisines: FilterOption[]
    tags: FilterOption[]
}> {
    const [courses, cuisines, tags] = await Promise.all([
        prisma.course.findMany({
            select: { id: true, label: true, value: true },
        }),
        prisma.cuisine.findMany({
            select: { id: true, label: true, value: true },
        }),
        prisma.tag.findMany({ select: { id: true, label: true, value: true } }),
    ])
    return { courses, cuisines, tags }
}

export async function getCourseFilterOptions(
    search: string
): Promise<FilterOption[]> {
    const normalized = search.toLowerCase().replace(/\s+/g, '')
    const courses = await prisma.course.findMany({
        select: {
            id: true,
            label: true,
            value: true,
        },
        where: search
            ? { value: { contains: normalized, mode: 'insensitive' } }
            : undefined,
        orderBy: { value: 'asc' },
        take: 31,
    })
    return courses
}

function primarySearchWhere(
    searchField: CookbookFilters['searchField'],
    query: string
) {
    switch (searchField) {
        case 'course':
            return query
                ? {
                      course: {
                          label: {
                              contains: query,
                              mode: 'insensitive' as const,
                          },
                      },
                  }
                : {}
        case 'cuisine':
            return query
                ? {
                      recipeCuisines: {
                          some: {
                              cuisine: {
                                  label: {
                                      contains: query,
                                      mode: 'insensitive' as const,
                                  },
                              },
                          },
                      },
                  }
                : {}
        case 'tag':
            return query
                ? {
                      recipeTags: {
                          some: {
                              tag: {
                                  label: {
                                      contains: query,
                                      mode: 'insensitive' as const,
                                  },
                              },
                          },
                      },
                  }
                : {}
        case 'all':
            return {} // handled separately — see rankedIds below
    }
}
