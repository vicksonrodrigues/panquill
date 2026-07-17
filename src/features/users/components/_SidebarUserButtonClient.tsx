"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { SignOutButton } from "@/services/clerk/components/AuthButtons";
import { useClerk } from "@clerk/nextjs";
import { BadgeCheck, ChevronsUpDown, LogOutIcon, UserIcon } from "lucide-react";

import { UserTable } from "../db/users";
import { Badge } from "@/components/ui/badge";

export function SidebarUserButtonClient({ user }: { user: UserTable }) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { openUserProfile } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-1"
          />
        }
      >
        <UserInfo {...user} />
        <ChevronsUpDown className="ml-auto group-data-[state=collapsed]:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={4}
        align="end"
        side={isMobile ? "bottom" : "right"}
        className="min-w-64 max-w-80"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal p-1">
            <UserInfo {...user} />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              openUserProfile();
              setOpenMobile(false);
            }}
          >
            <UserIcon className="mr-1" /> Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <SignOutButton>
          <DropdownMenuItem>
            <LogOutIcon className="mr-1" /> Log Out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserInfo({
  profileImageUrl,
  email,
  firstName,
  lastName,
  isAdmin,
}: UserTable) {
  const fullName = firstName.concat(" ", lastName ?? " ").trim();
  const nameInitials = fullName
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <Avatar className="rounded-lg size-8">
        <AvatarImage src={profileImageUrl ?? undefined} alt={fullName} />
        <AvatarFallback className="uppercase bg-primary text-primary-foreground">
          {nameInitials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1 min-w-0 leading-tight gap-1 group-data-[state=collapsed]:hidden">
        <div className="flex gap-2 items-center">
          <span className="truncate text-sm font-semibold">{fullName}</span>
          {isAdmin && (
            <Badge className="bg-blue-500 text-white h-4">
              Admin
              <BadgeCheck data-icon="inline-end" />
            </Badge>
          )}
        </div>

        <span className="truncate text-xs">{email}</span>
      </div>
    </div>
  );
}
