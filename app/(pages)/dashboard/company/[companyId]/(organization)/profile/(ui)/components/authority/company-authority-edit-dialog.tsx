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
import { ButtonWarn } from "@/styles/button.tailwind";
import React, { useCallback, useMemo, useState } from "react";
import { ICompanyAuthorizedDetailsBase } from "@/schema/CompanySchema";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import CompanyAuthorityFormFragment from "./company-authority-form-fragment";
import updateCompanyAuthority from "@/app/(server)/actions/company/authority/update-company-authority.controller";
import updateCompanyKeyContact from "@/app/(server)/actions/company/key-contact/update-company-key-contact.controller";
import updateCompanyL1User from "@/app/(server)/actions/company/l1-user/update-company-l1-user.controller";

interface Props {
  data?: ICompanyAuthorizedDetailsBase;
  companyId: string;
  type?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
}

export default function CompanyAuthorityEditDialog({
  data,
  companyId,
  type = "Authorised Personnel",
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const handleSuccess = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  const updateFn = useMemo(() => {
    switch (type) {
      case "Authorised Personnel":
        return updateCompanyAuthority;
      case "Key Contact":
        return updateCompanyKeyContact;
      case "Level 1 User":
        return updateCompanyL1User;
      default:
        return undefined;
    }
  }, [type]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="warning"
          className="shadow-sm hover:shadow-md"
          size={"sm"}
        >
          <Icons.edit /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            <span className="flex gap-1 items-center">
              <Edit /> Edit {type}
            </span>
          </DialogTitle>
          <DialogDescription>
            Update your company&apos;s {type.toLowerCase()} details by filling
            out the form.
          </DialogDescription>
        </DialogHeader>

        <CompanyAuthorityFormFragment
          companyId={companyId}
          data={data}
          onSuccess={handleSuccess}
          updateFn={updateFn}
          title={type}
        />
      </DialogContent>
    </Dialog>
  );
}
