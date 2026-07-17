import { RecipeFormValues } from '@/features/recipes/validation'
import React from 'react'

type ToolsListProps = {
    tools: RecipeFormValues['tools']
}

export default function ToolsList({ tools }: ToolsListProps) {
    return tools?.length > 0 ? (
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
