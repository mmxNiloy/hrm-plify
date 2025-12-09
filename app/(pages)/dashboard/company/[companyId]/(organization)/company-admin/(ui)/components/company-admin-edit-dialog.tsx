"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ICompanyUser } from "@/schema/UserSchema";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import UserEditFormFragment from "./user-edit-form-fragment";
import { Edit } from "lucide-react";

interface Props {
  data: ICompanyUser;
}

export default function CompanyAdminEditDialog({ data }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onSuccess = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="sm"
          className="w-full justify-start [&_svg]:size-4 text-xs px-2 gap-0.5"
        >
          <Icons.edit /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-1">
              <Edit />
              Edit Company Admin
            </span>
          </DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
        </DialogHeader>

        <UserEditFormFragment data={data} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
}
