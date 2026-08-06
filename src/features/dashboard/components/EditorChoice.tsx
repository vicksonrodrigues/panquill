'use client'
import CustomeCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { dummyEditorsChoice } from '@/data/dummyData'
import { RecipeCardBody } from '@/features/recipes/components/cards/RecipeCardBody'
import Image from 'next/image'
import React from 'react'

export interface EditorsChoiceRecipe {
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
}

export function EditorChoice() {
    const recipes: EditorsChoiceRecipe[] = dummyEditorsChoice
    return (
        <section className="relative container flex flex-col">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                    Editor&apos;s Choice
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Curated by the Panquill team — recipes worth adding to your
                    rotation.
                </p>
            </div>
            <CustomeCarousel
                data={recipes}
                getKey={(r) => r.id}
                getHref={(r) => r.url}
                renderImage={(r) => (
                    <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        className="object-cover object-center"
                    />
                )}
                renderBody={(r) => <RecipeCardBody {...r} />}
            />
        </section>
    )
}
