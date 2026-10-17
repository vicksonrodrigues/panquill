'use client'

import React, { useEffect, useRef, useState, useTransition } from 'react'
import CookbookSearch from './search/CookbookSearch'
import SearchedRecipeList from './list/SearchedRecipeList'
import {
    CookbookFilters,
    CookbookRecipeCard,
    CookbookSearchField,
    FilterOption,
} from '../types'
import { DEFAULT_FILTERS } from './CookbookView'
import { searchCookbookRecipesAction } from '../actions'

interface CookBookViewClientProps {
    initialRecipes: CookbookRecipeCard[]
    initialTotalCount: number
    courses: FilterOption[]
    cuisines: FilterOption[]
    tags: FilterOption[]
}

export default function CookbookViewClient({
    initialRecipes,
    initialTotalCount,
    courses,
    cuisines,
    tags,
}: CookBookViewClientProps) {
    const [filters, setFilters] = useState<CookbookFilters>(DEFAULT_FILTERS)
    const [page, setPage] = useState(1)
    const [recipes, setRecipes] = useState(initialRecipes)
    const [totalCount, setTotalCount] = useState(initialTotalCount)
    const [isPending, startTransition] = useTransition()
    const isFirstRender = useRef(true)

    function handleFilterChange(newFilters: CookbookFilters) {
        setFilters(newFilters)
        setPage(1)
    }

    function handleFieldChange(field: CookbookSearchField) {
        setFilters({
            ...filters,
            searchField: field,
            query: '',
            courseId: field === 'course' ? null : filters.courseId,
            cuisineIds: field === 'cuisine' ? [] : filters.cuisineIds,
            tagIds: field === 'tag' ? [] : filters.tagIds,
        })
    }

    function applySuggestion(text: string) {
        setFilters({ ...filters, query: text })
    }

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        const handle = setTimeout(() => {
            startTransition(async () => {
                const result = await searchCookbookRecipesAction(filters)
            })
        })
    })
    return (
        <div className="space-y-6">
            <CookbookSearch />
            <SearchedRecipeList />
        </div>
    )
}
