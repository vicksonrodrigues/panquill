import PaginationWithLink from "@/components/PaginationWithLink";
import { recipeListData } from "@/data/dummyData";
import React from "react";
import CreationCard from "./CreationCard";

export default function CreationsList() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipeListData.map((item, count) => {
          if (count < 12)
            return (
              <div key={item.id}>
                <CreationCard data={item} />
              </div>
            );
        })}
      </div>
      <div className="flex ml-auto w-full">
        <PaginationWithLink />
      </div>
    </>
  );
}
