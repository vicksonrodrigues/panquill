'use client'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { rateRecipe } from '@/features/recipes/actions'
import { useAuth } from '@clerk/nextjs'
import { Star } from 'lucide-react'
import React, { useState, useTransition } from 'react'

export default function RatingComponent({
    recipeId,
    averageRating,
    ratingCount,
    userRating: initialUserRating,
}: {
    recipeId: string
    averageRating: number
    ratingCount: number
    userRating: number | null
}) {
    const [userRating, setUserRating] = useState(initialUserRating)
    const [avg, setAvg] = useState(averageRating)
    const [count, setCount] = useState(ratingCount)
    const [hovered, setHovered] = useState<number | null>(null)
    const [isPending, startTransition] = useTransition()
    const { userId } = useAuth()

    const handleRate = (value: number) => {
        const prev = { avg, count, userRating }
        setUserRating(value)
        startTransition(async () => {
            const result = await rateRecipe(recipeId, value)
            if (result.success) {
                setAvg(result.averageRating)
                setCount(result.ratingCount)
                setUserRating(result.userRating)
            } else {
                setUserRating(prev.userRating)
                setAvg(prev.avg)
                setCount(prev.count)
            }
        })
    }

    const triggerLabel = (
        <>
            <Star className={'text-primary size-4'} />
            {avg > 0 ? `${avg.toFixed(1)} (${count})` : 'No ratings'}
        </>
    )

    if (!userId) {
        return (
            <Tooltip>
                <TooltipTrigger
                    render={
                        <span
                            aria-disabled="true"
                            tabIndex={0}
                            className="text-muted-foreground flex cursor-not-allowed items-center gap-1 text-sm opacity-50"
                        />
                    }
                >
                    {triggerLabel}
                </TooltipTrigger>
                <TooltipContent>
                    <p>Log in to rate this recipe</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    return (
        <Popover>
            <PopoverTrigger className="flex items-center gap-1 text-sm">
                {triggerLabel}
            </PopoverTrigger>
            <PopoverContent className={'w-auto p-3'} align="start">
                <p className="text-muted-foreground mb-2 text-xs">
                    {userRating ? 'Your rating' : 'Rate this recipe'}
                </p>
                <div
                    className="flex gap-1"
                    onMouseLeave={() => setHovered(null)}
                >
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            disabled={isPending}
                            aria-label={`Rate ${value} stars`}
                            onMouseEnter={() => setHovered(value)}
                            onClick={() => handleRate(value)}
                        >
                            <Star
                                className={`size-5 ${
                                    (hovered ?? userRating ?? 0) >= value
                                        ? 'fill-primary text-primary'
                                        : 'text-muted-foreground'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
