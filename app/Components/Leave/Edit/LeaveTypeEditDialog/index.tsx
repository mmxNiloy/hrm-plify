"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icons from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ILeaveType } from "@/schema/LeaveSchema";
import { ButtonBlue, ButtonSuccess } from "@/styles/button.tailwind";
import React, { useState } from "react";
import LeaveTypeFormFragment from "./form-fragment";
import { DialogContentWidth } from "@/styles/dialog.tailwind";

export default function LeaveTypeEditDialog({
  data,
  asIcon = false,
}: {
  data?: ILeaveType;
  asIcon?: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {asIcon ? (
          <Button variant={"ghost"} size="icon">
            <Icons.edit />
          </Button>
        ) : (
          <Button className={ButtonBlue}>
            <Icons.plus /> Create a Leave Type
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className={DialogContentWidth}>
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Create"} a Leave Type</DialogTitle>
          <DialogDescription>
            Fill out the form appropriately.
          </DialogDescription>
          <DialogDescription>
            Fields marked by an asterisk (
            <span className="text-red-500">*</span>) are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh]">
            <div className="grid grid-cols-1 p-4 gap-4">
              <LeaveTypeFormFragment data={data} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                disabled={loading}
                className="rounded-full"
                variant={"destructive"}
                size="sm"
              >
                <Icons.cross /> Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className={ButtonSuccess}
              size="sm"
            >
              {loading ? (
                <Icons.spinner className="animate-spin ease-in-out" />
              ) : (
                <Icons.check />
              )}{" "}
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
