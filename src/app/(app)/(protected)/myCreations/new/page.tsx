import { RecipeTabsContainer } from "@/features/recipes";
import React from "react";

export default function NewRecipePage() {
  return (
    <section>
      <div className="@container/main">
        <div className="flex flex-col gap-10 py-15 px-1 ">
          <div className="mb-5 w-full space-y-8 flex ">
            <h2 className="text-foreground text-5xl font-bold tracking-tighter md:text-6xl">
              Create new recipe
            </h2>
          </div>

          <RecipeTabsContainer />
        </div>
      </div>
    </section>
  );
}
