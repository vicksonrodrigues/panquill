import { prisma } from '@/prisma/db'

export async function findRecipes(search: string) {
    return prisma.recipe.findMany({
        where: search
            ? { title: { contains: search, mode: 'insensitive' } }
            : undefined,
    })
}
