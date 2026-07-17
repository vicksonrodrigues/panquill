import 'dotenv/config'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

import { env } from '@/data/env/database'

const adapter = new PrismaNeon({
    connectionString: env.DATABASE_URL,
})

/* const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient
} */

export const prisma =
    /* globalForPrisma.prisma ?? */
    new PrismaClient({
        adapter,
    })

/* if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}
 */
