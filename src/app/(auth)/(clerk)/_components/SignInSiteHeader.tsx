import { ModeToggle } from "@/components/dark-mode-toggle";
import Image from "next/image";
import React from "react";

export default function SignInSiteHeader({
  siteName,
  siteLogo,
  ...props
}: {
  siteName: string;
  siteLogo: string;
}) {
  return (
    <header
      className="bg-background sticky top-0 z-50 flex w-full h-16  items-center gap-2 border-b "
      {...props}
    >
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <div className="bg-accent flex aspect-square size-8 items-center justify-center rounded-lg p-0.5">
          <Image src={siteLogo} alt="Site logo " width={1024} height={1024} />
        </div>
        <span className="text-base font-semibold">{siteName}</span>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
