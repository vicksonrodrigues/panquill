import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type EmptyLinesProps = {
    count: number
    label: string
    type: 'ingredient' | 'step'
}

export default function EmptyLines({ count, label, type }: EmptyLinesProps) {
    return (
        <div className="space-y-1.5">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                    {type === 'ingredient' && (
                        <span className="bg-muted h-1.5 w-1.5 shrink-0 rounded-full" />
                    )}
                    {type === 'step' && (
                        <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                    )}
                    <Skeleton
                        className="h-3 flex-1"
                        style={{ width: `${70 + i * 10}%` }}
                    />
                </div>
            ))}
            <p className="text-muted-foreground pt-1 text-xs">{label}</p>
        </div>
    )
}
