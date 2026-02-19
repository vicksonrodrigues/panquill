import { RecipeListProps } from "@/types/recipeType";
import { ArrowRight, Eye, Heart, Timer } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function RecipeCard({ data }: { data: RecipeListProps }) {
  return (
    <a href={data.url} className="group flex flex-col justify-between">
      <div className="bg-muted relative overflow-hidden rounded-3xl p-2 flex flex-col h-full ">
        <Image
          src={data.image}
          alt={data.title}
          className="object-cover object-center  h-72 w-full rounded-2xl  "
          width={1000}
          height={1000}
        />
        <div className="p-4 flex h-full flex-col">
          <div className="mt-2 p-2 flex flex-col gap-2 justify-between h-full ">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                {data.title}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {data.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-muted-foreground  line-clamp-2 text-sm  md:text-base ">
                <span>
                  Preparation Time:{" "}
                  <Badge className="bg-violet-500 dark:bg-violet-200 gap-2">
                    {data.preparationTime}
                    <Timer />
                  </Badge>
                </span>
              </div>
              <div className=" flex items-center gap-2">
                <Badge className="bg-sky-400 dark:bg-sky-200 gap-2 ">
                  <Eye />
                  {data.viewCount}
                </Badge>
                <Badge className="bg-rose-400 dark:bg-rose-200 gap-2">
                  <Heart />
                  {data.saveCount}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            className="flex items-center text-sm  ml-auto mt-4 tracking-wide font-bold"
            asChild
          >
            <Link href={`/cookbook/recipe/${data.id}`}>
              View Recipe
              <ArrowRight className="ml-1 size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </a>
  );
}
