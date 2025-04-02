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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TabValue =
  | "profile"
  | "auth"
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

export default function CompanyDetailTabs({
  company,
  readOnly,
}: {
  company: ICompanyDetails;
  readOnly?: boolean;
}) {
  const tabList: TabItem[] = useMemo(
    () => [
      {
        value: "profile",
        title: "Profile",
        content: <CompanyProfileTab readOnly={readOnly} data={company} />,
      },
      {
        value: "auth",
        title: "Authority",
        content: (
          <CompanyAuthorityTab
            id={company.company_authorised_details?.authorised_id}
            company_id={company.company_id}
            data={company}
            readOnly={readOnly}
          />
        ),
      },
      {
        value: "address",
        title: "Address",
        content: (
          <CompanyAddressTab
            company_id={company.company_id}
            data={company.company_address}
            readOnly={readOnly}
          />
        ),
      },
      {
        value: "trade",
        title: "Trade",
        content: (
          <CompanyTradeTab
            company_id={company.company_id}
            data={{
              company_trade_details: company.company_trade_details,
              company_trading_hour: company.company_trading_hour,
            }}
            readOnly={readOnly}
          />
        ),
      },
      {
        value: "documents",
        title: "Documents",
        content: (
          <CompanyDocumentsTab
            company_id={company.company_id}
            data={company.company_docs_db}
            readOnly={readOnly}
          />
        ),
      },
    ],
    [company, readOnly]
  );

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  return (
    <Tabs
      defaultValue={tabList[currentTabIndex].value}
      value={tabList[currentTabIndex].value}
      onValueChange={(e) =>
        setCurrentTabIndex(tabList.findIndex((tab) => tab.value === e))
      }
      className="w-full"
    >
      <div className="flex items-center gap-2 sm:gap-4 w-full">
        <Button
          disabled={currentTabIndex < 1}
          onClick={() => setCurrentTabIndex((idx) => idx - 1)}
          className="rounded-full h-8 sm:h-10 aspect-square flex-shrink-0"
          variant="ghost"
          size="icon"
        >
          <Icons.chevronLeft className="size-4 sm:size-5" />
        </Button>
        <TabsList className="flex-1 bg-background border md:border-none justify-start gap-1 sm:gap-2 p-1 sm:p-2 min-w-0 overflow-x-auto h-fit">
          {tabList.map((tab) => (
            <TabsTrigger
              className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 sm:flex-none rounded-none data-[state=active]:shadow-none data-[state=active]:md:border-b-2 data-[state=active]:border-t-2 data-[state=active]:border-indigo-400 whitespace-nowrap"
              value={tab.value}
              key={tab.value}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button
          disabled={currentTabIndex > tabList.length - 2}
          onClick={() => setCurrentTabIndex((idx) => idx + 1)}
          className="rounded-full h-8 sm:h-10 aspect-square flex-shrink-0"
          variant="ghost"
          size="icon"
        >
          <Icons.chevronRight className="size-4 sm:size-5" />
        </Button>
      </div>
      {tabList.map((tab) => (
        <TabsContent
          value={tab.value}
          key={tab.value}
          className="mt-4 sm:mt-6 text-sm sm:text-base"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
