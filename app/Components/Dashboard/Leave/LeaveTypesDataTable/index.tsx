import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { ILeaveType } from "@/schema/LeaveSchema";

const exampleLeaveTypes: ILeaveType[] = [
  {
    leave_type_id: 1,
    leave_type_name: "SICK LEAVE",
    leave_short_code: "SL",
    remarks: "LEAVE FOR MEDICAL URGENCY",
  },
  {
    leave_type_id: 2,
    leave_type_name: "Unauthorised Absence",
    leave_short_code: "U",
    remarks: "Unauthorised Absence",
  },
  {
    leave_type_id: 3,
    leave_type_name: "Paternity Leave",
    leave_short_code: "PT",
    remarks: "Paternity Leave",
  },
  {
    leave_type_id: 4,
    leave_type_name: "Holiday",
    leave_short_code: "H",
    remarks: "Holiday",
  },
  {
    leave_type_id: 5,
    leave_type_name: "Parental Leave",
    leave_short_code: "PL",
    remarks: "Parental Leave",
  },
  {
    leave_type_id: 6,
    leave_type_name: "Public Duties",
    leave_short_code: "P",
    remarks: "Public Duties",
  },
  {
    leave_type_id: 7,
    leave_type_name: "Maternity Leave",
    leave_short_code: "M",
    remarks: "Maternity Leave",
  },
  {
    leave_type_id: 8,
    leave_type_name: "Jury Service",
    leave_short_code: "J",
    remarks: "Jury Service",
  },
  {
    leave_type_id: 9,
    leave_type_name: "Bereavement Leave",
    leave_short_code: "B",
    remarks: "Bereavement Leave",
  },
  {
    leave_type_id: 10,
    leave_type_name: "Antenatal",
    leave_short_code: "AN",
    remarks: "Antenatal",
  },
];
export default function LeaveTypesDataTable() {
  return <DataTable columns={columns} data={exampleLeaveTypes} />;
}
