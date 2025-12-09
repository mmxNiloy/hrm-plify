"use client";
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { z } from "zod";
import { CompanyTradeDetailsSchema } from "@/schema/form/company.schema";
import CompanyTradeDetailsFormFragment from "./company-trade-details-form-fragment";

interface Props {
  data?: z.infer<typeof CompanyTradeDetailsSchema>;
  companyId: string;
}

export default function CompanyTradeDetailsEditDialog({
  data,
  companyId,
}: Props) {
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
          <Edit /> Edit
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
              <Edit /> Edit Trade Details
            </span>
          </DialogTitle>
          <DialogDescription>
            Update your company&apos;s trade details by filling out the form.
          </DialogDescription>
        </DialogHeader>

        <CompanyTradeDetailsFormFragment
          companyId={companyId}
          data={data}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
