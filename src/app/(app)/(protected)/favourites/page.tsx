import { Metadata } from "next";
import React from "react";
import FavouritesList from "./_components/FavouritesList";

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
          <FavouritesList />
        </div>
      </div>
    </section>
  );
}
