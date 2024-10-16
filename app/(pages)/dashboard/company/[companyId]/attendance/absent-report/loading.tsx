import React from "react";
import { StaticDataTable } from "@/components/ui/data-table";
import { AttendanceReportDataTableColumns } from "@/components/custom/DataTable/Columns/Attendance/AttendanceReportDataTableColumns";
import { Button } from "@/components/ui/button";
import { ButtonWarn } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceReportLoadingPage() {
  return (
    <main className="container flex flex-col gap-2">
      <p className="text-xl font-semibold">Absent Report</p>
      <div className="flex items-center justify-between">
        <Skeleton className="w-3/5 h-5" />
        <Button className={ButtonWarn} disabled>
          <Icons.filter />
          Filter
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {/* <AttendanceReportGenerationTable
          employees={companyExtraData.employees}
          companyId={company.company_id}
        /> */}
      </div>

      <StaticDataTable
        data={[]}
        loading={true}
        columns={AttendanceReportDataTableColumns}
        // pageCount={paginatedAttendance.total_page}
      />
    </main>
  );
}
