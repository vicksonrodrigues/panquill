import RecipeFullView from '@/features/recipes/components/preview/recipe-full-view'
import { getRecipeFromId } from '@/features/recipes/db/queries'
import { auth } from '@clerk/nextjs/server'

import React from 'react'

export default async function RecipePage({
    params,
}: {
    params: Promise<{ recipeId: string }>
}) {
    const { recipeId } = await params
    const { userId } = await auth()

    const fullRecipeData = await getRecipeFromId(recipeId, userId)
    return (
        <div className="@container/main">
            {fullRecipeData ? (
                <RecipeFullView fullRecipeData={fullRecipeData} />
            ) : (
                <p>404</p>
            )}
        </div>
    )
}
