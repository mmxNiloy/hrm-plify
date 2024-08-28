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
            <div className="flex flex-col gap-4 px-1">
              <div className="flex flex-col gap-2">
                <Label htmlFor="company-name-input">Company Name</Label>
                <Input
                  disabled={loading}
                  id="company-name-input"
                  name="company_name"
                  placeholder="Company Name"
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="industry-input">Industry</Label>
                <Input
                  disabled={loading}
                  id="industry-input"
                  name="industry"
                  placeholder="Industry"
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="headquarters-input">Headquarters</Label>
                <Input
                  disabled={loading}
                  id="headquarters-input"
                  name="headquarters"
                  placeholder="Headquarters"
                  className="rounded-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-number-input">Contact Number</Label>
                <Input
                  disabled={loading}
                  id="contact-number-input"
                  type="tel"
                  name="contact_number"
                  placeholder="Contact Number"
                  className="rounded-full"
                />
              </div>

              <div className="flex items-center justify-center gap-4">
                <div className="w-1/2 flex flex-col gap-2">
                  <Label htmlFor="founded-year-input">Founded Year</Label>
                  <Input
                    disabled={loading}
                    id="founded-year-input"
                    type="number"
                    max={new Date().getFullYear()}
                    min={0}
                    name="founded_year"
                    placeholder="Founded Year"
                    className="rounded-full"
                  />
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                  <Label htmlFor="website-input">Website</Label>
                  <Input
                    disabled={loading}
                    id="website-input"
                    type="url"
                    name="website"
                    placeholder="Website"
                    className="rounded-full"
                  />
                </div>
              </div>

              {/* TODO: Replace logo with a file/image picker here */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="logo-input">Logo</Label>
                <Input
                  disabled={loading}
                  id="logo-input"
                  name="logo"
                  placeholder="Logo"
                  className="rounded-full"
                />
              </div>
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
