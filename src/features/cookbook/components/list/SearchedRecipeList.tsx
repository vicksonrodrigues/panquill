'use client'

import React from 'react'
import { CookbookRecipeCard } from '../../types'
import { dummyRecommended } from '@/data/dummyData'
import { RecipeCard } from '@/features/recipes'
import { Card, CardHeader } from '@/components/ui/card'

interface SearchRecipeListProps {
    recipes: CookbookRecipeCard[]
    isPending: boolean
    page: number
    pageSize: number
    totalCount: number
    hasMore: boolean
    onPageChange: (page: number) => void
}

export default function SearchedRecipeList() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dummyRecommended.map((recipe) => (
                    <Card key={recipe.id}>
                        <CardHeader>{recipe.title}</CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
