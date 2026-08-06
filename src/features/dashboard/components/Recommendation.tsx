'use client'
import CustomCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { dummyRecommended } from '@/data/dummyData'
import { RecipeCardBody } from '@/features/recipes/components/cards/RecipeCardBody'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export interface RecommendedRecipe {
    id: string
    url: string
    image: string
    title: string
    description: string
    course: string
    cuisine: string
    tag: string
    totalMins: number
    viewCount: number
    saveCount: number
    author: { name: string; isAdminRecipe: boolean }
    reason: string
}

export function Recommendation() {
    const recipes: RecommendedRecipe[] = dummyRecommended

    if (recipes.length === 0) return null
    return (
        <section className="relative container flex flex-col">
            <div className="mb-12 flex flex-col">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                    Recommended For You
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Handpicked based on what you cook and save — recipes we
                    think you&apos;ll love.
                </p>
            </div>
            <CustomCarousel
                data={recipes}
                getKey={(r) => r.id}
                getHref={(r) => r.url}
                renderImage={(r) => (
                    <>
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
                    </>
                )}
                renderBody={(r) => <RecipeCardBody {...r} />}
            />
        </section>
    )
}
