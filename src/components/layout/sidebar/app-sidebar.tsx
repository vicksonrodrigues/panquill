import * as React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import Link from 'next/link'

import { SignedIn, SignedOut } from '@/services/clerk/components/SignInStatus'
import { SignInButton } from '@/services/clerk/components/AuthButtons'
import { LogInIcon } from 'lucide-react'

export function AppSidebar({
    content,
    footerButton,
    siteName,
    siteLogo,
    ...props
}: {
    content: React.ReactNode
    footerButton: React.ReactNode
    siteName: string
    siteLogo: string
}) {
    return (
        <Sidebar
            collapsible="icon"
            className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
            {...props}
            variant="inset"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            className="transition-none hover:bg-transparent! hover:text-inherit! hover:opacity-100! hover:shadow-none!"
                            render={<Link href="/" />}
                        >
                            <div className="bg-accent flex aspect-square size-8 items-center justify-center rounded-lg p-0.5">
                                <Image
                                    src={siteLogo}
                                    alt="Site logo "
                                    width={1024}
                                    height={1024}
                                />
                            </div>
                            <span className="text-base font-semibold">
                                {siteName}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>{content}</SidebarContent>
            <SignedOut>
                <SidebarFooter>
                    <SignInButton>
                        <SidebarMenuButton>
                            <LogInIcon />
                            <span>Sign In</span>
                        </SidebarMenuButton>
                    </SignInButton>
                </SidebarFooter>
            </SignedOut>
            <SignedIn>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>{footerButton}</SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </SignedIn>
            <SidebarRail />
        </Sidebar>
    )
}
