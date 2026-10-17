import { CookbookView } from '@/features/cookbook'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Cookbook',
}

export default async function CookbookPage() {
    return (
        <section>
            <div className="@container">
                <div className="flex flex-col gap-10 py-15">
                    <div className="mb-5 flex w-full flex-col space-y-8 pl-4">
                        <h2 className="text-foreground text-5xl font-bold tracking-tighter md:text-6xl">
                            Cookbook
                        </h2>
                        <p className="text-muted-foreground text-lg tracking-tight md:text-xl">
                            Discover the 100+ recipes contributed by our amazing
                            community of writers. From quick weeknight dinners
                            to indulgent desserts, find recipes for every
                            occasion and skill level.
                        </p>
                    </div>

                    <CookbookView />
                </div>
            </div>
        </section>
    )
}
