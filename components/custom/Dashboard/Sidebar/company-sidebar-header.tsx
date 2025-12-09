"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building, ChevronsUpDown } from "lucide-react";
import React from "react";

interface Props {
  companyId: string;
}

export default async function CompanySidebarHeader({ companyId }: Props) {
  const company = await getCompanyData(companyId);

  if (company.error)
    return (
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button
              disabled
              variant={"ghost"}
              size={"sm"}
              className="gap-1 text-destructive justify-start"
            >
              Error!
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    );
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size="sm"
                className="w-full h-14 gap-1 justify-start text-sm [&_svg]:size-4"
              >
                <AvatarPicker
                  readOnly
                  className="size-11 p-0.5"
                  placeholderIcon={<Building className="size-11" />}
                  src={company.data.logo}
                />
                <span>{company.data.company_name}</span>
                <span className="flex-1" />
                <ChevronsUpDown className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
