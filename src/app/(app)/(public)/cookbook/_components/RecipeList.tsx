import { recipeListData } from "@/data/dummyData";
import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipeListData?.map((item) => (
        <div key={item.id}>
          <RecipeCard data={item} />
        </div>
      ))}
    </div>
  );
}
