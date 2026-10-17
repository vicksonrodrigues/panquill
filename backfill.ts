import { prisma } from '@/prisma/db'

/* function slugify(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
}

async function main() {
    const recipes = await prisma.recipe.findMany({
        select: { id: true, title: true },
    })

    const seen = new Map<string, number>()

    for (const r of recipes) {
        const base = slugify(r.title)
        const count = seen.get(base) ?? 0
        seen.set(base, count + 1)

        const recipeUrl = count === 0 ? base : `${base}-${count + 1}`

        await prisma.recipe.update({
            where: { id: r.id },
            data: { recipeUrl },
        })
    }

    console.log(`Updated ${recipes.length} recipes`)
}

main().finally(() => prisma.$disconnect()) */

async function main() {
    const recipes = await prisma.recipe.findMany({
        include: {
            recipeCuisines: { orderBy: { createdAt: 'asc' } },
            recipeTags: { orderBy: { createdAt: 'asc' } },
        },
    })

    for (const recipe of recipes) {
        // Set first cuisine as primary
        if (recipe.recipeCuisines.length > 0) {
            await prisma.recipeCuisine.updateMany({
                where: { recipeId: recipe.id },
                data: { isPrimary: false },
            })
            await prisma.recipeCuisine.update({
                where: {
                    recipeId_cuisineId: {
                        recipeId: recipe.id,
                        cuisineId: recipe.recipeCuisines[0].cuisineId,
                    },
                },
                data: { isPrimary: true },
            })
            console.log(`✓ Recipe ${recipe.id}: cuisine set as primary`)
        }

        // Set first tag as primary
        if (recipe.recipeTags.length > 0) {
            await prisma.recipeTag.updateMany({
                where: { recipeId: recipe.id },
                data: { isPrimary: false },
            })
            await prisma.recipeTag.update({
                where: {
                    recipeId_tagId: {
                        recipeId: recipe.id,
                        tagId: recipe.recipeTags[0].tagId,
                    },
                },
                data: { isPrimary: true },
            })
            console.log(`✓ Recipe ${recipe.id}: tag set as primary`)
        }
    }

    console.log(`\nUpdated ${recipes.length} recipes`)
}

main().finally(() => prisma.$disconnect())
