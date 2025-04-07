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
  ButtonGradient,
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
import { upload } from "@/app/(server)/actions/upload";
import SiteConfig from "@/utils/SiteConfig";

export default function ClientCompanyCreationDialog({ user }: { user: IUser }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const handleCreateCompany = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        setLoading(true);
        const fd = new FormData(e.currentTarget);

        // Try to upload the logo (if attached)
        const logoFile = fd.get("logo") as File | undefined;

        if ((logoFile?.size ?? 0) > SiteConfig.maxFileSize) {
          toast({
            title: "File too large",
            description: `Cannot upload this file. The file exceeds the permissible limit: ${
              SiteConfig.maxFileSize / 1e5
            }MB`,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        var logoUrl = "";
        if (logoFile && logoFile.size <= SiteConfig.maxFileSize) {
          // Upload the logo
          const logoUpload = await upload(logoFile);
          if (logoUpload.error) {
            toast({
              title: "Upload Failed",
              description: `Failed to upload the logo. Cause: ${logoUpload.error.message}`,
              variant: "destructive",
            });
          } else {
            logoUrl = logoUpload.data.fileUrl;
          }
        }

        try {
          fd.delete("logo");
          fd.append("logo", logoUrl);

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
      } catch (error) {
        setLoading(false);
        toast({
          title: "Something went wrong!",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
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
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
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
