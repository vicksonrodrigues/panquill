import { Metadata } from "next";
import React from "react";
import { recipeListData } from "@/data/dummyData";
import { RecipeCard } from "@/features/recipes";

export const metadata: Metadata = {
  title: "Favorites",
};

export default function FavoritesPage() {
  return (
    <section>
      <div className="@container/main">
        <div className="flex flex-col gap-10 py-15">
          <div className="mb-5 w-full space-y-8 pl-4 flex flex-col ">
            <h2 className="text-foreground text-5xl font-bold tracking-tighter md:text-6xl">
              Your Favourites
            </h2>
            <p className="text-muted-foreground text-lg tracking-tight md:text-xl">
              Here are all the recipes you have marked as favourites
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipeListData.map((item, count) => {
              if (count < 12)
                return (
                  <div key={item.id}>
                    <RecipeCard data={item} favourite={true} />
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
