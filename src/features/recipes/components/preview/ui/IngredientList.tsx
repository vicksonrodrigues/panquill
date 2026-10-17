import { Typography } from '@/components/shared/typography'
import { RecipeFormValues } from '@/features/recipes/validation'
import React from 'react'
import EmptyLines from './EmptyLines'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChefHat } from 'lucide-react'
import SaveProgressButton from './SaveProgressButton'
import { Checkbox } from '@/components/ui/checkbox'
import { FullRecipeView } from '@/features/recipes/types'

type IngredientListProps = {
    saveState: 'idle' | 'saving' | 'saved'
    handleSaveProgress: () => Promise<void>

    checkedIngredients: Record<string, boolean>
    setCheckedIngredients: React.Dispatch<
        React.SetStateAction<Record<string, boolean>>
    >
    ingredients: FullRecipeView['recipeIngredients']
}

export default function IngredientList({
    ingredients,
    saveState,
    handleSaveProgress,
    checkedIngredients,
    setCheckedIngredients,
}: IngredientListProps) {
    return (
        <Card className="gap-1 p-0 shadow-lg">
            <CardHeader className="bg-primary/5 flex items-center justify-between border-b p-0 px-5 py-2!">
                <Typography variant={'h4'} className="flex items-center gap-2">
                    <span className="flex size-6 items-center">
                        <ChefHat className="size-3.5" />
                    </span>
                    Ingredients
                </Typography>
                <SaveProgressButton
                    saveState={saveState}
                    onSave={handleSaveProgress}
                />
            </CardHeader>
            <CardContent className="p-5 pt-1">
                <ul className="border-border flex flex-col gap-1 divide-y">
                    {ingredients.map(({ quantity, ingredient }) => (
                        <li
                            key={ingredient?.id}
                            className="hover:bg-accent flex items-center gap-3 rounded-md px-1.5 py-2.5 transition-colors"
                        >
                            <Checkbox
                                checked={!!checkedIngredients[ingredient!.id]}
                                onCheckedChange={(val) =>
                                    setCheckedIngredients((prev) => ({
                                        ...prev,
                                        [ingredient!.id]: val === true,
                                    }))
                                }
                            />
                            <Typography
                                variant={'bodySmall'}
                                as="span"
                                className={`flex-1 ${checkedIngredients[ingredient!.id] ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                            >
                                {ingredient?.label}
                            </Typography>
                            <Typography
                                variant={'caption'}
                                as={'span'}
                                className="bg-primary/8 text-primary max-w-[45%] rounded px-1.5 py-0.5 text-right font-mono"
                            >
                                {quantity}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

/* ingredients.filter((i) => i.ingredient).length > 0 ? (
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
} */
