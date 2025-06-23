"use client";

import React, { useMemo, useState } from "react";
import CompanyAddressTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyAddressTab";
import CompanyAuthorityTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyAuthorityTab";
import CompanyDocumentsTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyDocumentsTab";
import CompanyProfileTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyProfileTab";
import CompanyTradeTab from "@/components/custom/Tabs/CompanyDetailTabs/CompanyTradeTab";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CompanyDetailViewSelect from "../components/company-detail-view-select";

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

export default function CompanyDetailsContainer({
  companyId,
  readOnly,
}: {
  companyId: string;
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
            companyId={company.company_id}
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
  return (
    <div className="flex flex-col gap-4">
        <CompanyDetailViewSelect />

        {/* Contents go here */}
    </div>
  );
}
