'use client'
import CustomCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { dummyRecentlyViewed } from '@/data/dummyData'
import Image from 'next/image'

export interface RecentlyViewedRecipe {
    id: string
    url: string
    image: string
    title: string
    viewedAtLabel: string
}

export function LastViewed() {
    const recipes: RecentlyViewedRecipe[] = dummyRecentlyViewed

    return (
        <section className="relative container flex flex-col">
            <div className="mb-12 flex flex-col">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                    Continue Exploring
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Jump back into recipes you&apos;ve viewed or started — right
                    where you left off.
                </p>
            </div>
            <CustomCarousel
                data={recipes}
                getKey={(r) => r.id}
                getHref={(r) => r.url}
                basisClassName="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/6"
                renderImage={(r) => (
                    <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        className="object-cover object-center"
                    />
                )}
                renderBody={(r) => (
                    <div className="bg-muted flex h-full w-full flex-col gap-1.5 p-3">
                        <h3 className="text-foreground line-clamp-2 text-sm font-semibold tracking-tight">
                            {r.title}
                        </h3>
                        <span className="text-muted-foreground text-xs">
                            Viewed {r.viewedAtLabel}
                        </span>
                    </div>
                )}
            />
        </section>
    )
}
