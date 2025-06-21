import React from "react";
import TabList from "./components/tab-list";

export default function NotificationPageLayout({
  message,
  children,
}: {
  message: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="container flex flex-col gap-4 sm:gap-6 py-4 sm:py-6">
      {children}
      <TabList />
      {message}
    </main>
  );
}
