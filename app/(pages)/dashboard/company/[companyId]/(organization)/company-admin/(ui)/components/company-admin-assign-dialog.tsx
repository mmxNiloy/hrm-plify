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
import { Edit, UserPlus2 } from "lucide-react";
import CompanyAdminCreateFormFragment from "./company-admin-create-form-fragment";
import { ButtonGradient } from "@/styles/button.tailwind";

interface Props {
  companyId: string;
}

export default function CompanyAdminAssignDialog({ companyId }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onSuccess = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={ButtonGradient} size="sm">
          <UserPlus2 /> Assign
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
              <UserPlus2 />
              Assign Company Admin
            </span>
          </DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
        </DialogHeader>

        <CompanyAdminCreateFormFragment
          companyId={companyId}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
