"use client";

import { ClerkProvider as OriginalClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { shadcn } from "@clerk/themes";
import { siteLogoUrl } from "@/data/siteDetails";

export function ClerkProvider({ children }: { children: ReactNode }) {
  return (
    // <Suspense>
    <OriginalClerkProvider
      appearance={{
        theme: shadcn,
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
        elements: {
          logoBox: "bg-accent flex m-auto rounded-md p-1",
        },
      }}
    >
      {children}
    </OriginalClerkProvider>
    // </Suspense>
  );
}
