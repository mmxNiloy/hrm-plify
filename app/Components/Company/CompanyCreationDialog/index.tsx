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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  ButtonBase,
  ButtonBlue,
  ButtonSuccess,
} from "@/styles/button.tailwind";
import {
  DialogContentWidth,
  DialogTitleStyles,
} from "@/styles/dialog.tailwind";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import CompanyProfileFormFragment from "../CompanyEditDialog/CompanyProfileEditDialog/form-fragment";

export default function CompanyCreationDialog() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const handleCreateCompany = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setLoading(true);
      const fd = new FormData(e.currentTarget);

      try {
        const apiRes = await fetch("/api/company", {
          method: "POST",
          body: fd,
        });

        if (apiRes.ok) {
          toast({
            title: "Company Created!",
            className: "bg-green-500 text-white",
          });

          // Refresh the parent server component
          router.refresh();

          // Close the dialog
          setOpen(false);
        } else {
          toast({
            title: "Failed to Create a Company!",
            variant: "destructive",
          });
        }
      } catch (_) {
        toast({
          title: "Server Error Encountered!",
          variant: "destructive",
        });
      }

      setLoading(false);
    },
    [router, toast]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className={ButtonBlue}>
          <Icons.plus /> Create a Company
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
        }}
        className={DialogContentWidth}
      >
        <DialogHeader>
          <DialogTitle className={DialogTitleStyles}>
            <Icons.company /> Create a Company
          </DialogTitle>
          <DialogDescription>
            Fill out the form with appropriate information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateCompany}>
          {/* Company Creation form */}
          <ScrollArea className="h-[70vh]">
            <div className="p-1 flex flex-col gap-4">
              <CompanyProfileFormFragment disabled={loading} />
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={loading}
                type="button"
                variant={"destructive"}
                className={ButtonBase}
              >
                <Icons.cross /> Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading} className={ButtonSuccess}>
              {loading ? (
                <>
                  <Icons.spinner className="animate-spin ease-in-out" /> Loading
                </>
              ) : (
                <>
                  <Icons.check /> Submit
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
