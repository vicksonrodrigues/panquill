import { createEnv } from '@t3-oss/env-core'

import { z } from 'zod'

export const env = createEnv({
    server: {
        DB_USER: z.string().min(1),
        DB_PASSWORD: z.string().min(1),
        DB_HOST: z.string().min(1),
        DB_PORT: z.string().default('5432'),
        DB_NAME: z.string().min(1),
    },
    createFinalSchema: (shape) =>
        z.object(shape).transform((env) => {
            const url = `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`

            return {
                ...env,
                DATABASE_URL: url,
            }
        }),
    runtimeEnv: process.env,

    emptyStringAsUndefined: true,
})
