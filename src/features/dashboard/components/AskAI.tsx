'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

const CASES = [
    {
        label: 'Ingredient swap',
        from: 'Butter',
        to: 'Olive oil',
        caption: 'No butter on hand? Done.',
    },
    {
        label: 'Equipment swap',
        from: 'Oven',
        to: 'Stovetop',
        caption: 'No oven? Recipe adapted.',
    },
    {
        label: 'Taste adjustment',
        from: 'Too sweet',
        to: 'Balanced',
        caption: 'Dial the sweetness down.',
    },
    {
        label: 'Ingredient swap',
        from: 'Heavy cream',
        to: 'Coconut milk',
        caption: 'Dairy-free, same texture.',
    },
]

export function AskAI() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(
            () => setIndex((i) => (i + 1) % CASES.length),
            2600
        )
        return () => clearInterval(id)
    }, [])

    const current = CASES[index]

    return (
        <div className="border-border border-l-primary bg-card relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-lg border border-l-4 p-9 md:flex-row">
            <div className="relative z-10 max-w-xl">
                <div className="text-primary mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
                    <Sparkles className="h-3.5 w-3.5" />
                    Panquill AI
                </div>
                <h2 className="text-card-foreground mb-2 text-2xl font-bold">
                    Missing an ingredient? Ask the AI.
                </h2>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    Tell the assistant what&apos;s in your kitchen and it
                    rewrites any recipe on the spot — swap ingredients, adjust
                    for the equipment you have, or make it lighter.
                </p>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition-colors">
                    Ask the AI
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>

            <div className="relative z-10 w-full flex-shrink-0 md:w-72">
                <div className="border-border bg-muted rounded-md border p-5">
                    <div className="text-muted-foreground mb-3 text-[11px] tracking-wide uppercase">
                        {current.label}
                    </div>
                    <div
                        key={index}
                        className="animate-in fade-in slide-in-from-bottom-1 flex h-10 items-center gap-3 duration-700 ease-in-out"
                    >
                        <div className="border-border bg-background text-foreground flex-1 rounded-md border py-2 text-center text-sm font-semibold">
                            {current.from}
                        </div>
                        <span className="text-primary">→</span>
                        <div className="border-primary/35 bg-accent text-accent-foreground flex-1 rounded-md border py-2 text-center text-sm font-semibold">
                            {current.to}
                        </div>
                    </div>
                    <div className="text-muted-foreground mt-3 min-h-[16px] text-xs">
                        {current.caption}
                    </div>
                </div>
            </div>
        </div>
    )
}
