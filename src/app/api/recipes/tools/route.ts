import { findTools } from '@/features/recipes/db/queries'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search') || ''
    const data = await findTools(search)

    return NextResponse.json(
        data.items.map((c) => ({
            id: c.id,
            value: c.normalizedName,
            label: c.name,
        }))
    )
}
