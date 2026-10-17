import CustomCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { CarouselItem } from '@/components/ui/carousel'
import { RecipeCardBody } from '@/features/recipes/components/cards/RecipeCardBody'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { getRecommendationRecipes } from '../db/queries'

export interface RecommendedRecipe {
    id: string
    url: string
    image: string
    title: string
    description: string
    course: string
    cuisines: string[]
    tags: string[]
    totalMins: number
    viewCount: number
    saveCount: number
    author: { name: string; isAdminRecipe: boolean }
    reason: string
}

export async function Recommendation({ userId }: { userId: string }) {
    const recommendationRecipe = await getRecommendationRecipes(userId)

    const recipes: RecommendedRecipe[] = recommendationRecipe.map(
        (recipe, index) => {
            const cuisines = recipe.recipeCuisines.filter((rc) => rc.isPrimary)
            const tags = recipe.recipeTags.filter((rc) => rc.isPrimary)

            return {
                id: recipe.id,
                url: `/recipes/${recipe.id}`, // or a slug field
                image: recipe.imageUrl ?? '/placeholder-recipe.jpg',
                title: recipe.title,
                description: recipe.description,
                course: recipe.course.label,
                cuisines: (cuisines.length > 0
                    ? cuisines
                    : recipe.recipeCuisines.slice(0, 1)
                ).map((rc) => rc.cuisine.label),
                tags: (tags.length > 0
                    ? tags
                    : recipe.recipeTags.slice(0, 1)
                ).map((rc) => rc.tag.label),
                totalMins:
                    (recipe.prepTime ?? 0) +
                    (recipe.cookTime ?? 0) +
                    (recipe.passiveTime ?? 0),
                viewCount: recipe.viewCount ?? 0,
                saveCount: recipe._count.favouritesRecipes,
                author: {
                    name: `${recipe.author.firstName} ${recipe.author.lastName ?? ''}`.trim(),
                    isAdminRecipe: recipe.isAdminRecipe ?? false,
                },
                reason: recipe.reason,
            }
        }
    )

    if (recipes.length === 0) return null
    return (
        <section className="relative container flex flex-col">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                    Recommended For You
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Handpicked based on what you view and save — recipes we
                    think you&apos;ll love.
                </p>
            </div>
            <CustomCarousel>
                {recipes.map((r) => (
                    <CarouselItem
                        key={r.id}
                        className={`my-1 flex min-w-0 shrink-0 grow-0 basis-full pl-6 sm:basis-1/2 md:basis-1/2 lg:basis-1/4`}
                    >
                        <a
                            href={r.url}
                            className="group border-border bg-card hover:border-primary/45 flex h-full w-full flex-col overflow-hidden rounded-md border transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="bg-muted relative aspect-[4/3] w-full">
                                <Image
                                    src={r.image}
                                    alt={r.title}
                                    fill
                                    className="object-cover object-center"
                                />
                                <span className="border-primary/35 bg-background/80 text-primary absolute top-2 left-2 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10.5px] font-semibold backdrop-blur-sm">
                                    <Sparkles className="size-2.5" />
                                    {r.reason}
                                </span>
                            </div>
                            <RecipeCardBody {...r} />
                        </a>
                    </CarouselItem>
                ))}
            </CustomCarousel>
        </section>
    )
}
