import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Eye, Heart, HeartIcon, Timer } from 'lucide-react'
import Image from 'next/image'
import { RecipeCardData } from '../../types'

interface RecipeCardType {
    data: RecipeCardData
    favourite: boolean
}

export function RecipeCard({ data, favourite }: RecipeCardType) {
    return (
        <div className="group bg-muted relative flex h-full flex-col overflow-hidden rounded-3xl p-2">
            <Image
                src={data.imageUrl}
                alt={data.title}
                className="h-72 w-full rounded-2xl object-cover object-center"
                width={1000}
                height={1000}
            />
            <div className="flex h-full flex-col p-4">
                <div className="mt-2 flex h-full flex-col justify-between gap-2 p-2">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                            {data.title}
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                            {data.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="text-muted-foreground line-clamp-2 text-sm md:text-base">
                            <span>
                                Preparation Time:{' '}
                                <Badge className="gap-2 bg-violet-500 dark:bg-violet-200">
                                    {data.prepTime}
                                    <Timer />
                                </Badge>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className="gap-2 bg-sky-400 dark:bg-sky-200">
                                <Eye />
                                {data.viewCount}
                            </Badge>
                            <Badge className="gap-2 bg-rose-400 dark:bg-rose-200">
                                <Heart />
                                {data.favouriteCount}
                            </Badge>
                        </div>
                    </div>
                </div>

                <Button className="mt-4 ml-auto flex items-center text-sm font-semibold tracking-wide">
                    View Recipe
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                    variant="ghost"
                    className="absolute top-4 right-4 size-10"
                >
                    {favourite ? (
                        <HeartIcon
                            fill={'red'}
                            className="size-7!"
                            strokeWidth={1}
                            color="pink"
                        />
                    ) : (
                        <HeartIcon className="size-7!" />
                    )}
                </Button>
            </div>
        </div>
    )
}
