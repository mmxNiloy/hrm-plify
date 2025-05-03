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
import { cn } from "@/lib/utils";
import refreshUserCookie from "@/app/(server)/actions/refreshUserCookie";
import { IUploadResult, upload } from "@/app/(server)/actions/upload";
import SiteConfig from "@/utils/SiteConfig";
import { headers } from "next/headers";
import uploadFile from "@/utils/uploadFile";

export default function CompanyCreationDialog({
  asClient = false,
  Icon,
}: {
  asClient?: boolean;
  Icon?: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [imageFileError, setImageFileError] = useState<Boolean>(false);

  const handleCreateCompany = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        fd.append("is_current_user_owner", asClient ? "true" : "false");

        // Try to upload the logo (if attached)
        const logoFile = fd.get("logo") as File | undefined;
        var logoUrl = "";

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

        if (logoFile && !imageFileError) {
          const logoUpload = await uploadFile(logoFile);

          if (!logoUpload.ok) {
            toast({
              title: "Upload Failed",
              description: `Failed to upload the logo. Cause: ${logoUpload.error.message}`,
              variant: "destructive",
            });
          } else {
            const res = logoUpload.data;
            logoUrl = res.fileUrl;
          }
        }

        try {
          fd.delete("logo");
          fd.append("logo", logoUrl);
          const apiRes = await fetch("/api/company", {
            method: "POST",
            body: fd,
          });

          if (apiRes.ok) {
            toast({
              title: "Company Created!",
              className: "bg-green-500 text-white",
            });

            if (asClient) {
              await refreshUserCookie();
            }

            // Refresh the parent server component
            router.refresh();

            // Close the dialog
            setOpen(false);
          } else {
            toast({
              title: "Failed to Create a Company!",
              description: JSON.stringify(await apiRes.json()),
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
    [asClient, imageFileError, router, toast]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={asClient ? "default" : "sm"}
          className={cn(ButtonGradient, asClient ? "w-full" : "")}
        >
          {Icon ? <>{Icon}</> : <Icons.plus />} Create a Company
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
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="p-1 flex flex-col gap-4">
              <CompanyProfileFormFragment
                onSizeExceeded={() => setImageFileError(false)}
                asClient={asClient}
                disabled={loading}
              />
            </div>
          </ScrollArea>

          <DialogFooter className="gap-1">
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
