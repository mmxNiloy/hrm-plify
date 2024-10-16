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
import CompanyProfileFormFragment from "../../Form/Fragment/Company/CompanyProfileFormFragment";
import { IUser } from "@/schema/UserSchema";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function ClientCompanyCreationDialog({ user }: { user: IUser }) {
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
        const apiRes = await fetch("/api/company/client", {
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
          const res = await apiRes.json();
          toast({
            title: "Failed to Create a Company!",
            description: `${res.message}`,
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
        <Button
          size={"sm"}
          className={cn(
            ButtonSuccess,
            "w-full from-green-400 to-green-500 bg-gradient-to-br shadow-lg"
          )}
        >
          <Icons.check /> Create a Company
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
          <div className="sr-only">
            <Input readOnly defaultValue={user.user_id} name="user_id" />
          </div>
          {/* Company Creation form */}
          <ScrollArea className="h-[70vh]">
            <div className="p-1 flex flex-col gap-4">
              <CompanyProfileFormFragment asClient disabled={loading} />
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
