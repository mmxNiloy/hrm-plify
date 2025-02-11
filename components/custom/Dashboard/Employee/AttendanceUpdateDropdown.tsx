"use client";

import { updateAttendance } from "@/app/(server)/actions/updateAttendance";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IAttendanceReport } from "@/schema/AttendanceSchema";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

export default function AttendanceUpdateDropdown({
  data,
}: {
  data: IAttendanceReport;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const options = useMemo(
    () => [
      { value: 0, title: "Absent" },
      { value: 1, title: "Present" },
      { value: 2, title: "Day Off" },
      { value: 3, title: "Holiday" },
    ],
    []
  );
  const { toast } = useToast();
  const update = useCallback(
    async (isPresent: number) => {
      setLoading(true);

      const result = await updateAttendance({
        employee_id: data.employees.employee_id,
        company_id: data.employees.company_id,
        from_date: data.attendance_date,
        to_date: data.attendance_date,
        value: isPresent,
      });
      if (result.error) {
        toast({
          title: "Update Failed",
          variant: "destructive",
          description: result.error.message,
        });
      } else {
        router.refresh();
      }
      setLoading(false);
    },
    [data, router, toast]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          className="gap-1 w-fit rounded-full"
          disabled={loading}
          variant={"ghost"}
        >
          <p
            className={cn(
              "flex items-center justify-center rounded-full px-2 py-1 text-white",
              data.is_present == 0
                ? "bg-red-500"
                : data.is_present == 1
                ? "bg-green-500"
                : "bg-blue-500"
            )}
          >
            {data.is_present == 0
              ? "Absent"
              : data.is_present == 1
              ? "Present"
              : data.is_present == 2
              ? "Day Off"
              : "Holiday"}
            <Icons.chevronDown className="size-3" />
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((item) => (
          <DropdownMenuItem
            onClick={() => update(item.value)}
            key={`attendance-update-dropdown-item-${item.value}`}
          >
            <Icons.check
              className={cn(
                "size-4",
                data.is_present == item.value ? "opacity-100" : "opacity-0"
              )}
            />
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
