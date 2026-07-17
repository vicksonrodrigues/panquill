import { createEnv } from '@t3-oss/env-core'

import { z } from 'zod'

export const env = createEnv({
    server: {
        DB_USER: z.string().min(1),
        DB_PASSWORD: z.string().min(1),
        DB_HOST: z.string().min(1),
        DIRECT_DB_HOST: z.string().min(1),
        DB_NAME: z.string().min(1),
    },
    createFinalSchema: (shape) =>
        z.object(shape).transform((env) => {
            const pooled = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?sslmode=verify-full`

            const direct = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DIRECT_DB_HOST}/${env.DB_NAME}?sslmode=verify-full`

            return {
                ...env,
                DATABASE_URL: pooled,
                DIRECT_DATABASE_URL: direct,
            }
        }),
    runtimeEnv: process.env,

    emptyStringAsUndefined: true,
})
