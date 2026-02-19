import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { NavMain } from "@/components/sidebar/nav-main";
import SiteHeader from "@/components/siteHeader/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { siteLogoUrl, siteName } from "@/data/siteDetails";
import { SidebarUserButton } from "@/features/users/components/SidebarUserButton";
import React from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(16))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar
            siteName={siteName}
            siteLogo={siteLogoUrl}
            content={<NavMain />}
            footerButton={<SidebarUserButton />}
          />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 ">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
