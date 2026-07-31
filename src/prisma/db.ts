import 'dotenv/config'
import { PrismaClient } from '../../prisma/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

import { env } from '@/data/env/database'

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL,
})

const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log:
            process.env.NODE_ENV === 'development'
                ? ['warn', 'error']
                : ['error'],
    })

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
