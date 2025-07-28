"use server";

import { getPaginationParams } from "@/utils/Misc";
import { ISearchParamsProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import { StaticDataTable } from "@/components/ui/data-table";
import { PassportNotificationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/PassportNotificationDataTableColumns";
import { EUSSNotificationDataTableColumns } from "@/components/custom/DataTable/Columns/Company/Employee/EUSSNotificationDataTable";

interface Props extends ISearchParamsProps, CompanyByIDPageProps {}

export default async function OtherDocumentNotificationsSlot({
  searchParams,
  params,
}: Props) {
  const sParams = await searchParams;
  const mParams = await params;
  const companyId = mParams.companyId;
  const { limit, page } = getPaginationParams(sParams, "euss");

  return (
    <>
      <p id="other" className="text-lg font-semibold">
        Other Document Notifications (WIP)
      </p>
      <StaticDataTable
        columns={EUSSNotificationDataTableColumns}
        data={[]}
        pageCount={1}
      />
    </>
  );
}
