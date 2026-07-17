import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'
import { NavMain } from '@/components/layout/sidebar/nav-main'
import SiteHeader from '@/components/layout/siteHeader/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { siteLogoUrl, siteName } from '@/data/siteDetails'
import { SidebarUserButton } from '@/features/users/components/SidebarUserButton'
import React from 'react'

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="[--header-height:calc(--spacing(12))]">
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
                        <div className="flex flex-1 flex-col">{children}</div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}
