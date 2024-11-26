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
            data={company.company_authorised_details}
            readOnly={readOnly}
          />
        ),
      },
      {
        value: "key-contact",
        title: "Key Contact",
        content: (
          <CompanyAuthorityTab
            id={company.company_key_contact?.key_contact_id}
            company_id={company.company_id}
            title="Key Contact"
            data={company.company_key_contact}
            readOnly={readOnly}
          />
        ),
      },
      {
        value: "l1-user",
        title: "Level 1 User",
        content: (
          <CompanyAuthorityTab
            id={company.company_l1_user?.l1_user_id}
            company_id={company.company_id}
            title="Level 1 User"
            data={company.company_l1_user}
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
