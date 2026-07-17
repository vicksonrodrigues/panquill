import { Typography } from '@/components/shared/typography'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function RecipeTitle({ title }: { title: string }) {
    return (
        <div>
            {title ? (
                <Typography variant={'h2'}>{title}</Typography>
            ) : (
                <Skeleton className="h-6 w-3/5" />
            )}
        </div>
    )
}
