"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, Heart, Timer } from "lucide-react";
import { Button } from "../ui/button";
import { CustomCarouselProps } from "@/types/customCarousel";
import { Badge } from "../ui/badge";

export default function CustomeCarousel({
  data,
}: {
  data: CustomCarouselProps[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <div className="w-full ">
      <Carousel setApi={setCarouselApi} className=" w-full max-w-full ">
        <CarouselContent className="hide-scrollbar w-full max-w-full ">
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              className=" min-w-0 shrink-0 grow-0 basis-full pl-6  sm:basis-1/2 md:basis-1/2 xl:basis-1/4 flex "
            >
              <a
                href={item.url}
                className="group flex flex-col justify-between"
              >
                <div className="bg-muted group flex h-full flex-col justify-between rounded-xl border p-2">
                  <div className="flex aspect-square items-center justify-center overflow-clip rounded-t-xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="object-cover object-center "
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <div className="p-4 flex h-full flex-col">
                    <div className="mt-2  flex flex-col gap-2 justify-between h-full  ">
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="text-muted-foreground  line-clamp-2 text-sm  md:text-base ">
                          <span>
                            Preparation Time:{" "}
                            <Badge className="bg-violet-500 dark:bg-violet-200 gap-2">
                              {item.preparationTime}
                              <Timer />
                            </Badge>
                          </span>
                        </div>
                        <div className=" flex items-center gap-2">
                          <Badge className="bg-sky-400 dark:bg-sky-200 gap-2 ">
                            <Eye />
                            {item.viewCount}
                          </Badge>
                          <Badge className="bg-rose-400 dark:bg-rose-200 gap-2">
                            <Heart />
                            {item.saveCount}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Button className="flex items-center text-sm  ml-auto mt-4 tracking-wide font-bold">
                      View Recipe
                      <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-8 flex flex-row items-center justify-between gap-4 md:flex-row">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            carouselApi?.scrollPrev();
          }}
          disabled={!canScrollPrev}
          className="disabled:pointer-events-auto"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            carouselApi?.scrollNext();
          }}
          disabled={!canScrollNext}
          className="disabled:pointer-events-auto"
        >
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}
