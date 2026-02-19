import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { ModeToggle } from "../dark-mode-toggle";
import { SearchForm } from "./search-form";

export default function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full h-16  items-center gap-2 border-b ">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <div className="ml-auto flex items-center gap-2">
          <SearchForm className="w-full sm:ml-auto sm:w-auto" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
