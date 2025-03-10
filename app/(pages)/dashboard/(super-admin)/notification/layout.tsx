"use client";
import { ContactDemoDataTableColumns } from "@/components/custom/DataTable/Columns/ContactDemoDataTableColumns";
import { DataTableSkeleton } from "@/components/ui/data-table";
import Icons from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense, useState } from "react";

type TabType = "message" | "demo";

export default function NotificationPageLayout({
  demo,
  message,
  children,
}: {
  demo: React.ReactNode;
  message: React.ReactNode;
  children: React.ReactNode;
}) {
  const [currentTab, setCurrentTab] = useState<TabType>("message");

  return (
    <main className="container flex flex-col gap-2">
      {children}
      <Tabs
        defaultValue="message"
        onValueChange={(val) => setCurrentTab(val as TabType)}
      >
        <TabsList className="w-full *:items-center *:justify-center *:gap-1 bg-transparent">
          <TabsTrigger
            value="message"
            className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-400"
          >
            <Icons.message /> Messages
          </TabsTrigger>
          <TabsTrigger
            value="demo"
            className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-400"
          >
            <Icons.handshake /> Demo Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="message"
          forceMount
          className={currentTab !== "message" ? "hidden" : ""}
        >
          <Suspense
            fallback={
              <DataTableSkeleton columns={ContactDemoDataTableColumns} />
            }
          >
            {message}
          </Suspense>
        </TabsContent>

        <TabsContent
          value="demo"
          className={currentTab !== "demo" ? "hidden" : ""}
        >
          <Suspense
            fallback={
              <DataTableSkeleton columns={ContactDemoDataTableColumns} />
            }
          >
            {demo}
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}
