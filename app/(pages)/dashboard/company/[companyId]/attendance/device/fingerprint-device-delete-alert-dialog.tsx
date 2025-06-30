"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useTransition } from "react";
import Icons from "@/components/ui/icons";
import deleteFingerprintDevice from "@/app/(server)/actions/fingerprint/delete-fingerprint-device.controller";

interface Props {
  serialNum: string;
}
export default function FingerprintDeviceDeleteAlertDialog({
  serialNum,
}: Props) {
  const [open, setOpen] = useState(false);
  const [updating, startUpdate] = useTransition();

  const router = useRouter();

  const onSubmit = useCallback(() => {
    startUpdate(async () => {
      try {
        const result = await deleteFingerprintDevice({ serialNum });

        if (result.error) {
          toast.error("Failed to delete fingerprint device");
          return;
        }

        toast.success("Fingerprint device deleted successfully");

        router.refresh();
        setOpen(false);
      } catch (err) {
        toast.error("Failed to delete fingerprint device");
      }
    });
  }, [serialNum, router]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} className="text-red-500">
          <Icons.trash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className="flex items-center gap-1">
              <Icons.trash /> Delete Device
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this device?
            <br />
            <em className="text-red-500">This action is irreversible.</em>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant={"destructive"}
              className="bg-yellow-500 hover:bg-yellow-500/90 text-white"
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={onSubmit}
            className="bg-red-500 hover:bg-red-500/90 text-white gap-1"
            disabled={updating}
          >
            {updating ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              <Icons.trash />
            )}
            {updating ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
