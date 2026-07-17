import { RecipeFormValues } from '@/features/recipes/validation'
import React from 'react'
import EmptyLines from './EmptyLines'

type StepsListProps = {
    steps: RecipeFormValues['steps']
}

export default function StepsList({ steps }: StepsListProps) {
    return steps.filter((s) => s.step).length > 0 ? (
        <ol className="space-y-2">
            {steps
                .filter((s) => s.step)
                .map((s, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="border-border bg-muted text-muted-foreground mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]">
                            {idx + 1}
                        </span>
                        <span className="leading-relaxed">{s.step}</span>
                    </li>
                ))}
        </ol>
    ) : (
        <EmptyLines count={2} label="No steps added" type="step" />
    )
}
