import { DataTable } from "@/components/ui/data-table";
import { IEmployee } from "@/schema/EmployeeSchema";
import React from "react";
import { columns } from "./columns";

// const exampleEmployees: IEmployee[] = Array.from<unknown, IEmployee>(
//   { length: 50 },
//   (_, index) => {
//     return {
//       employee_id: `emp-${100 + index + 1}`,
//       employee_name: `John Doe #${index + 1}`,
//       mobile: "123456",
//       email: "example@example.com",
//       passport_number: "ABCD123456",
//       address: "Example address",
//     };
//   }
// );

export default function EmployeesDataTable() {
  return <DataTable data={[]} columns={columns} />;
}
