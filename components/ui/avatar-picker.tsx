"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import Icons from "./icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const AvatarPicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [selectedImage, setSelectedImage] = useState<File>();
    const handleImageSelect = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
        }
      },
      []
    );

    const inputRef: React.LegacyRef<HTMLInputElement> | undefined =
      useRef(null);

    return (
      <div
        onClick={() => {
          if (inputRef && inputRef.current) {
            inputRef.current.click();
          }
        }}
        className="size-fit rounded-full border overflow-hidden p-2 flex flex-col relative cursor-pointer group items-center justify-center"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          ref={inputRef}
          {...props}
        />
        {selectedImage ? (
          <Image
            unoptimized
            height={0}
            width={0}
            alt={props.alt ?? "Avatar preview"}
            className={cn(
              "rounded-full w-full aspect-square bg-accent object-contain object-center",
              className
            )}
            src={URL.createObjectURL(selectedImage)}
          />
        ) : (
          <Icons.user className={cn("w-full aspect-square", className)} />
        )}

        <div className="absolute hidden group-hover:flex size-full bg-accent/25 flex-col items-center justify-center">
          <Icons.imageUp />
        </div>
      </div>
    );
  }
);
AvatarPicker.displayName = "AvatarPicker";
export { AvatarPicker };
