import CustomeCarousel from "@/components/customCarousel/CustomeCarousel";

import { trendingData } from "@/data/dummyData";

export default function Trending() {
  return (
    <section className="relative flex flex-col container">
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
          Treading - Hot Pick
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl text-lg">
          Lorem ipsum dolor sit amet consectetur adipiscing elidolor mattis sit
          phasellus mollis sit aliquam sit.
        </p>
      </div>
      <CustomeCarousel data={trendingData} />
    </section>
  );
}
