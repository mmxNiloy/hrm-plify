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
import { ICompanyAddress } from "@/schema/CompanySchema";
import React, { useCallback, useState } from "react";
import CompanyAddressFormFragment from "./company-address-form-fragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

export default function CompanyAddressEditDialog({
  data,
  companyId,
}: {
  data?: ICompanyAddress;
  companyId: string;
}) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"warning"}
          className="shadow-sm hover:shadow-md"
          size={"sm"}
        >
          <Icons.edit /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent
        className={DialogContentWidth}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <Edit /> Edit Company Address
            </span>
          </DialogTitle>
          <DialogDescription>
            Update your company&apos;s address by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <CompanyAddressFormFragment
          companyId={companyId}
          data={data}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
