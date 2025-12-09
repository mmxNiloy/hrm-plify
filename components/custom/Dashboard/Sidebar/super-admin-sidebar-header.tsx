"use server";
import getFavoriteCompanies from "@/app/(server)/actions/user/get-favorite-companies.controller";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building, ChevronsUpDown, Heart, Menu } from "lucide-react";
import React from "react";
import SuperAdminSidebarHeaderContent from "./super-admin-sidebar-header-content";

export default async function SuperAdminSidebarHeader() {
  //   Get favorite companies
  const favorites = await getFavoriteCompanies();
  const favs = favorites.payload ?? [];
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="gap-1 justify-start w-full [&_svg]:size-4 text-sm"
                variant={"ghost"}
                size="sm"
              >
                <Heart className="fill-red-500/80 stroke-red-400" />
                Favorites
                <span className="flex-1" />
                <ChevronsUpDown className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <SuperAdminSidebarHeaderContent companies={favs} />
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
