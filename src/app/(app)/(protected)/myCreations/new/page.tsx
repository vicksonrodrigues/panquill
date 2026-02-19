import React from "react";
import CreateNewRecipeCard from "@/features/recipes/components/CreateNewRecipeCard";

export default function NewRecipePage() {
  return (
    <section>
      <div className="@container/main">
        <div className="flex flex-col gap-10 py-15 px-4 ">
          <div className="mb-5 w-full space-y-8 flex ">
            <h2 className="text-foreground text-5xl font-bold tracking-tighter md:text-6xl">
              Create new recipe
            </h2>
          </div>

          <CreateNewRecipeCard />
        </div>
      </div>
    </section>
  );
}
