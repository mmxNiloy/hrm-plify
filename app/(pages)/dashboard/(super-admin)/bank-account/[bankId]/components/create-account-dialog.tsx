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
import { Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import BankAccountForm from "./bank-account-form";

type Props = {
  bankId: number;
};

export default function CreateAccountDialog({ bankId }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"gradient"} className="rounded-full">
          <Plus />
          Add an Account
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an account</DialogTitle>
          <DialogDescription>Add an account for the bank</DialogDescription>
        </DialogHeader>

        <BankAccountForm onSuccess={onSuccess} asDialog bankId={bankId} />
      </DialogContent>
    </Dialog>
  );
}
