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
import { useToast } from "@/components/ui/use-toast";
import { IEmployeeWithPersonalInfo } from "@/schema/EmployeeSchema";
import { ButtonSuccess, ButtonWarn } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import EmployeeDetailsFormFragment from "../../Form/Fragment/Employee/EmployeeDetailsFormFragment";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { IUploadResult, upload } from "@/app/(server)/actions/upload";
import SiteConfig from "@/utils/SiteConfig";
import uploadFile from "@/utils/uploadFile";
import createChangeOfCircumstances from "@/app/(server)/actions/change-of-circumstances/create-change-of-circumstances.controller";

export default function EmployeeDetailsEditDialog({
  data,
}: {
  data: IEmployeeWithPersonalInfo;
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
        const profile_pic = fd.get("profile_pic") as File | undefined;

        const employeeData = {
          first_name: fd.get("first_name") as string,
          middle_name: fd.get("middle_name") as string,
          last_name: fd.get("last_name") as string,
          date_of_birth: fd.get("date_of_birth") as string, // you can convert to Date if needed
          gender: fd.get("gender") as string,
          // ni_num: fd.get("ni_num") as string,
          nationality: fd.get("nationality") as string,
          marital_status: fd.get("marital_status") as string,
          email: fd.get("email") as string,
          contact_number: fd.get("contact_number") as string,
          alternative_number: fd.get("alternative_number") as string,
          is_foreign: Boolean(fd.get("is_foreign") as string),
        };

        // Get all default data
        const oldData = {
          first_name: data.users.first_name ?? "",
          image: data.image ?? "",
          middle_name: data.users.middle_name ?? "",
          last_name: data.users.last_name ?? "",
          date_of_birth: data.date_of_birth ?? "",
          gender: data.gender ?? "",
          // ni_num: data.ni_num ?? "",
          nationality: data.nationality ?? "",
          marital_status: data.marital_status ?? "",
          email: data.users.email ?? "",
          contact_number: data.contact_number ?? "",
          alternative_number: data.alternative_number ?? "",
          is_foreign: data.is_foreign ?? false,
        };

        setLoading(true);
        // Request api here

        // If an image is selected, upload the image and set the new image source
        var image = data?.image ?? "";

        if (
          profile_pic &&
          profile_pic.size > 0 &&
          profile_pic.size <= SiteConfig.maxFileSize
        ) {
          // Upload the logo
          const profilePicUpload = await uploadFile(profile_pic);
          if (!profilePicUpload.ok) {
            toast({
              title: "Upload Failed",
              description: `Failed to upload the logo. Cause: ${profilePicUpload.error.message}`,
              variant: "destructive",
            });
          } else {
            const res = profilePicUpload.data;
            image = res.fileUrl;
          }
        }

        const newEmp = Object.assign(employeeData, { image });
        const reqBod = Object.assign(data, newEmp);
        try {
          const [apiRes, coc] = await Promise.allSettled([
            fetch(`/api/employee/update-personal-info/${data.employee_id}`, {
              method: "PATCH",
              body: JSON.stringify(reqBod),
            }),
            createChangeOfCircumstances({
              employee_id: data.employee_id,
              oldValue: oldData,
              newValue: newEmp,
            }),
          ]);

          console.debug("Change of circumstances data", {
            coc,
            oldData,
            newEmp,
          });

          if (coc.status === "rejected") {
            toast({
              title: "Failed to record the change of circumstances",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Recorded the change of circumstanecs",
              className: ToastSuccess,
            });
          }

          if (apiRes.status === "fulfilled") {
            // Close dialog, show toast, refresh parent ssc
            toast({
              title: "Update Successful",
              className: ToastSuccess,
            });
            // if (onSuccess) onSuccess(data.data.department_id);

            router.refresh();
            setOpen(false);
          } else {
            toast({
              title: "Update Failed",
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
    [data, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonWarn}>
          <Icons.edit /> Edit Personal Information
        </Button>
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
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
              <EmployeeDetailsFormFragment data={data} dialogForm />
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
