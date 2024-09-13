"use client";
import React, { useState } from "react";
import { Sidebar, SidebarHeader } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import Link from "next/link";

export default function EmployeeDashboardSidebar({
  company,
}: {
  company: ICompany;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  const path = usePathname();

  return (
    <Sidebar
      open={open || hovered}
      onMouseEnter={(e) => setHovered(true)}
      onMouseLeave={(e) => setHovered(false)}
    >
      <SidebarHeader
        title={company.company_name}
        className={
          "flex flex-row gap-2 items-center justify-center rounded-md p-2 mb-4"
        }
      >
        <p
          className={cn(
            "flex-grow font-semibold line-clamp-1 text-ellipsis max-w-44 2xl:max-w-80",
            open || hovered ? "" : "hidden"
          )}
        >
          {company.company_name}
        </p>
        <Button
          onClick={(e) => setOpen(!open)}
          variant={"ghost"}
          size={"icon"}
          className="flex relative rounded-full"
        >
          <Icons.chevronLeft
            className={cn(
              "absolute transition-all",
              open ? "rotate-0 scale-100" : "rotate-180 scale-0"
            )}
          />
          <Icons.chevronRight
            className={cn(
              "transition-all",
              open ? "rotate-180 scale-0" : "rotate-0 scale-100"
            )}
          />
        </Button>
      </SidebarHeader>

      <Link
        href={`/dashboard/company/${company.company_id}/employee`}
        className="w-full"
        passHref
      >
        <Button
          onClick={(e) => setOpen(true)}
          variant="ghost"
          className={cn(
            "w-full gap-4 hover:underline",
            open || hovered ? "justify-start" : "justify-center",
            path === `/dashboard/company/${company.company_id}/employee`
              ? "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
              : ""
          )}
        >
          <Icons.home /> {open || hovered ? "Employee Dashboard" : ""}
        </Button>
      </Link>

      <div className="flex flex-col gap-4">
        <Link
          href={`/dashboard/company/${company.company_id}/employee/all`}
          className="w-full"
          passHref
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full gap-4 hover:underline",
              open || hovered ? "justify-start" : "justify-center",
              path === `/dashboard/company/${company.company_id}/employee/all`
                ? "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
                : ""
            )}
          >
            <Icons.employees /> {open || hovered ? "All Employees" : ""}
          </Button>
        </Link>

        <Link
          href={`/dashboard/company/${company.company_id}/employee/migrant`}
          className="w-full"
          passHref
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full gap-4 justify-start hover:underline",
              open || hovered ? "justify-start" : "justify-center",
              path ===
                `/dashboard/company/${company.company_id}/employee/migrant`
                ? "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
                : ""
            )}
          >
            <Icons.users /> {open || hovered ? "Migrant Employees" : ""}
          </Button>
        </Link>

        <Link
          href={`/dashboard/company/${company.company_id}/employee/change-of-circumstances`}
          className="w-full"
          passHref
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full gap-4 justify-start hover:underline",
              open || hovered ? "justify-start" : "justify-center",
              path ===
                `/dashboard/company/${company.company_id}/employee/change-of-circumstances`
                ? "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
                : ""
            )}
          >
            <Icons.files /> {open || hovered ? "Change of Circumstances" : ""}
          </Button>
        </Link>

        <Link
          href={`/dashboard/company/${company.company_id}/employee/contract-agreement`}
          className="w-full"
          passHref
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full gap-4 justify-start hover:underline",
              open || hovered ? "justify-start" : "justify-center",
              path ===
                `/dashboard/company/${company.company_id}/employee/contract-agreement`
                ? "bg-blue-500 hover:bg-blue-400 text-white hover:text-white"
                : ""
            )}
          >
            <Icons.handshake /> {open || hovered ? "Contract Agreement" : ""}
          </Button>
        </Link>
      </div>
    </Sidebar>
  );
}
