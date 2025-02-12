"use client";

import checkInToday from "@/app/(server)/actions/checkInToday";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { IAttendanceRecord } from "@/schema/AttendanceSchema";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface Props {
  attendanceResponse:
    | {
        error: Error;
        data?: undefined;
      }
    | {
        data: IAttendanceRecord;
        error?: undefined;
      };
}

export default function AttendanceAlert({ attendanceResponse }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(async () => {
    if (attendanceResponse.error) return;

    setLoading(true);

    // Do something
    const result = await checkInToday({
      company_id: attendanceResponse.data.company_id,
      employee_id: attendanceResponse.data.employee_id,
    });

    if (result.error) {
      toast({
        title: "Failed to update",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Update successful",
        className: ToastSuccess,
      });
    }

    router.refresh();

    setLoading(false);
  }, [attendanceResponse, router, toast]);

  if (attendanceResponse.error) {
    return (
      <div className="text-center bg-red-500 text-white py-1 px-4 flex items-center justify-around gap-2 rounded-md">
        <p className="flex items-center justify-center gap-2">
          <Icons.error /> <b>Alert:</b> Failed to get attendance data. Please
          try again later.
        </p>

        <Button
          size={"sm"}
          onClick={() => router.refresh()}
          className="h-7 bg-blue-600 hover:bg-blue-500"
        >
          <Icons.resend className="size-4" /> Refresh
        </Button>
      </div>
    );
  }

  if (attendanceResponse.data.is_present < 1) {
    return (
      <div className="text-center bg-yellow-500 text-white py-1 px-4 flex items-center justify-around gap-2 rounded-md">
        <p className="flex items-center justify-center gap-2">
          <Icons.warn /> <b>Alert:</b> Your attendance needs confirmation.
          Please review and confirm now.
        </p>

        {/* Confirmation button */}

        <Button
          onClick={handleSubmit}
          size={"sm"}
          disabled={loading || attendanceResponse.error}
          className="h-7 bg-green-500 hover:bg-green-400"
        >
          {loading ? (
            <Icons.spinner className="size-4 animate-spin" />
          ) : (
            <Icons.check className="size-4" />
          )}{" "}
          Confirm
        </Button>
      </div>
    );
  }

  return null;
}
