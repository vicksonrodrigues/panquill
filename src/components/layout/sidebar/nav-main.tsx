'use client'

import { ChevronRight } from 'lucide-react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navigationData } from '@/data/siteDetails'
import { useUser } from '@clerk/nextjs'

export function NavMain() {
    const pathname = usePathname()
    const { isSignedIn } = useUser()
    return (
        <SidebarGroup>
            <SidebarMenu>
                {navigationData
                    .filter((item) => !item.private || isSignedIn)
                    .map((item) => (
                        <div key={item.title}>
                            {item.items ? (
                                <Collapsible
                                    key={item.title}
                                    defaultOpen={item.isActive}
                                    className="group/collapsible"
                                    render={<SidebarMenuItem />}
                                >
                                    <CollapsibleTrigger
                                        render={
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                isActive={
                                                    pathname === item.url ||
                                                    pathname.startsWith(
                                                        `${item.url}/`
                                                    )
                                                }
                                                className="mt-1"
                                            />
                                        }
                                    >
                                        <div className="flex w-full items-center gap-2">
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        size={'sm'}
                                                        isActive={
                                                            pathname ===
                                                                subItem.url ||
                                                            pathname.startsWith(
                                                                `${subItem.url}/`
                                                            )
                                                        }
                                                        className="mt-1 [&>svg]:text-current"
                                                        render={
                                                            <Link
                                                                href={
                                                                    subItem.url
                                                                }
                                                                className="flex w-full items-center gap-2"
                                                            >
                                                                {subItem.icon && (
                                                                    <subItem.icon />
                                                                )}
                                                                <span>
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        }
                                                    />
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <SidebarMenuButton
                                    key={item.title}
                                    tooltip={item.title}
                                    isActive={
                                        pathname === item.url ||
                                        pathname.startsWith(`${item.url}/`)
                                    }
                                    className="mt-1"
                                >
                                    <Link
                                        href={item.url}
                                        className="flex w-full items-center gap-2"
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            )}
                        </div>
                    ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
