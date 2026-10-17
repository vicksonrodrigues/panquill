import { RecipeCardBody } from '@/features/recipes/components/cards/RecipeCardBody'
import Image from 'next/image'
import { getTrendingRecipes } from '../db/queries'
import CustomCarousel from '@/components/shared/custom-carousel/CustomCarousel'
import { CarouselItem } from '@/components/ui/carousel'

export interface TrendingRecipe {
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
    rank: number
}
export async function Trending() {
    const trendingRecipes = await getTrendingRecipes()

    const recipes: TrendingRecipe[] = trendingRecipes.map((recipe, index) => {
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
            tags: (tags.length > 0 ? tags : recipe.recipeTags.slice(0, 1)).map(
                (rc) => rc.tag.label
            ),
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
            rank: index + 1,
        }
    })

    console.log(
        recipes.map((r) => ({
            id: r.id,
            cuisines: r.cuisines,
            tags: r.tags,
        }))
    )

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
                                <span className="bg-primary text-primary-foreground absolute bottom-2 left-2 flex size-7 items-center justify-center rounded-full text-xs font-extrabold">
                                    #{r.rank}
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
