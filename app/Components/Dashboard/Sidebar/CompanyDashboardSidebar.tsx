"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";

export default function CompanyDashboardSidebar({
  company,
  user,
}: {
  company: ICompany;
  user: IUser;
}) {
  const [open, setOpen] = useState<boolean>(true);
  const [hovered, setHovered] = useState<boolean>(false);
  const path = usePathname();

  return (
    <Sidebar
      open={open || hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SidebarContent>
        <SidebarHeader
          onClick={() => setOpen(!open)}
          title={company.company_name}
          className={
            "bg-accent space-y-0 cursor-pointer flex flex-row gap-2 items-center justify-center rounded-md mb-4"
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
          <span className="size-10 flex relative rounded-full items-center justify-center">
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
          </span>
        </SidebarHeader>

        <SidebarLink href={`/dashboard/company/${company.company_id}`}>
          <Icons.home />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Organization Profile
          </span>
        </SidebarLink>

        {(user.user_roles?.roles.role_name === "Super Admin" ||
          user.user_roles?.roles.role_name === "Admin") && (
          <SidebarLink
            href={`/dashboard/company/${company.company_id}/company-admin`}
          >
            <Icons.adminUser />
            <span className="transition-all group-data-[state=closed]/sidebar:hidden">
              Company Admin
            </span>
          </SidebarLink>
        )}

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/department`}
        >
          <Icons.department />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Department
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/designation`}
        >
          <Icons.idCard />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Designation
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/employee-type`}
        >
          <Icons.userCog />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Employee Type
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/pay-group`}
        >
          <Icons.employeeSalary />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Pay Group
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/annual-pay`}
        >
          <Icons.calendarMoney />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Annual Pay
          </span>
        </SidebarLink>

        <SidebarLink href={`/dashboard/company/${company.company_id}/bank`}>
          <Icons.landmark />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Banking
          </span>
        </SidebarLink>

        <SidebarLink href={`/dashboard/company/${company.company_id}/tax`}>
          <Icons.note />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Tax
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/payment-type`}
        >
          <Icons.money />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Payment Type
          </span>
        </SidebarLink>

        <SidebarLink
          href={`/dashboard/company/${company.company_id}/wage-pay-mode`}
        >
          <Icons.pay />
          <span className="transition-all group-data-[state=closed]/sidebar:hidden">
            Wages Pay Mode
          </span>
        </SidebarLink>
      </SidebarContent>
    </Sidebar>
  );
}
