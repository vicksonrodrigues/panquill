import { Typography } from '@/components/shared/typography'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function RecipeDescription({ desc }: { desc: string }) {
    return desc ? (
        <Typography
            as={'p'}
            variant={'body'}
            className="text-muted-foreground mt-2"
        >
            {desc}
        </Typography>
    ) : (
        <div className="space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <p className="text-muted-foreground pt-1 text-xs">
                No description yet
            </p>
        </div>
    )
}
