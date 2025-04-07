"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useCallback, useState } from "react";
import EducationDetailsFormFragment from "../../Form/Fragment/Employee/EducationDetailsFormFragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import { IEmployeeEducationalDetail } from "@/schema/EmployeeSchema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { upload } from "@/app/(server)/actions/upload";

export default function EducationalInfoEditDialog({
  employee_id,
  data,
  asIcon,
}: {
  employee_id: number;
  data?: IEmployeeEducationalDetail;
  asIcon?: boolean;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [certError, setCertError] = useState<Boolean>(false);
  const [transcriptError, setTranscriptError] = useState<Boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const fd = new FormData(e.currentTarget);
        const transcript = fd.get("transcript") as File | undefined;
        const certificate = fd.get("certificate") as File | undefined;

        setLoading(true);
        // Request api here

        var transcript_link = data?.transcript_link ?? "";
        var certificate_link = data?.certificate_link ?? "";

        const uploadTasks = [];
        if (transcript && transcript.size > 0 && !transcriptError)
          uploadTasks.push(upload(transcript));
        else {
          uploadTasks.push(
            new Promise<{
              data: {
                message: string;
                fileUrl: string;
              };
              error?: undefined;
            }>((resolve, reject) => {
              resolve({
                data: {
                  message: "Default Transcript",
                  fileUrl: transcript_link,
                },
              });
            })
          );
        }
        if (certificate && certificate.size > 0 && !certError)
          uploadTasks.push(upload(certificate));
        else {
          uploadTasks.push(
            new Promise<{
              data: {
                message: string;
                fileUrl: string;
              };
              error?: undefined;
            }>((resolve, reject) => {
              resolve({
                data: {
                  message: "Default Certificate",
                  fileUrl: certificate_link,
                },
              });
            })
          );
        }

        const [trnsc, cert] = await Promise.all(uploadTasks);
        if (trnsc.data) transcript_link = trnsc.data.fileUrl;
        else {
          toast({
            title: "Failed to upload",
            description: `Failed to upload the transcript file, please try again later. Max file size 1.5MB. Error encountered: ${trnsc.error.message}`,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        if (cert.data) certificate_link = cert.data.fileUrl;
        else {
          toast({
            title: "Failed to upload",
            description: `Failed to upload the certificate file, please try again later. Max file size 1.5MB. Error encountered: ${cert.error.message}`,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        const educationalDetails = {
          employee_id: Number.parseInt(`${employee_id}`),
          institution_name: fd.get("institution_name") as string,
          qualification: fd.get("qualification") as string,
          subject: fd.get("subject") as string | null,
          passing_year: fd.get("passing_year") as string | null,
          grade: fd.get("grade") as string | null,
          transcript_link,
          certificate_link,
        };

        const reqBod = data
          ? Object.assign(data, educationalDetails)
          : educationalDetails;

        try {
          const apiRes = await fetch(`/api/employee/educational-info`, {
            method: data ? "PATCH" : "POST",
            body: JSON.stringify(reqBod),
          });

          if (apiRes.ok) {
            // Close dialog, show toast, refresh parent ssc
            toast({
              title: "Update Successful",
              className: ToastSuccess,
            });
            // if (onSuccess) onSuccess(data.data.department_id);

            router.refresh();
            setOpen(false);
          } else {
            // show a failure dialog
            const res = await apiRes.json();

            toast({
              title: "Update Failed",
              description: JSON.stringify(res.message),
              variant: "destructive",
            });
          }
        } catch (err) {
          // console.error("Failed to update employee personal information.", err);
          toast({
            title: "Update Failed",
            variant: "destructive",
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Something went wrong!",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
    },
    [certError, data, employee_id, router, toast, transcriptError]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon" className="rounded-full">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonGradient}>
            <Icons.edit /> Add Educational Information
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Educational Information</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <EducationDetailsFormFragment
                {...{ data, setTranscriptError, setCertError }}
              />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className={ButtonSuccess}
              size="sm"
            >
              {loading ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}{" "}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
