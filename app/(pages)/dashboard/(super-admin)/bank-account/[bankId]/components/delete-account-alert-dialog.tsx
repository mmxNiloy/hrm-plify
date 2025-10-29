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
import { Edit, Loader2, Plus, Trash2, XIcon } from "lucide-react";
import React, { useCallback, useState, useTransition } from "react";
import BankAccountForm from "./bank-account-form";
import { IBankAccount } from "@/schema/form/bank.schema";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteBankAccount } from "@/app/(server)/actions/bank/bank-account.actions";

type Props = {
  accountId: number;
};

export default function DeleteAccountAlertDialog({ accountId }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, startDelete] = useTransition();

  const router = useRouter();

  const handleDelete = useCallback(() => {
    startDelete(async () => {
      const result = await deleteBankAccount(accountId);
      if (result.error) {
        toast.error(
          "Failed to delete the bank account! Please try again later."
        );
        return;
      }

      toast.success("The bank account has been deleted!");
      router.refresh();
      setOpen(false);
    });
  }, [accountId, router]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="text-destructive">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this bank account? This action is{" "}
            <em>irreversible</em>.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button
            onClick={handleDelete}
            variant={"destructive"}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
            {loading ? "Deleting" : "Delete"}
          </Button>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={loading}>
              <XIcon /> Close
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
