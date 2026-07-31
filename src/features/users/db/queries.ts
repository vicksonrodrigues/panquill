import { prisma } from '@/prisma/db'
import { cacheTag } from 'next/cache'
import { getUserIdTag } from './cache/users'

export async function getUser(id: string) {
    'use cache'
    cacheTag(getUserIdTag(id))

    const userData = await prisma.user.findUnique({
        where: { id },
    })
    return userData
}
