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
        className={cn(
          "size-fit bg-background aspect-square rounded-full border overflow-hidden p-2 flex flex-col relative cursor-pointer group items-center justify-center",
          className
        )}
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
            className={
              "rounded-full w-full aspect-square bg-accent object-contain object-center"
            }
            src={URL.createObjectURL(selectedImage)}
          />
        ) : (
          <Icons.user className={"group-hover:invisible size-1/2"} />
        )}

        <div className="absolute hidden group-hover:flex backdrop-blur-sm bg-accent/25 size-full  flex-col items-center justify-center">
          <Icons.imageUp className="size-1/2" />
        </div>
      </div>
    );
  }
);
AvatarPicker.displayName = "AvatarPicker";
export { AvatarPicker };
