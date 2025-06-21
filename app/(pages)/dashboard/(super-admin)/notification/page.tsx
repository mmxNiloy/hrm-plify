import React from "react";
import MyBreadcrumbs from "@/components/custom/Breadcrumbs/MyBreadcrumbs";

export default function NotificationPage() {
  return (
    <>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        Notifications
      </p>
      <MyBreadcrumbs title="Notifications" />
    </>
  );
}
