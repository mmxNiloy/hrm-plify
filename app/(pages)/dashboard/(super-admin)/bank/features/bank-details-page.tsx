"use server";

import getBank from "@/app/(server)/actions/bank/get-bank.controller";
import React from "react";
import BankForm from "../components/bank-form";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { getCompanies } from "@/app/(server)/actions/company/get-companies.controller";

interface Props {
  bankId: string;
  pageTitle: string;
}

export default async function BankDetailsPage({ bankId, pageTitle }: Props) {
  const companySearch = searchParamsCache.get("companySearch");

  const [bankData, companyData] = await Promise.all([
    getBank(bankId),
    getCompanies({
      page: 1,
      limit: 5,
      search: companySearch,
      isActive: "1",
    }),
  ]);

  const bank = bankData.payload;
  const companies = companyData.payload ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-lg font-semibold">{pageTitle}</h5>

      <BankForm data={bank} companies={companies} />
    </div>
  );
}
