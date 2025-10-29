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
import { Edit, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import BankAccountForm from "./bank-account-form";
import { IBankAccount } from "@/schema/form/bank.schema";

type Props = {
  data: IBankAccount;
};

export default function EditAccountDialog({ data }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit account</DialogTitle>
          <DialogDescription>Edit an account for the bank</DialogDescription>
        </DialogHeader>

        <BankAccountForm
          onSuccess={onSuccess}
          asDialog
          bankId={data.bank_id}
          data={data}
        />
      </DialogContent>
    </Dialog>
  );
}
