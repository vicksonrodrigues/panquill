import { prisma } from '@/prisma/db'

function shuffle<T>(items: T[]): T[] {
    const remaining = [...items]
    const shuffled: T[] = []

    while (remaining.length > 0) {
        const randomIndex = Math.floor(Math.random() * remaining.length)

        const removed = remaining.splice(randomIndex, 1)
        const pickedItem = removed[0]

        shuffled.push(pickedItem)
    }

    return shuffled
}

export async function rotateEditorsChoice(limit = 4) {
    const pool = await prisma.recipe.findMany({
        where: {
            isPublished: true,
            favouritesRecipes: { some: { user: { isAdmin: true } } },
        },
        select: { id: true },
    })

    const picked = shuffle(pool).slice(0, limit)

    const output = await prisma.$transaction([
        prisma.editorsChoice.deleteMany({}),
        prisma.editorsChoice.createMany({
            data: picked.map((r, index) => ({ recipeId: r.id, order: index })),
        }),
    ])

    return output
}
