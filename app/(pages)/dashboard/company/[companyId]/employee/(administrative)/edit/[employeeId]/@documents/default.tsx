"use server";

import ErrorFallbackCard from "@/components/custom/ErrorFallbackCard";
import React, { Suspense } from "react";
import { EditEmployeeByIdProps } from "../PageProps";
import { cookies } from "next/headers";
import { TPermission } from "@/schema/Permissions";
import AccessDenied from "@/components/custom/AccessDenied";
import { IUser } from "@/schema/UserSchema";
import { getContactInfo } from "@/app/(server)/actions/employee/getContactInfo";
import EmployeeDocumentEditDialog from "./(ui)/components/employee-document-edit-dialog";
import { FilePlus2 } from "lucide-react";
import { ButtonGradient } from "@/styles/button.tailwind";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/ui/data-table/data-table";
import { EmployeeDocumentDataTableColumns } from "./(ui)/feature/table/columns";
import getEmployeeDocuments from "@/app/(server)/actions/company/document/get-employee-documents.controller";
import DataTableSkeleton from "@/components/ui/data-table/data-table-skeleton";
import EmployeeDocumentsPage from "./(ui)/feature/employee-documents-page";
import { searchParamsCache, serialize } from "@/utils/searchParamsParsers";
import { SearchParams } from "nuqs";

type Props = EditEmployeeByIdProps & {
  searchParams: Promise<SearchParams>;
};

export default async function EmployeeDocumentsDefaultSlot({
  params,
  searchParams,
}: Props) {
  const [mCookies, sParams] = await Promise.all([cookies(), searchParams]);
  const mPermissions = JSON.parse(
    mCookies.get(process.env.NEXT_PUBLIC_COOKIE_USER_ACCESS_KEY!)?.value ??
      "[]",
  ) as TPermission[];

  const readAccess = mPermissions.find((item) => item === "cmp_emp_read");
  const writeAccess = mPermissions.find((item) => item === "cmp_emp_create");
  const updateAccess = mPermissions.find((item) => item === "cmp_emp_update");

  if (!readAccess) {
    return <AccessDenied />;
  }

  const user = JSON.parse(
    (await cookies()).get(process.env.COOKIE_USER_KEY!)?.value ?? "{}",
  ) as IUser;
  const { companyId, employeeId } = await params;

  const { data: contactInfo, error } = await getContactInfo(
    Number.parseInt(employeeId),
  );

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full w-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Contact Information</p>
          {/* <ContactInfoEditDialog data={contactInfo} employeeId={employeeId} /> */}
        </div>

        <ErrorFallbackCard error={error} />
      </div>
    );
  }

  searchParamsCache.parse(sParams);
  const key = serialize(sParams);

  return (
    <div className="flex flex-col gap-4 p-8 border rounded-md">
      <div className="col-span-full w-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">Documents</p>
        {updateAccess && (
          <EmployeeDocumentEditDialog
            className={cn(ButtonGradient, "[&_svg]:size-4")}
            employeeId={employeeId}
          >
            <FilePlus2 />
            Add Document
          </EmployeeDocumentEditDialog>
        )}
      </div>
      <div className="min-h-[90dvh] flex flex-col overflow-x-auto w-full">
        <Suspense key={key} fallback={<DataTableSkeleton />}>
          <EmployeeDocumentsPage
            updateAccess={!!updateAccess}
            employeeId={employeeId}
          />
        </Suspense>
      </div>
    </div>
  );
}
