import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function NotificationPage() {
  return (
    <>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Notifications
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <Breadcrumb>
          <BreadcrumbList className="text-sm sm:text-base">
            <BreadcrumbLink href=".">Dashboard</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Notifications</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}
