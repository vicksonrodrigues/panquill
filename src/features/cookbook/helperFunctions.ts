/* eslint-disable @typescript-eslint/no-explicit-any */
import { CookbookRecipeCard } from './types'

export function splitTextSearch(input: string): string {
    return input
        .split(/\s+/)
        .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ''))
        .filter(Boolean)
        .join(' & ')
}

export function toCard(
    recipe: any,
    favouritedIds?: Set<string>
): CookbookRecipeCard {
    return {
        id: recipe.id,
        url: `/recipes/${recipe.id}`,
        image: recipe.imageUrl ?? '/placeholder-recipe.jpg',
        title: recipe.title,
        description: recipe.description,
        course: recipe.course.label,
        cuisines: recipe.recipeCuisines.map((c: any) => c.cuisine.label),
        tags: recipe.recipeTags.map((t: any) => t.tag.label),
        totalMins:
            (recipe.prepTime ?? 0) +
            (recipe.cookTime ?? 0) +
            (recipe.passiveTime ?? 0),
        viewCount: recipe.viewCount ?? 0,
        saveCount: recipe._count.favouritesRecipes,
        author: {
            name: recipe.author.name,
            isAdminRecipe: recipe.isAdminRecipe,
        },
        isFavourited: favouritedIds?.has(recipe.id) ?? false,
    }
}
