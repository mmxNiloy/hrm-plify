"use server";

import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { PassportNotificationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/PassportNotificationDataTableColumns";
import { EUSSNotificationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/EUSSNotificationDataTable";
import { getCompanyEmployeeDocuments } from "@/app/(server)/actions/getCompanyEmployeeDocuments";
import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function EUSSNotificationsSlot({
  searchParams,
  params,
}: Props) {
  const sParams = await searchParams;
  var companyId = (await params).companyId;
  companyId = Number.parseInt(`${companyId}`);
  const { limit, page } = getPaginationParams(sParams, "euss");
  const empDocs = await getCompanyEmployeeDocuments({
    companyId,
    page,
    limit,
    orderBy: "euss",
  });

  if (empDocs.error) {
    return (
      <>
        <p id="visa" className="text-lg font-semibold">
          EUSS Notifications
        </p>
        <ErrorFallbackCard error={empDocs.error} />
      </>
    );
  }

  return (
    <>
      <p id="euss" className="text-lg font-semibold">
        EUSS Notifications
      </p>
      <StaticDataTable
        columns={EUSSNotificationDataTableColumns}
        data={empDocs.data.data}
        pageCount={empDocs.data.total_page}
        prefix="euss"
      />
    </>
  );
}
