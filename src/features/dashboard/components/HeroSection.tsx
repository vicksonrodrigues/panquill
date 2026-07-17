import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export function HeroSection() {
  return (
    <section className="relative flex flex-col gap-5  py-25 px-5 text-center w-full ">
      <span className="bg-transparent mx-auto flex size-16 items-center justify-center  md:size-25 p-2">
        <Image
          src={"/Logo/Panquill-LogoOnly.png"}
          alt="Panquill logo  "
          width={1024}
          height={1024}
        />
      </span>
      <h2 className="mx-auto max-w-5xl text-balance text-center text-3xl font-semibold md:text-6xl">
        Panquill
      </h2>
      <p className="text-muted-foreground mx-auto max-w-3xl text-center md:text-lg">
        Explore 1000+ recipes to inspire your next culinary creation.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
        <Button size="lg">
          <a href={"/cookbook"} className="font-semibold">
            Explore All Recipes
          </a>
        </Button>
        {/* {trustText && (
                <div className="text-muted-foreground text-xs">{trustText}</div>
              )} */}
      </div>
    </section>
  );
}
