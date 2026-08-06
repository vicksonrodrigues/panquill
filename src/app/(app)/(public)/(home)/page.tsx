import {
    HeroSection,
    Trending,
    AskAI,
    LastViewed,
    EditorChoice,
    Recommendation,
} from '@/features/dashboard'

export default function Home() {
    return (
        <section className="relative">
            <div className="from-accent dark:from-secondary pointer-events-none absolute inset-x-0 top-0 h-[100vh] rounded-xl bg-radial-[circle_farthest-side_at_50%_20px] to-transparent" />
            <div className="@container/main relative z-10">
                <div className="flex flex-col items-center gap-20">
                    <HeroSection />
                    <AskAI />
                    <LastViewed />
                    <Recommendation />
                    <Trending />
                    <EditorChoice />
                </div>
            </div>
        </section>
    )
}
