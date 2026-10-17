import { Eye } from 'lucide-react'
import React from 'react'

export default function ViewCountComponent({
    viewCount,
}: {
    viewCount: number | null
}) {
    return (
        <span className="flex items-center gap-1.5">
            <Eye className="size-4" />
            {viewCount ?? 0}
        </span>
    )
}
