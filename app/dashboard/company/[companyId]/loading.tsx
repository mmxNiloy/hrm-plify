import SiteLoading from "@/app/loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const tabList = [
  {
    value: "profile",
    title: "Profile",
  },
  {
    value: "auth",
    title: "Authority",
  },
  {
    value: "key-contact",
    title: "Key Contact",
  },
  {
    value: "l1-user",
    title: "Level 1 User",
  },
  {
    value: "departments",
    title: "Departments",
  },
  {
    value: "address",
    title: "Address",
  },
  {
    value: "trade",
    title: "Trade",
  },
  {
    value: "documents",
    title: "Documents",
  },
];
export default function CompanyDetailsLoading() {
  return <SiteLoading />;
  // Seamless design is not compatible in this update
  // return (
  //   <main className="container flex flex-col gap-2">
  //     <p className="text-xl font-semibold">Company Details</p>
  //     <div className="flex items-center justify-between">
  //       <Breadcrumb>
  //         <BreadcrumbList>
  //           <BreadcrumbItem>
  //             <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
  //           </BreadcrumbItem>
  //           <BreadcrumbSeparator />
  //           <BreadcrumbItem>
  //             <BreadcrumbLink href="/dashboard/company">
  //               Company Management
  //             </BreadcrumbLink>
  //           </BreadcrumbItem>
  //           <BreadcrumbSeparator />
  //           <BreadcrumbItem>
  //             <BreadcrumbPage className="truncate w-64">
  //               Company Name
  //             </BreadcrumbPage>
  //           </BreadcrumbItem>
  //         </BreadcrumbList>
  //       </Breadcrumb>

  //       {/* {user.user_roles.roles.role_name !== "Employee" && (
  //         <CompanyEditDialog data={company} />
  //       )} */}
  //     </div>

  //     <Tabs defaultValue={"profile"}>
  //       <TabsList className="w-full bg-background border">
  //         {/* Tab navigation: Previous */}
  //         <Button
  //           disabled
  //           className="rounded-full h-full aspect-square"
  //           variant={"ghost"}
  //           size={"icon"}
  //         >
  //           <Icons.chevronLeft className="size-4" />
  //         </Button>

  //         {tabList.map((tab) => (
  //           <TabsTrigger
  //             disabled
  //             className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-400"
  //             value={tab.value}
  //             key={tab.value}
  //           >
  //             {tab.title}
  //           </TabsTrigger>
  //         ))}

  //         {/* Tab navigation next */}
  //         <Button
  //           disabled
  //           className="rounded-full h-full aspect-square"
  //           variant={"ghost"}
  //           size={"icon"}
  //         >
  //           <Icons.chevronRight className="size-4" />
  //         </Button>
  //       </TabsList>
  //     </Tabs>
  //     <SiteLoading />
  //   </main>
  // );
}
