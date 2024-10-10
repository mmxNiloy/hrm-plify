"use client";
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./Sidebar";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(true);

  return (
    <Sidebar
      open={open || hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="overflow-auto"
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

        <Accordion
          type="multiple"
          defaultValue={["org"]}
          onValueChange={(e) => {
            if (e.length > 0) {
              setIsAccordionOpen(true);
            } else {
              setIsAccordionOpen(false);
            }
          }}
        >
          <AccordionItem value="org">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.building />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Organization
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
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

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/bank`}
              >
                <Icons.landmark />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Banking
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/tax`}
              >
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hr">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.hr />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Human Resources
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/employee`}
              >
                <Icons.employees />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Employee Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job`}
              >
                <Icons.briefcase />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Job & Recruitment
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/job`}
              >
                <Icons.userKey />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  User Access Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/leave`}
              >
                <Icons.leave />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Leave Management
                </span>
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ops">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.operations />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Operaitions
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/attendance`}
              >
                <Icons.usersCheck />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Attendance Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/rota`}
              >
                <Icons.cycle />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Rota
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/task`}
              >
                <Icons.todo />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Task Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/holiday`}
              >
                <Icons.clockStar />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Holiday Management
                </span>
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fin">
            <AccordionTrigger className="rounded-md px-2 data-[state=open]:bg-blue-500 data-[state=open]:text-white">
              <div className="flex gap-2 items-center">
                <Icons.statGraph />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Finance & Documents
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-1 px-2 group-data-[state=closed]/sidebar:hidden">
              <SidebarLink
                href={`/dashboard/company/${company.company_id}/payroll`}
              >
                <Icons.money />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Payroll Management
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/organogram`}
              >
                <Icons.chart />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Organogram Chart
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/sponsor-compliance`}
              >
                <Icons.pay />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Sponsor Compliance
                </span>
              </SidebarLink>

              <SidebarLink
                href={`/dashboard/company/${company.company_id}/document`}
              >
                <Icons.document />
                <span className="transition-all group-data-[state=closed]/sidebar:hidden">
                  Documents
                </span>
              </SidebarLink>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {isAccordionOpen && <span className="h-8"></span>}
      </SidebarContent>
    </Sidebar>
  );
}
