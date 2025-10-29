import { DataTable } from "@/components/ui/data-table/data-table";
import { IBankAccount } from "@/schema/form/bank.schema";
import React from "react";
import { columns } from "./columns";

type Props = {
  accounts: IBankAccount[];
};

export default function BankAccountsTable({ accounts }: Props) {
  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)]">
      <DataTable data={accounts} columns={columns} />
    </div>
  );
}
