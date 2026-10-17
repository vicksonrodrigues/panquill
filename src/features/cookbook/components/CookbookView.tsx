import { auth } from '@clerk/nextjs/server'
import { getCookbookFilterOptions, searchCookbookRecipes } from '../db/queries'
import { CookbookFilters } from '../types'
import CookbookViewClient from './CookbookViewClient'

export const DEFAULT_FILTERS: CookbookFilters = {
    searchField: 'all',
    query: '',
    courseId: null,
    cuisineIds: [],
    tagIds: [],
    maxTotalMins: null,
    minRating: null,
    sort: 'popular',
}

export async function CookbookView() {
    const { userId } = await auth()

    const [initial, filterOptions] = await Promise.all([
        searchCookbookRecipes(DEFAULT_FILTERS, 1, userId ?? undefined),
        getCookbookFilterOptions(),
    ])

    console.log('Data', initial, filterOptions)
    return (
        <CookbookViewClient
            initialRecipes={initial.recipes}
            initialTotalCount={initial.totalCount}
            courses={filterOptions.courses}
            cuisines={filterOptions.cuisines}
            tags={filterOptions.tags}
        />
    )
}
