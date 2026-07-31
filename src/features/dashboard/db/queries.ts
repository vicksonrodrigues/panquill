import { prisma } from '@/prisma/db'

export async function getTrendingRecipes() {
    const recipeList = await prisma.recipe.findMany({
        orderBy: { viewCount: 'desc' },
    })

    return recipeList
}
