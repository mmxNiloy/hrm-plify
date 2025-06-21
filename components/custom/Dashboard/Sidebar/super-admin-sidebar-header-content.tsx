"use client";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { IFavoriteCompany } from "@/schema/CompanySchema";
import { Building } from "lucide-react";
import React from "react";

export default function SuperAdminSidebarHeaderContent({
  companies,
}: {
  companies: IFavoriteCompany[];
}) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="min-w-64"
      align={isMobile ? undefined : "end"}
      side={isMobile ? undefined : "right"}
    >
      <DropdownMenuGroup>
        <DropdownMenuLabel>My Companies</DropdownMenuLabel>
        {companies.map((item) => (
          <DropdownMenuItem key={`${item.user_id}-${item.company_id}`}>
            <div className="flex gap-2">
              <AvatarPicker
                readOnly
                alt={item.companies?.company_name}
                src={item.companies?.logo}
                placeholderIcon={<Building className="size-5" />}
                className="size-5"
                variant="square"
              />
              <span>{item.companies?.company_name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
