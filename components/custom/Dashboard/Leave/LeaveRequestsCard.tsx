"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useCallback, useEffect, useState } from "react";
import { ILeaveRequest } from "@/schema/LeaveSchema";
import { DataTable } from "@/components/ui/data-table/data-table";
import { LeaveRequestDataTableColumns } from "../../DataTable/Columns/Leave/LeaveRequestDataTableColumns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/styles/button.tailwind";
import Icons from "@/components/ui/icons";

export default function LeaveRequestsCard({
  leaveRequests = [],
}: {
  leaveRequests?: ILeaveRequest[];
}) {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Leave Requests
          <Link href={"leave"} passHref>
            <Button variant={"link"}>
              View All
              <Icons.chevronRight />
            </Button>
          </Link>
        </CardTitle>
        <CardDescription className="sr-only">
          View all leave requests in an organized fashion.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <DataTable
          showOptions={false}
          columns={LeaveRequestDataTableColumns}
          data={leaveRequests}
        />
      </CardContent>
    </Card>
  );
}
