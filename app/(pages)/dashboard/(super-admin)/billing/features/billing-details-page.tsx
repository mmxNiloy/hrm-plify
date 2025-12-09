"use server";
import getBilling from "@/app/(server)/actions/billing/get-billing.controller";
import { IBilling } from "@/schema/form/billing.schema";
import React from "react";
import BillingForm from "../components/billing-form";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { getCompanies } from "@/app/(server)/actions/company/get-companies.controller";
import { IBank } from "@/schema/form/bank.schema";
import getBanks from "@/app/(server)/actions/bank/get-banks.controller";

interface Props {
  billId: string;
  pageTitle: string;
}

export default async function BillingDetailsPage({ billId, pageTitle }: Props) {
  let bill: IBilling | undefined = undefined;
  if (billId !== "new") {
    const result = await getBilling(billId);
    if (!result.error) {
      bill = result.payload;
    }
  }

  const companySearch = searchParamsCache.get("companySearch");
  const bankSearch = searchParamsCache.get("bankSearch");
  const companySuggestions = await getCompanies({
    page: 1,
    limit: 5,
    search: companySearch,
    isActive: "1",
  });

  let banks: IBank[] = [];

  const bankData = await getBanks({
    page: 1,
    limit: 5,
    search: bankSearch,
  });

  if (!bankData.error) banks = bankData.payload;

  return (
    <BillingForm
      companies={companySuggestions.payload ?? []}
      data={bill}
      banks={banks}
    />
  );
}
