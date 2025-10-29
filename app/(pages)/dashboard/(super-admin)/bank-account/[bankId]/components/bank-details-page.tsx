"use server";

import getBank from "@/app/(server)/actions/bank/get-bank.controller";
import React from "react";
import { notFound } from "next/navigation";
import Icons from "@/components/ui/icons";
import BankDetailsCard from "./bank-details-card";
import BankAccountsTable from "../features/table/bank-accounts-table";

interface Props {
  bankId: string;
}

export default async function BankDetailsPage({ bankId }: Props) {
  const data = await getBank(bankId);

  if (data.error) {
    return notFound();
  }

  const bank = data.payload;

  return (
    <div className="flex flex-col gap-4 w-full">
      <BankDetailsCard bank={bank} />

      <BankAccountsTable accounts={bank.accounts} />
    </div>
  );
}
