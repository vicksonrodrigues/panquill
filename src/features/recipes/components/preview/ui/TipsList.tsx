import { RecipeFormValues } from '@/features/recipes/validation'
import React from 'react'

type TipsListProps = {
    tips: RecipeFormValues['tips']
}

export default function TipsList({ tips }: TipsListProps) {
    return tips.filter((t) => t.tip).length > 0 ? (
        <ul className="list-inside list-[circle] space-y-1.5">
            {tips
                .filter((t) => t.tip)
                .map((t, idx: number) => (
                    <li key={idx} className="text-muted-foreground text-sm">
                        {t.tip}
                    </li>
                ))}
        </ul>
    ) : (
        <p className="text-muted-foreground text-xs">No tips yet</p>
    )
}
