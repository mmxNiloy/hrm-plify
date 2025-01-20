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
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { IPermission, IUser } from "@/schema/UserSchema";
import UserConfigFormFragment from "../../Form/Fragment/UserAccess/UserConfigFormFragment";
import SystemUserFormFragment from "../../Form/Fragment/UserAccess/SystemUserFormFragment";

interface Props {
  data?: IUser;
  permissions: IPermission[];
  asIcon?: boolean;
}

export default function UserEditDialog({
  data,
  asIcon = false,
  permissions,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);
      const user: IUser = {
        email: fd.get("email") as string,
        password: fd.get("password") as string,
        user_id: data?.user_id ?? 0,
        password_hash: "",
        first_name: fd.get("first_name") as string,
        middle_name: fd.get("middle_name") as string,
        last_name: fd.get("last_name") as string,
        status: fd.get("status") as string,
        access_permissions: data?.access_permissions ?? [],
        userAccess: (fd.getAll("userAccess") as string[]).map((item) =>
          Number.parseInt(item)
        ),
        created_at: "",
        updated_at: "",
      };

      // console.log("System User Request Body >", user);

      setLoading(true);

      try {
        const apiRes = await fetch(`/api/user-access/sys-user`, {
          method: data ? "PATCH" : "POST",
          body: JSON.stringify(user),
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
    },
    [data, router, toast]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.plus /> Add new System User
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
          <DialogTitle>{data ? "Update" : "Add"} System User</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by asterisks (<span className="text-red-500">*</span>)
            are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
              <SystemUserFormFragment
                permissions={permissions}
                disabled={loading}
                data={data}
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
