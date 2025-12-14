"use server";

import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { DataTable } from "@/components/ui/data-table/data-table";
import { VisaNotificationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/VisaNotificationDataTableColumns";
import { getCompanyEmployeeDocuments } from "@/app/(server)/actions/getCompanyEmployeeDocuments";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function VisaNotificationsSlot({
  searchParams,
  params,
}: Props) {
  const sParams = await searchParams;
  const mParams = await params;
  const companyId = mParams.companyId;
  const { limit, page } = getPaginationParams(sParams, "visa");
  const empDocs = await getCompanyEmployeeDocuments({
    companyId: Number.parseInt(companyId),
    page,
    limit,
  });

  if (empDocs.error) {
    return (
      <>
        <p id="visa" className="text-lg font-semibold">
          Visa Notifications
        </p>
        <ErrorFallbackCard error={empDocs.error} />
      </>
    );
  }

  return (
    <div className="flex flex-col h-96">
      <p id="visa" className="text-lg font-semibold">
        Visa Notifications
      </p>
      <DataTable
        columns={VisaNotificationDataTableColumns}
        data={empDocs.data.data}
        pageCount={empDocs.data.total_page}
        totalItems={empDocs.data.data_count}
      />
    </div>
  );
}
