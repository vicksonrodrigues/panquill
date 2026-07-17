import CustomeCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { trendingData } from '@/data/dummyData'
import React from 'react'

export function Recommendation() {
    return (
        <section className="relative container flex flex-col">
            <div className="mb-12 flex flex-col items-center text-center">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                    Our Pick
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Discover our handpicked collection of recipes, carefully
                    chosen to inspire your next delicious meal.
                </p>
            </div>
            <CustomeCarousel data={trendingData} />
        </section>
    )
}
