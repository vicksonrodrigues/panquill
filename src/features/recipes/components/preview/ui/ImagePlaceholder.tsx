// components/recipe-preview/ImagePlaceholder.tsx
'use client'

import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type ImagePlaceholderProps = {
    src?: string | null
    className?: string
}

export function RecipeImagePreview({ src, className }: ImagePlaceholderProps) {
    if (src) {
        return (
            <div className={cn('relative w-full overflow-hidden', className)}>
                <img
                    src={src}
                    alt="RecipeImage"
                    className="h-full w-full object-cover"
                />
            </div>
        )
    }

    return (
        <div
            className={cn(
                'relative h-48 w-full overflow-hidden sm:h-56',
                'bg-muted animate-pulse',
                className
            )}
        >
            {/* Skeleton pulse layer */}
            <div className="bg-muted absolute inset-0" />

            {/* Overlaid icon + text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="border-muted-foreground/30 flex h-12 w-12 items-center justify-center rounded-md border border-dashed">
                    <ImageIcon className="text-muted-foreground/50 h-5 w-5" />
                </div>
                <span className="text-muted-foreground/60 text-xs">
                    No image uploaded
                </span>
            </div>
        </div>
    )
}
