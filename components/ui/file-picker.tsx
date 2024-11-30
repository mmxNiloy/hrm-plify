"use client";
import React, { useCallback, useState } from "react";
import { Input } from "./input";
import { useToast } from "./use-toast";
import SiteConfig from "@/utils/SiteConfig";
import { ToastWarn } from "@/styles/toast.tailwind";
import { withPrecision } from "@/utils/Misc";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onPick?: (file: File) => void;
  onError?: () => void;
  onSuccess?: () => void;
}
const FilePicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onPick, onError, onSuccess, type = "file", ...props }, ref) => {
    const { toast } = useToast();
    const [file, setFile] = useState<File>();

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length < 1) {
          return;
        }

        const mFile = e.target.files[0];
        if (mFile.size > SiteConfig.maxFileSize) {
          toast({
            title: "File too large",
            description: `Selected file exceeds the ${withPrecision({
              num: SiteConfig.maxFileSize / 1e6,
            })} MB limit. Current file size: ${withPrecision({
              num: mFile.size / 1e6,
            })} MB. Please select a file within the limit.`,
            className: ToastWarn,
          });
          setFile(undefined);
          if (onError) onError();
          return;
        }

        setFile(mFile);
        if (onPick) onPick(mFile);
        if (onSuccess) onSuccess();
      },
      [onError, onPick, onSuccess, toast]
    );

    return (
      <Input
        data-error={!file ? "true" : "false"}
        ref={ref}
        className={className}
        type={type ?? "file"}
        onChange={handleFileChange}
        {...props}
      />
    );
  }
);
FilePicker.displayName = "FilePicker";

export { FilePicker };
