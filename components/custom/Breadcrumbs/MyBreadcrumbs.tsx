import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
      {/* Correct Breadcrumbsr */}
      <BreadcrumbList>
        {(user.user_roles?.roles.role_name === "Super Admin" ||
          user.user_roles?.roles.role_name === "Admin") && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href="/dashboard"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink
                className="line-clamp-1 text-ellipsis max-w-32"
                href="/dashboard/company"
              >
                All Companies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbLink
            className="line-clamp-1 text-ellipsis max-w-48"
            href={`/dashboard/company/${company.company_id}`}
          >
            {company.company_name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {grandParent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={`..`}>{grandParent}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {parent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={`.`}>{parent}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        {title && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
