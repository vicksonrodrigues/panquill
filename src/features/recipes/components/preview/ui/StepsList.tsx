import { RecipeFormValues } from '@/features/recipes/validation'
import React from 'react'
import EmptyLines from './EmptyLines'
import { FullRecipeView } from '@/features/recipes/types'
import { Typography } from '@/components/shared/typography'
import { Check, Flame } from 'lucide-react'
import SaveProgressButton from './SaveProgressButton'
import { Button } from '@/components/ui/button'

type StepsListProps = {
    steps: FullRecipeView['steps']
    saveState: 'idle' | 'saving' | 'saved'
    doneSteps: Record<number, boolean>
    setDoneSteps: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
    handleSaveProgress: () => Promise<void>
}

export default function StepsList({
    steps,
    saveState,
    handleSaveProgress,
    doneSteps,
    setDoneSteps,
}: StepsListProps) {
    const doneCount = Object.values(doneSteps).filter(Boolean).length
    const progress = steps.length
        ? Math.round((doneCount / steps.length) * 100)
        : 0
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <Typography variant={'h3'} className="flex items-center gap-2">
                    <span className="bg-primary/5 text-primary flex size-7 items-center justify-center rounded-full">
                        <Flame className="size-4" />
                    </span>
                    Preparation
                </Typography>
                <div className="flex items-center gap-3">
                    <Typography
                        variant={'caption'}
                        as={'span'}
                        className="bg-muted text-muted-foreground rounded-full px-2.5 py-1"
                    >
                        {doneCount} / {steps.length} steps
                    </Typography>
                    <SaveProgressButton
                        saveState={saveState}
                        onSave={handleSaveProgress}
                    />
                </div>
            </div>
            <div className="bg-muted mb-8 h-1.5 w-full overflow-hidden rounded-full">
                <div
                    className={`bg-secondary h-full rounded-full transition-all`}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <ol className="flex flex-col">
                {steps.map((step, i) => {
                    const isDone = !!doneSteps[i]
                    const isLast = i === steps.length - 1
                    return (
                        <li key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <Button
                                    onClick={() =>
                                        setDoneSteps((prev) => ({
                                            ...prev,
                                            [i]: !prev[i],
                                        }))
                                    }
                                    className={`flex size-7 items-center justify-center rounded-full transition-all ${isDone ? 'border-secondary bg-secondary text-secondary-foreground' : 'border-primary/30 bg-primary/10 text-primary'}`}
                                >
                                    {isDone ? (
                                        <Check className="size-3.5" />
                                    ) : (
                                        i + 1
                                    )}
                                </Button>
                                {!isLast && (
                                    <div className="bg-border min-h-7 w-px flex-1" />
                                )}
                            </div>
                            <Typography
                                variant="body"
                                as="p"
                                className={`flex-1 pb-8 ${isDone ? 'text-muted-foreground line-through' : 'text-foreground'}`}
                            >
                                {step}
                            </Typography>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
/* return steps.filter((s) => s).length > 0 ? (
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
} */
