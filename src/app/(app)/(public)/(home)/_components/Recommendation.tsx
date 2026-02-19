import CustomeCarousel from "@/components/customCarousel/CustomeCarousel";
import { trendingData } from "@/data/dummyData";
import React from "react";

export default function Recommendation() {
  return (
    <section className="relative flex flex-col container">
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
          Our Pick
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
