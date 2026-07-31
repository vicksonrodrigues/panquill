import { prisma } from '@/prisma/db'
import { Prisma } from '../../../../prisma/generated/prisma/client'
import { revalidateUserCache } from './cache/users'

export type UserCreateDBInput = Prisma.UserCreateInput

export type UserUpdateDBInput = Prisma.UserUpdateInput

export async function insertUser(user: UserCreateDBInput) {
    const userDetails = await prisma.user.upsert({
        where: { id: user.id },
        create: user,
        update: {},
    })

    console.log('User Details', userDetails)
    revalidateUserCache(user.id)
}

export async function updateUser(id: string, user: UserUpdateDBInput) {
    const userDetails = await prisma.user.update({
        where: { id },
        data: user,
    })

    console.log('Updated User Details', userDetails)
    revalidateUserCache(id)
}

export async function deleteUser(id: string) {
    await prisma.user.delete({ where: { id } })
}
