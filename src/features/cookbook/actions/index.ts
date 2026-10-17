'use server'

import { auth } from '@clerk/nextjs/server'
import { searchCookbookRecipes } from '../db/queries'
import type { CookbookFilters } from '../types'

export async function searchCookbookRecipesAction(
    filters: CookbookFilters,
    page: number
) {
    const { userId } = await auth()
    return searchCookbookRecipes(filters, page, userId ?? undefined)
}
