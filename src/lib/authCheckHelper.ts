import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function checkAuth() {
    const { userId } = await auth()

    if (!userId) {
        return {
            authorized: false as const,
            response: NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            ),
        }
    }

    return {
        authorized: true as const,
        userId,
    }
}
