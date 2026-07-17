import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export function SearchBar() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full items-center gap-2 max-w-6xl">
        <Input type="email" placeholder="Enter recipe name..." />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </div>
    </div>
  );
}
