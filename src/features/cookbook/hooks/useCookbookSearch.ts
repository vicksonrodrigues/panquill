'use client'

import { useRef, useState, useTransition } from 'react'
import { CookbookFilters, CookbookRecipeCard } from '../types'
import { DEFAULT_FILTERS } from '../components/CookbookView'

interface UseCookbookSearchProps {
    initialRecipes: CookbookRecipeCard[]
    initialTotalCount: number
}
export function useCookbookSearch({
    initialRecipes,
    initialTotalCount,
}: UseCookbookSearchProps) {
    const [filters, setFilter] = useState<CookbookFilters>(DEFAULT_FILTERS)
    const [page, setPage] = useState(1)
    const [recipes, setRecipes] = useState(initialRecipes)
    const [totalCount, setTotalCount] = useState(initialTotalCount)
    const [isPending, startTransition] = useTransition()
    const isFirstRender = useRef(true)
}
