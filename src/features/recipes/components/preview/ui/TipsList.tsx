import { Typography } from '@/components/shared/typography'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FullRecipeView } from '@/features/recipes/types'
import { RecipeFormValues } from '@/features/recipes/validation'
import { Lightbulb } from 'lucide-react'
import React from 'react'

type TipsListProps = {
    tips: FullRecipeView['tips']
}

export default function TipsList({ tips }: TipsListProps) {
    return (
        <Card className="border-secondary/30 mt-4 border pt-0 pb-4 shadow-md">
            <CardHeader className="bg-secondary/6 border-b px-5 py-3">
                <Typography
                    variant={'h4'}
                    className="text-secondary flex items-center gap-2"
                >
                    <span className="bg-secondary/15 text-secondary flex size-6 items-center justify-center rounded-full">
                        <Lightbulb className="size-3.5" />
                    </span>
                    Tips &amp; tricks
                </Typography>
            </CardHeader>

            <CardContent>
                <ul className="space-y text-secondary list-inside list-disc">
                    {tips.map((tip, i) => (
                        <li key={i}>
                            <Typography
                                variant="bodySmall"
                                as="span"
                                className="text-foreground"
                            >
                                {tip}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
/* return tips.filter((t) => t.tip).length > 0 ? (
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
} */
