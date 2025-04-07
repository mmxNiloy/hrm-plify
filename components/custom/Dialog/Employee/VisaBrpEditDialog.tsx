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
import VisaBrpFormFragment from "../../Form/Fragment/Employee/VisaBrpFormFragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { IEmployeeVisaBrp } from "@/schema/EmployeeSchema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { upload } from "@/app/(server)/actions/upload";
import SiteConfig from "@/utils/SiteConfig";

export default function VisaBrpEditDialog({
  employee_id,
  data,
  asIcon,
}: {
  employee_id: number;
  data?: IEmployeeVisaBrp;
  asIcon?: boolean;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const fd = new FormData(e.currentTarget);
        const fImg = fd.get("visa_brp_photo_front_image") as File | undefined;
        const bImg = fd.get("visa_brp_photo_back_image") as File | undefined;

        setLoading(true);

        const { visa_brp_photo_front, visa_brp_photo_back } = data ?? {
          visa_brp_photo_front: "",
          visa_brp_photo_back: "",
        };

        const [fImgUpload, bImgUpload] = await Promise.all([
          fImg && fImg.size <= SiteConfig.maxFileSize
            ? upload(fImg)
            : new Promise<{
                data: {
                  message: string;
                  fileUrl: string;
                };
                error: undefined;
              }>((resolve, reject) => {
                resolve({
                  data: {
                    message: "Default Front Image Link",
                    fileUrl: visa_brp_photo_front ?? "",
                  },
                  error: undefined,
                });
              }),
          bImg && bImg.size <= SiteConfig.maxFileSize
            ? upload(bImg)
            : new Promise<{
                data: {
                  message: string;
                  fileUrl: string;
                };
                error?: Error;
              }>((resolve, reject) => {
                resolve({
                  data: {
                    message: "Default Back Image Link",
                    fileUrl: visa_brp_photo_back ?? "",
                  },
                  error: undefined,
                });
              }),
        ]);

        if (fImgUpload.error || bImgUpload.error) {
          toast({
            title: "Upload failed",
            description: `Failed to upload image. Error encountered: ${
              fImgUpload.error?.message ?? bImgUpload.error?.message
            }`,
            variant: "destructive",
          });

          setLoading(false);
          return;
        }

        const visaBrpDetails = {
          employee_id: Number.parseInt(`${employee_id}`),
          visa_brp_number: fd.get("visa_brp_number") as string,
          issue_date: fd.get("issue_date")
            ? new Date(fd.get("issue_date") as string)
            : null,
          expiry_date: fd.get("expiry_date")
            ? new Date(fd.get("expiry_date") as string)
            : null,
          issued_by: fd.get("issued_by") as string | null,
          country_of_residence: fd.get("country_of_residence") as string | null,
          nationality: fd.get("nationality") as string,
          visa_brp_photo_front: fImgUpload.data.fileUrl,
          visa_brp_photo_back: bImgUpload.data.fileUrl,
          remarks: fd.get("remarks") as string | null,
          iscurrent: fd.get("iscurrent") ? Number(fd.get("iscurrent")) : 0,
        };

        const reqBod = data
          ? Object.assign(data, visaBrpDetails)
          : visaBrpDetails;

        try {
          const apiRes = await fetch(`/api/employee/visa-brp-info`, {
            method: data ? "PATCH" : "POST",
            body: JSON.stringify(reqBod),
          });

          if (apiRes.ok) {
            toast({
              title: "Update Successful",
              className: ToastSuccess,
            });

            router.refresh();
            setOpen(false);
          } else {
            const res = await apiRes.json();
            toast({
              title: "Update Failed",
              description: JSON.stringify(res.message),
              variant: "destructive",
            });
          }
        } catch (err) {
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
    [data, employee_id, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon" className="rounded-full">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonWarn}>
            <Icons.edit /> Edit Visa/BRP Information
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
          <DialogTitle>Visa/BRP Information</DialogTitle>
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
              <VisaBrpFormFragment data={data} />
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
