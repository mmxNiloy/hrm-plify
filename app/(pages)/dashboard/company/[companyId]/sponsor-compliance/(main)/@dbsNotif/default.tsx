"use server";

import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { PassportNotificationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/PassportNotificationDataTableColumns";
import { DBSNotificationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/DBSNotificationDataTable";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import { getCompanyEmployeeDocuments } from "@/app/(server)/actions/getCompanyEmployeeDocuments";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function DBSNotificationsSlot({
  searchParams,
  params,
}: Props) {
  const sParams = await searchParams;
  const mParams = await params;
  const companyId = mParams.companyId;
  const { limit, page } = getPaginationParams(sParams, "dbss");
  const empDocs = await getCompanyEmployeeDocuments({
    companyId: Number.parseInt(companyId),
    page,
    limit,
    orderBy: "dbss",
  });

  if (empDocs.error) {
    return (
      <>
        <p id="visa" className="text-lg font-semibold">
          DBS Notifications
        </p>
        <ErrorFallbackCard error={empDocs.error} />
      </>
    );
  }

  return (
    <>
      <p id="dbs" className="text-lg font-semibold">
        DBS Notifications
      </p>
      <StaticDataTable
        columns={DBSNotificationDataTableColumns}
        data={empDocs.data.data}
        pageCount={empDocs.data.total_page}
        prefix="dbss"
      />
    </>
  );
}
