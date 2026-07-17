import { recipeListData } from "@/data/dummyData";
import { RecipeCard } from "@/features/recipes";
import React from "react";

export function RecipeList() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipeListData?.map((item) => (
        <div key={item.id}>
          <RecipeCard data={item} favourite={false} />
        </div>
      ))}
    </div>
  );
}
