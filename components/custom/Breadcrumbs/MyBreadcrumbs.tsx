import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ICompany } from "@/schema/CompanySchema";
import { IUser } from "@/schema/UserSchema";
import React from "react";

interface Props {
  company: ICompany;
  user: IUser;
  title?: string;
  parent?: string;
  grandParent?: string;
}

export default function MyBreadcrumbs({
  company,
  user,
  title,
  parent,
  grandParent,
}: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-wrap gap-1 sm:gap-2 text-sm sm:text-base">
        {(user.user_roles?.roles.role_name === "Super Admin" ||
          user.user_roles?.roles.role_name === "Admin") && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]"
                href="/dashboard"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block size-5" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]"
                href="/dashboard/company"
              >
                All Companies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbEllipsis className="md:hidden" />
            <BreadcrumbSeparator className="size-4 sm:size-5" />
          </>
        )}
        <BreadcrumbItem
          className={cn(
            "block",
            parent || grandParent ? "hidden md:block" : ""
          )}
        >
          <BreadcrumbLink
            className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]"
            href={`/dashboard/company/${company.company_id}`}
          >
            {company.company_name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {grandParent && (
          <>
            <BreadcrumbSeparator className="hidden md:block size-4 sm:size-5" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]"
                href=".."
              >
                {grandParent}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {parent && (
          <>
            <BreadcrumbSeparator className="hidden md:block size-5" />
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]"
                href="."
              >
                {parent}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {title && (
          <>
            <BreadcrumbSeparator className="size-4 sm:size-5" />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
