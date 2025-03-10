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
      <p className="text-xl font-semibold">Notifications</p>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink href=".">Dashboard</BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Notifications</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}
