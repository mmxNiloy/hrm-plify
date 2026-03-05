import getEmployeeDocuments from "@/app/(server)/actions/company/document/get-employee-documents.controller";
import { DataTable } from "@/components/ui/data-table/data-table";
import { searchParamsCache } from "@/utils/searchParamsParsers";
import { EmployeeDocumentDataTableColumns } from "./table/columns";

export default async function EmployeeDocumentsPage({
  employeeId,
  updateAccess,
}: {
  employeeId: string;
  updateAccess?: boolean;
}) {
  const page = searchParamsCache.get("page") ?? 1;
  const limit = searchParamsCache.get("limit") ?? 10;
  const docRes = await getEmployeeDocuments({
    employeeId,
    page,
    limit,
  });

  let data = !docRes.error ? docRes.payload : [];

  return (
    <DataTable
      data={data.map((item) => ({
        ...item,
        updateAccess: !!updateAccess,
        employee_id: Number.parseInt(employeeId),
      }))}
      columns={EmployeeDocumentDataTableColumns}
    />
  );
}
