import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ILeaveBalance } from "@/schema/LeaveSchema";
import React from "react";

//! Deprecated
export default function LeaveBalanceCard({ data }: { data: ILeaveBalance[] }) {
  return (
    <div className="flex flex-col gap-1 border rounded-md py-4 px-6">
      {/* <Label className="text-lg font-semibold">Leave balance</Label>
      <Table className="mt-4">
        <TableCaption>Leave Balance</TableCaption>
        <TableHeader>
          <TableRow className="bg-blue-500 hover:bg-blue-400 *:text-white">
            <TableHead>Name</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Taken</TableHead>
            <TableHead>Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              className="even:bg-accent"
              key={`employee-${item.employee_id}-leave-balance`}
            >
              <TableCell>{item.employee_name}</TableCell>
              <TableCell>{item.designation}</TableCell>
              <TableCell>
                {item.leaves.map((leave, index) => {
                  return (
                    <React.Fragment
                      key={`employee-${item.employee_id}-leave-${leave.leave_type}`}
                    >
                      {index > 0 && <Separator />}
                      <p>{leave.leave_type}</p>
                    </React.Fragment>
                  );
                })}
              </TableCell>
              <TableCell>
                {item.leaves.map((leave, index) => {
                  return (
                    <React.Fragment
                      key={`employee-${item.employee_id}-leave-taken-${leave.leave_type}`}
                    >
                      {index > 0 && <Separator />}
                      <p>{leave.leave_taken}</p>
                    </React.Fragment>
                  );
                })}
              </TableCell>
              <TableCell>
                {item.leaves.map((leave, index) => {
                  return (
                    <React.Fragment
                      key={`employee-${item.employee_id}-leave-balance-${leave.leave_type}`}
                    >
                      {index > 0 && <Separator />}
                      <p>{leave.total - leave.leave_taken}</p>
                    </React.Fragment>
                  );
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      WIP
    </div>
  );
}
