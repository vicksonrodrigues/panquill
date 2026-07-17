import CustomeCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { trendingData } from '@/data/dummyData'

export function Trending() {
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
            <CustomeCarousel data={trendingData} />
        </section>
    )
}
