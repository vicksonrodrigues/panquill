import { NextResponse } from 'next/server'

export function handleApiError(error: unknown, context: string) {
    console.error(`${context}:`, error)

    // Handle known error types
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
    )
}
