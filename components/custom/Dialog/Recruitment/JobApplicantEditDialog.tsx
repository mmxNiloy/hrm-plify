"use client";

import { IJobApplicant, IJobListing } from "@/schema/JobSchema";
import React, { useCallback, useState } from "react";
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
import { ButtonGradient, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import JobListingFormFragment from "../../Form/Fragment/Recruitment/JobListingFormFragment";
import JobApplicantFormFragment from "../../Form/Fragment/Recruitment/JobApplicantFormFragment";
import { IUploadResponse, upload } from "@/app/(server)/actions/upload";
import { createJobApplication } from "@/app/(server)/actions/createJobApplication";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  data?: IJobApplicant;
  job: IJobListing;
  asIcon?: boolean;
  disabled?: boolean;
}

export default function JobApplicantEditDialog({
  data,
  job,
  asIcon,
  disabled,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rcError, setRCError] = useState<boolean>(false);
  const [clError, setCLError] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const fd = new FormData(e.currentTarget);

        const resume_cv_document = fd.get("resume_cv_document") as
          | File
          | undefined;
        const cover_letter_document = fd.get("cover_letter_document") as
          | File
          | undefined;

        setLoading(true);

        const [resumeCvDocUpload, coverLetterDocUpload] = await Promise.all([
          resume_cv_document && !rcError
            ? upload(resume_cv_document)
            : new Promise<IUploadResponse>((resolve, reject) => {
                resolve({
                  data: {
                    message: "Default CV/Resume doc link",
                    fileUrl: data?.cv_url ?? "",
                  },
                });
              }),
          cover_letter_document && !clError
            ? upload(cover_letter_document)
            : new Promise<IUploadResponse>((resolve, reject) => {
                resolve({
                  data: {
                    message: "Default cover letter doc link",
                    fileUrl: data?.cover_letter_url ?? "",
                  },
                });
              }),
        ]);

        const jobApp: IJobApplicant = {
          id: data?.id ?? 0,
          job_id: job.id,
          company_id: job.company_id,
          first_name: fd.get("first_name") as string,
          last_name: fd.get("last_name") as string,
          middle_name: fd.get("middle_name") as string,
          email: fd.get("email") as string,
          cv_url: resumeCvDocUpload.data?.fileUrl ?? data?.cv_url ?? "",
          cover_letter_url:
            coverLetterDocUpload.data?.fileUrl ?? data?.cover_letter_url ?? "",
          uni_key: "",
          last_date: new Date(job.lastDate),
        };

        // Create the job
        const result = await createJobApplication(jobApp);

        if (result.error) {
          toast({
            title: "Failed to apply for the job!",
            description: "Please try again later",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Application Submission Successful!",
            description:
              "We've received your application. We shall review your application and reach you as soon as possible. Thank you.",
            className: ToastSuccess,
          });

          setOpen(false);
          setLoading(false);
          router.refresh();
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
    [
      clError,
      data?.cover_letter_url,
      data?.cv_url,
      data?.id,
      job.company_id,
      job.id,
      job.lastDate,
      rcError,
      router,
      toast,
    ]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button
            disabled={disabled}
            variant={"ghost"}
            size="icon"
            title={disabled ? "You've already applied for this job." : "Update"}
          >
            <Icons.edit />
          </Button>
        ) : (
          <Button
            disabled={disabled}
            title={disabled ? "You've already applied for this job." : ""}
            className={ButtonSuccess}
          >
            <Icons.badgeCheck /> Apply
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className={DialogContentWidth}
      >
        <DialogHeader>
          <DialogTitle>
            {data ? "Edit Job Application" : "Apply for the Job"}
          </DialogTitle>
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
            <div className="grid grid-cols-1 p-4 gap-4">
              <JobApplicantFormFragment
                disabled={loading}
                data={data}
                onCoverLetterDocumentError={setCLError}
                onResumeCVDocumentError={setRCError}
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
              ) : data ? (
                <Icons.check />
              ) : (
                <Icons.badgeCheck />
              )}{" "}
              {data ? "Submit" : "Apply"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
