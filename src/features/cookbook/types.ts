export type CookbookSearchField = 'all' | 'course' | 'cuisine' | 'tag'

export type CookbookSort = 'popular' | 'newest' | 'quickest'

export interface CookbookRecipeCard {
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
    isFavourited: boolean
}

export interface FilterOption {
    id: string
    label: string
    value: string
}

export interface CookbookFilters {
    searchField: CookbookSearchField
    query: string
    courseId: string | null
    cuisineIds: string[]
    tagIds: string[]
    maxTotalMins: number | null
    minRating: number | null
    sort: CookbookSort
}

export const PAGE_SIZE = 24

export interface CookbookSearchResult {
    recipes: CookbookRecipeCard[]
    totalCount: number
    suggestions?: string[]
}
