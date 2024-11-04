"use client";
import { ICompanyDetails } from "@/schema/CompanySchema";
import React, { useMemo, useState } from "react";
import CompanyAddressTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyAddressTab";
import CompanyAuthorityTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyAuthorityTab";
import CompanyDocumentsTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyDocumentsTab";
import CompanyProfileTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyProfileTab";
import CompanyTradeTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyTradeTab";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICompanyUser } from "@/schema/UserSchema";
import RTWEmployeeSelectionTab from "./RTWEmployeeSelectionTab";
import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import RTWCheckTypeTab from "./RTWCheckTypeTab";

type TabValue =
  | "employee"
  | "check-type"
  | "key-contact"
  | "l1-user"
  | "address"
  | "trade"
  | "documents";

interface TabItem {
  value: TabValue;
  title: string;
  content: React.JSX.Element;
}

interface Props {
  readOnly?: boolean;
  employees: IEmployeeWithUserMetadata[];
  currentTabIndex?: number;
}

export default function RTWEditTabs({
  readOnly,
  employees,
  currentTabIndex = 0,
}: Props) {
  const tabList: TabItem[] = useMemo(
    () => [
      {
        value: "employee",
        title: "Employee",
        content: <RTWEmployeeSelectionTab employees={employees} />,
      },
      {
        value: "check-type",
        title: "Check Type",
        content: <RTWCheckTypeTab />,
      },
    ],
    [employees]
  );

  // const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  return (
    <Tabs
      value={tabList[currentTabIndex].value}
      // onValueChange={(e) =>
      //   setCurrentTabIndex(tabList.findIndex((tab) => tab.value === e))
      // }
    >
      <TabsList className="w-full bg-background border">
        {/* Tab navigation: Previous */}
        {/* <Button
          disabled={currentTabIndex < 1}
          onClick={() => setCurrentTabIndex((idx) => idx - 1)}
          className="rounded-full h-full aspect-square"
          variant={"ghost"}
          size={"icon"}
        >
          <Icons.chevronLeft className="size-4" />
        </Button> */}

        {tabList.map((tab, tabIdx) => (
          <TabsTrigger
            disabled={currentTabIndex < tabIdx}
            className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-400"
            value={tab.value}
            key={tab.value}
          >
            {tab.title}
          </TabsTrigger>
        ))}

        {/* Tab navigation next */}
        {/* <Button
          disabled={currentTabIndex > tabList.length - 2}
          onClick={() => setCurrentTabIndex((idx) => idx + 1)}
          className="rounded-full h-full aspect-square"
          variant={"ghost"}
          size={"icon"}
        >
          <Icons.chevronRight className="size-4" />
        </Button> */}
      </TabsList>

      {tabList.map((tab) => (
        <TabsContent
          value={tab.value}
          key={tab.value}
          forceMount
          className="data-[state=inactive]:sr-only"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
