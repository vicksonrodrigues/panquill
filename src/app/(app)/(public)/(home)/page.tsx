import {
    HeroSection,
    Trending,
    AskAI,
    LastViewed,
    EditorChoice,
    Recommendation,
} from '@/features/dashboard'
import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'

export default async function Home() {
    const { userId } = await auth()
    return (
        <section className="relative">
            <div className="from-accent dark:from-secondary pointer-events-none absolute inset-x-0 top-0 h-[100vh] rounded-xl bg-radial-[circle_farthest-side_at_50%_20px] to-transparent" />
            <div className="@container/main relative z-10">
                <div className="flex flex-col items-center gap-20 pb-5">
                    <HeroSection />
                    <AskAI />
                    {userId && <LastViewed userId={userId} />}
                    {userId && <Recommendation userId={userId} />}
                    <Suspense fallback="..Loading Trending">
                        <Trending />
                    </Suspense>
                    <EditorChoice />
                </div>
            </div>
        </section>
    )
}
