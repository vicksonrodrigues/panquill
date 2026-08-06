import { prisma } from '@/prisma/db'

export async function getLastViewedRecipes() {
    const recipeList = await prisma.recipe.findMany({
        orderBy: { viewCount: 'desc' },
    })

    return recipeList
}

export async function getTrendingRecipes() {
    const recipeList = await prisma.recipe.findMany({
        orderBy: { viewCount: 'desc' },
    })

    return recipeList
}

export async function getEditorChoiceRecipes() {
    const recipeList = await prisma.recipe.findMany({
        orderBy: { viewCount: 'desc' },
    })

    return recipeList
}

export async function getRecommendationRecipes() {
    const recipeList = await prisma.recipe.findMany({
        orderBy: { viewCount: 'desc' },
    })

    return recipeList
}
