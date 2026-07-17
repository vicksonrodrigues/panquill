import { Typography } from '@/components/shared/typography'
import { RecipeFormValues } from '@/features/recipes/validation'
import React from 'react'
import EmptyLines from './EmptyLines'

type IngredientListProps = {
    ingredients: RecipeFormValues['ingredients']
}

export default function IngredientList({ ingredients }: IngredientListProps) {
    return ingredients.filter((i) => i.ingredient).length > 0 ? (
        <ul className="space-y-1.5">
            {ingredients
                .filter((i) => i.ingredient)
                .map((i, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-xs">
                        <span className="bg-muted-foreground/40 h-1.5 w-1.5 shrink-0 rounded-full" />
                        <Typography as={'span'} variant={'list'}>
                            {i.ingredient?.label} -
                        </Typography>
                        {i.quantity && (
                            <Typography as={'span'} variant={'small'}>
                                {i.quantity}
                            </Typography>
                        )}
                    </li>
                ))}
        </ul>
    ) : (
        <EmptyLines count={3} label="No ingredients added" type="ingredient" />
    )
}
