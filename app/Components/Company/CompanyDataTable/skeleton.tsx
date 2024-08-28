import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { column_skeletons } from "./columns";
import { ICompany } from "@/schema/CompanySchema";

const data = Array.from({ length: 10 }, (_, index): ICompany => {
  return {
    company_id: 0,
    company_name: "",
    contact_number: "",
    created_at: "",
    founded_year: 0,
    headquarters: "",
    industry: "",
    is_active: 0,
    logo: "",
    website: "",
    updated_at: "",
  };
});

export default function CompanyDataTableSkeleton() {
  return <DataTable columns={column_skeletons} data={data} />;
}
