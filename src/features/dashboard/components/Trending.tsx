'use client'
import CustomeCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { dummyTrending } from '@/data/dummyData'
import { RecipeCardBody } from '@/features/recipes/components/cards/RecipeCardBody'
import Image from 'next/image'

export interface TrendingRecipe {
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
    rank: number
}
export function Trending() {
    const recipes: TrendingRecipe[] = dummyTrending
    return (
        <section className="relative container flex flex-col">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                    Trending - Hot Pick
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Looking for inspiration? Explore the recipes everyone is
                    cooking, saving, and sharing right now.
                </p>
            </div>
            <CustomeCarousel
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
                        <span className="bg-primary text-primary-foreground absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full text-xs font-extrabold">
                            #{r.rank}
                        </span>
                    </>
                )}
                renderBody={(r) => <RecipeCardBody {...r} />}
            />
        </section>
    )
}
