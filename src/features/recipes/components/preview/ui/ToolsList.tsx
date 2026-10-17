import { Typography } from '@/components/shared/typography'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FullRecipeView } from '@/features/recipes/types'
import { RecipeFormValues } from '@/features/recipes/validation'
import React from 'react'
import SaveProgressButton from './SaveProgressButton'
import { CookingPot } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

type ToolsListProps = {
    tools: FullRecipeView['recipeTools']
    saveState: 'idle' | 'saving' | 'saved'
    checkedTools: Record<string, boolean>
    setCheckedTools: React.Dispatch<
        React.SetStateAction<Record<string, boolean>>
    >
    handleSaveProgress: () => Promise<void>
}

export default function ToolsList({
    tools,
    saveState,
    handleSaveProgress,
    checkedTools,
    setCheckedTools,
}: ToolsListProps) {
    return (
        <Card className="gap-1 p-0 shadow-lg">
            <CardHeader className="bg-secondary/5 border-border flex items-center justify-between border-b px-5 py-2!">
                <Typography variant={'h4'} className="flex items-center gap-2">
                    <span className="flex size-6 items-center">
                        <CookingPot className="size-3.5" />
                    </span>
                    Tools &amp; equipment
                </Typography>
                <SaveProgressButton
                    saveState={saveState}
                    onSave={handleSaveProgress}
                />
            </CardHeader>
            <CardContent className="p-5 pt-1">
                <ul className="border-border flex flex-col gap-1 divide-y">
                    {tools.map(({ tool }) => (
                        <li
                            key={tool.id}
                            className="hover:bg-accent flex items-center gap-3 rounded-md px-1.5 py-2.5 transition-colors"
                        >
                            <Checkbox
                                checked={!!checkedTools[tool.id]}
                                onCheckedChange={(val) =>
                                    setCheckedTools((prev) => ({
                                        ...prev,
                                        [tool.id]: val === true,
                                    }))
                                }
                            />
                            <Typography
                                variant={'bodySmall'}
                                as="span"
                                className={`flex-1 ${checkedTools[tool.id] ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                            >
                                {tool.label}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
/* return tools?.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
            {tools.map((t: any, idx: number) => (
                <span
                    key={idx}
                    className="bg-muted text-muted-foreground border-border rounded-full border px-2.5 py-1 text-xs"
                >
                    {t.label}
                </span>
            ))}
        </div>
    ) : (
        <p className="text-muted-foreground text-xs">No tools listed</p>
    )
}
 */
