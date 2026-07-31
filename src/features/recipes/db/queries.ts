import { prisma } from '@/prisma/db'

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
