import React from "react";
import { SidebarTrigger } from "../../ui/sidebar";
import { ModeToggle } from "../../shared/dark-mode-toggle";
import { SearchForm } from "./search-form";
import { Separator } from "../../ui/separator";

export default function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full h-(--header-height)  items-center gap-2 border-b px-3">
      <SidebarTrigger size={"icon-lg"} />
      <div className="ml-auto flex items-center gap-2">
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        <ModeToggle />
      </div>
    </header>
  );
}
