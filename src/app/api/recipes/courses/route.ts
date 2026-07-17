import { findCourses } from '@/features/recipes/db/queries'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search') || ''
    const data = await findCourses(search)
    return NextResponse.json(
        data.map((c) => ({ id: c.id, value: c.normalizedName, label: c.name }))
    )
}
