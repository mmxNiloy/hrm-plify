"use client";
import { ICompanyDetails } from "@/schema/CompanySchema";
import React, { useMemo, useState } from "react";
import CompanyAddressTab from "@/app/Components/Company/CompanyDetailTabs/CompanyAddressTab";
import CompanyAuthorityTab from "@/app/Components/Company/CompanyDetailTabs/CompanyAuthorityTab";
import CompanyDocumentsTab from "@/app/Components/Company/CompanyDetailTabs/CompanyDocumentsTab";
import CompanyProfileTab from "@/app/Components/Company/CompanyDetailTabs/CompanyProfileTab";
import CompanyTradeTab from "@/app/Components/Company/CompanyDetailTabs/CompanyTradeTab";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}: {
  company: ICompanyDetails;
}) {
  const tabList: TabItem[] = useMemo(
    () => [
      {
        value: "profile",
        title: "Profile",
        content: <CompanyProfileTab data={company} />,
      },
      {
        value: "auth",
        title: "Authority",
        content: (
          <CompanyAuthorityTab
            company_id={company.company_id}
            data={company.company_authorised_details}
          />
        ),
      },
      {
        value: "key-contact",
        title: "Key Contact",
        content: (
          <CompanyAuthorityTab
            company_id={company.company_id}
            title="Key Contact"
            data={company.company_key_contact}
          />
        ),
      },
      {
        value: "l1-user",
        title: "Level 1 User",
        content: (
          <CompanyAuthorityTab
            company_id={company.company_id}
            title="Level 1 User"
            data={company.company_l1_user}
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
          />
        ),
      },
      {
        value: "documents",
        title: "Documents",
        content: (
          <CompanyDocumentsTab
            company_id={company.company_id}
            data={company.company_doc_db}
          />
        ),
      },
    ],
    [company]
  );

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  return (
    <Tabs
      defaultValue={tabList[currentTabIndex].value}
      value={tabList[currentTabIndex].value}
      onValueChange={(e) =>
        setCurrentTabIndex(tabList.findIndex((tab) => tab.value === e))
      }
    >
      <TabsList className="w-full bg-background border">
        {/* Tab navigation: Previous */}
        <Button
          disabled={currentTabIndex < 1}
          onClick={() => setCurrentTabIndex((idx) => idx - 1)}
          className="rounded-full h-full aspect-square"
          variant={"ghost"}
          size={"icon"}
        >
          <Icons.chevronLeft className="size-4" />
        </Button>

        {tabList.map((tab) => (
          <TabsTrigger
            className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-400"
            value={tab.value}
            key={tab.value}
          >
            {tab.title}
          </TabsTrigger>
        ))}

        {/* Tab navigation next */}
        <Button
          disabled={currentTabIndex > tabList.length - 2}
          onClick={() => setCurrentTabIndex((idx) => idx + 1)}
          className="rounded-full h-full aspect-square"
          variant={"ghost"}
          size={"icon"}
        >
          <Icons.chevronRight className="size-4" />
        </Button>
      </TabsList>

      {tabList.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
