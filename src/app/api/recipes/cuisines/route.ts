import { findCuisines } from '@/features/recipes/db/queries'
import { handleApiError } from '@/lib/apiErrorHelper'
import { checkAuth } from '@/lib/authCheckHelper'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    try {
        // Auth check
        const authResult = await checkAuth()
        if (!authResult.authorized) {
            return authResult.response
        }

        // Get search param
        const search = req.nextUrl.searchParams.get('search') || ''
        const data = await findCuisines(search)

        return NextResponse.json(
            data.map((c) => ({
                id: c.id,
                value: c.normalizedName,
                label: c.name,
            }))
        )
    } catch (error) {
        return handleApiError(error, 'GET /api/recipes/cuisines')
    }
}
