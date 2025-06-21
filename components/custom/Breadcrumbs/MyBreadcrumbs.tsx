"use server";
import { getCompanyData } from "@/app/(server)/actions/getCompanyData";
import getCurrentUser from "@/app/(server)/actions/user/get-current-user.controller";
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
import React from "react";

interface Props {
  companyId?: string;
  title: string;
  parent?: string;
  grandParent?: string;
}

export default async function MyBreadcrumbs({
  companyId,
  title,
  parent,
  grandParent,
}: Props) {
  if (!companyId) {
    return (
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap gap-1 text-xs">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]"
              href={parent ? "." : "/dashboard"}
            >
              {parent ?? "Dashboard"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const [user, companyData] = await Promise.all([
    getCurrentUser(),
    getCompanyData(companyId),
  ]);

  if (companyData.error)
    return (
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap gap-1 text-xs">
          {(user?.user_roles?.roles?.role_name === "Super Admin" ||
            user?.user_roles?.roles?.role_name === "Admin") && (
            <>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  className="line-clamp-1 text-ellipsis max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]"
                  href="/dashboard"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  className="line-clamp-1 text-ellipsis max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]"
                  href="/dashboard/company"
                >
                  All Companies
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbEllipsis className="md:hidden" />
              <BreadcrumbSeparator />
            </>
          )}
          {grandParent && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
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
              <BreadcrumbSeparator className="hidden md:block" />
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

  const company = companyData.data;
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex flex-wrap gap-1 text-xs">
        {(user?.user_roles?.roles?.role_name === "Super Admin" ||
          user?.user_roles?.roles?.role_name === "Admin") && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]"
                href="/dashboard"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem]"
                href="/dashboard/company"
              >
                All Companies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbEllipsis className="md:hidden" />
            <BreadcrumbSeparator />
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
            <BreadcrumbSeparator className="hidden md:block" />
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
            <BreadcrumbSeparator className="hidden md:block" />
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
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 text-ellipsis max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]">
            {title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
