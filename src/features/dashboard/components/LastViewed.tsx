import CustomCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { CarouselItem } from '@/components/ui/carousel'

import Image from 'next/image'
import { getLastViewedRecipes } from '../db/queries'

export interface RecentlyViewedRecipe {
    id: string
    url: string
    image: string
    title: string
    viewedAtLabel: string
}

export async function LastViewed({ userId }: { userId: string }) {
    const recipes = await getLastViewedRecipes(userId)

    return (
        <section className="relative container flex flex-col">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                    Continue Exploring
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Jump back into recipes you&apos;ve viewed or started — right
                    where you left off.
                </p>
            </div>
            <CustomCarousel>
                {recipes.map((r) => (
                    <CarouselItem
                        key={r.id}
                        className={`my-1 flex min-w-0 shrink-0 grow-0 basis-1/2 pl-6 sm:basis-1/3 md:basis-1/4 xl:basis-1/6`}
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
                            </div>
                            <div className="bg-muted flex h-full w-full flex-col gap-1.5 p-3">
                                <h3 className="text-foreground line-clamp-2 text-sm font-semibold tracking-tight">
                                    {r.title}
                                </h3>
                                <span className="text-muted-foreground text-xs">
                                    Viewed {r.viewedAtLabel}
                                </span>
                            </div>
                        </a>
                    </CarouselItem>
                ))}
            </CustomCarousel>
        </section>
    )
}
