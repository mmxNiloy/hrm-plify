"use client";

import checkInToday from "@/app/(server)/actions/checkInToday";
import didAttendToday from "@/app/(server)/actions/didAttendToday";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { IAttendanceRecord } from "@/schema/AttendanceSchema";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import {
  ButtonGradient,
  ButtonSuccess,
  ButtonWarn,
} from "@/styles/button.tailwind";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AttendanceCheckResponse =
  | {
      error: Error;
      data: undefined;
    }
  | {
      data: IAttendanceRecord;
      error: undefined;
    };

export default function AttendanceAlertCard() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [attendanceResponse, setAttendanceResponse] =
    useState<AttendanceCheckResponse>();

  const checkInFormSubmitButtonRef: React.Ref<HTMLButtonElement> | undefined =
    useRef(null);
  const checkOutFormSubmitButtonRef: React.Ref<HTMLButtonElement> | undefined =
    useRef(null);

  const getData = useCallback(async () => {
    setLoading(true);

    try {
      const result = await didAttendToday();
      setAttendanceResponse(result);
      console.log("Attendance Response", result);
    } catch (error) {
      toast({
        title: "Failed to get data.",
      });
    }

    setLoading(false);
  }, [toast]);

  // get initial data
  useEffect(() => {
    getData();
  }, [getData]);

  const handleCheckIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      if (!attendanceResponse) return;
      if (attendanceResponse.error) return;

      e.preventDefault();
      e.stopPropagation();

      // get check-in time here
      const fd = new FormData(e.currentTarget);
      const check_in_time = fd.get("check_in_time") as string;

      setLoading(true);

      // Do something
      const result = await checkInToday({
        company_id: attendanceResponse.data.company_id,
        employee_id: attendanceResponse.data.employee_id,
        check_in_time,
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

        setAttendanceResponse(result);
      }

      setLoading(false);
    },
    [attendanceResponse, toast]
  );

  const handleCheckOut = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      if (!attendanceResponse) return;
      if (attendanceResponse.error) return;

      e.preventDefault();
      e.stopPropagation();

      // get check-out time here
      const fd = new FormData(e.currentTarget);
      const check_out_time = fd.get("check_out_time") as string;
      const notes = fd.get("notes") as string | undefined;

      setLoading(true);

      // Do something
      const result = await checkInToday({
        company_id: attendanceResponse.data.company_id,
        employee_id: attendanceResponse.data.employee_id,
        check_out_time,
        notes,
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

        setAttendanceResponse(result);
      }

      router.refresh();

      setLoading(false);
    },
    [attendanceResponse, router, toast]
  );

  if (loading) {
    return (
      <Card className="flex flex-col gap-1 from-orange-50/50 to-fuchsia-200/75 bg-gradient-to-br">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            Today&apos;s Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-xl flex flex-col items-center justify-center gap-2 flex-1">
          <Icons.spinner className="size-24 animate-spin" />
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (!attendanceResponse || attendanceResponse.error) {
    return (
      <Card className="flex flex-col gap-1 from-pink-50/50 to-red-500/50 bg-gradient-to-br">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            Today&apos;s Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center flex flex-col items-center justify-around gap-2 flex-1">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Icons.error className="size-24 text-red-500" />
            <p className="text-lg">
              <b>Alert:</b> Failed to get attendance data. <br /> Please try
              again later.
            </p>
          </div>

          <Button
            onClick={() => router.refresh()}
            className="h-7 bg-blue-600 hover:bg-blue-500"
          >
            <Icons.resend className="size-4" /> Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (
    attendanceResponse.data.check_in_time &&
    attendanceResponse.data.check_out_time
  ) {
    return (
      <Card className="flex flex-col gap-1 from-emerald-50/50 to-green-200/80 bg-gradient-to-br">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            Attendance Confirmed
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 items-center justify-center">
          <DotLottieReact
            src="/anim/confirm_lottie.lottie"
            loop
            autoplay
            speed={0.75}
          />
          Confirmed
        </CardContent>
      </Card>
    );
  }

  // Default return: Show alert
  return (
    <Card className="flex flex-col gap-1 from-amber-300/50 pb-4 to-zinc-200 bg-gradient-to-br">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Today&apos;s Attendance{" "}
          {!attendanceResponse.data.check_in_time
            ? " - Check In"
            : " - Check Out"}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Icons.warn className="size-4" /> Your attendance needs confirmation.
          Please review and confirm now.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center py-1 px-4 flex items-center justify-center gap-2 flex-1">
        <form
          className={
            attendanceResponse.data.check_in_time
              ? "hidden"
              : "flex flex-col gap-4"
          }
          onSubmit={handleCheckIn}
        >
          <div className="flex flex-col gap-2">
            <Label className={RequiredAsterisk}>Check-In Time</Label>
            <Input type="time" name="check_in_time" required />
          </div>

          <Button
            className="hidden"
            type="submit"
            ref={checkInFormSubmitButtonRef}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" className={ButtonGradient}>
                Submit
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please confirm if the information you&apos;ve provided is
                  correct.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel type="button">No</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => checkInFormSubmitButtonRef.current?.click()}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
        <form
          className={
            !attendanceResponse.data.check_in_time
              ? "hidden"
              : "flex flex-col gap-4"
          }
          onSubmit={handleCheckOut}
        >
          <div className="flex flex-col gap-2">
            <Label className={RequiredAsterisk}>Check-Out Time</Label>

            <Input type="time" name="check_out_time" required />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Note</Label>
            <Textarea
              rows={5}
              name="notes"
              placeholder="Write a comment/note here..."
              className="resize-none"
            />
          </div>

          <Button
            className="hidden"
            type="submit"
            ref={checkOutFormSubmitButtonRef}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" className={ButtonSuccess}>
                Submit
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please confirm if the information you&apos;ve provided is
                  correct.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel type="button">No</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => checkOutFormSubmitButtonRef.current?.click()}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </CardContent>
    </Card>
  );
}
