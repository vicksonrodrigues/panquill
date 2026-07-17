import { HeroSection, Recommendation, Trending } from "@/features/dashboard";

export default function Home() {
  return (
    <section className="relative">
      <div
        className="
        rounded-xl
          pointer-events-none
          absolute inset-x-0 top-0
          h-[100vh]
          bg-radial-[circle_farthest-side_at_50%_20px]
          from-accent dark:from-secondary
          to-transparent
        "
      />
      <div className="@container/main relative z-10">
        <div className="flex flex-col gap-20 items-center  ">
          <HeroSection />
          <Trending />
          <Recommendation />
        </div>
      </div>
    </section>
  );
}
