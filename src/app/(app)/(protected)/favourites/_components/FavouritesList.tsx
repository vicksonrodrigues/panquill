import { recipeListData } from "@/data/dummyData";
import React from "react";
import FavouriteCard from "./FavouriteCard";
import PaginationWithLink from "@/components/PaginationWithLink";

export default function FavouritesList() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipeListData.map((item, count) => {
          if (count < 12)
            return (
              <div key={item.id}>
                <FavouriteCard data={item} />
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
