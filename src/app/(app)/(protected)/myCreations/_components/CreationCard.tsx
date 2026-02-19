import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecipeListProps } from "@/types/recipeType";
import { ArrowRight, Eye, Heart, HeartIcon, Timer } from "lucide-react";
import Image from "next/image";

export default function CreationCard({ data }: { data: RecipeListProps }) {
  return (
    <div className=" group bg-muted relative overflow-hidden rounded-3xl p-2 flex flex-col h-full ">
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

        <Button className="flex items-center text-sm ml-auto mt-4   tracking-wide font-semibold">
          View Recipe
          <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
