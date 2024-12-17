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
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { ButtonBase, ButtonSuccess } from "@/styles/button.tailwind";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { withError } from "@/utils/Debug";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function ShortlistingAlertDialog({
  applicationId,
  jobId,
}: {
  applicationId: number;
  jobId: number;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = useCallback(async () => {
    setLoading(true);

    const req = fetch("/api/recruitment/shortlist", {
      method: "POST",
      body: JSON.stringify({
        job_id: jobId,
        applicant_id: applicationId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data, error } = await withError<{
      status: boolean;
      data: string;
    }>(req);

    if (error) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Update Successful",
        className: ToastSuccess,
      });

      router.refresh();
      setOpen(false);
    }

    setLoading(false);
  }, [applicationId, jobId, router, toast]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} className={ButtonSuccess}>
          <Icons.check />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to shortlist this applicant?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Make sure you&apos;ve reviewed the application thoroughly. Check if
            the attached document(s) is valid before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              disabled={loading}
              className="gap-2 rounded-full bg-red-500 hover:bg-red-600 hover:text-white"
            >
              <Icons.cross /> No
            </Button>
          </AlertDialogCancel>

          <Button
            disabled={loading}
            onClick={onSubmit}
            className={ButtonSuccess}
          >
            {loading ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              <Icons.check />
            )}{" "}
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
