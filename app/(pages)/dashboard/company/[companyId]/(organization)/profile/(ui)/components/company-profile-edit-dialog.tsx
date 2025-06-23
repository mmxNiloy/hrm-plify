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
import { ICompany } from "@/schema/CompanySchema";
import { ButtonWarn } from "@/styles/button.tailwind";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import CompanyProfileFormFragment from "./company-profile-form-fragment";

export default function CompanyProfileEditDialog({
  data,
  isAdmin = false,
}: {
  data: ICompany;
  isAdmin?: boolean;
}) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const handleSuccess = useCallback(() => {
    router.refresh();
    setOpen(false);
  }, [router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="warning"
          className="shadow-sm hover:shadow-md"
          size="sm"
        >
          <Icons.edit /> Edit Company
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-1">
              <Icons.edit /> Edit Company
            </span>
          </DialogTitle>
          <DialogDescription>
            Update your company profile by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <CompanyProfileFormFragment
          isAdmin={isAdmin}
          data={data}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
