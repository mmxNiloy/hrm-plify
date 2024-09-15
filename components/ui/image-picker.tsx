"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import Icons from "./icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  skeleton?: Readonly<React.ReactNode>;
  imageClassName?: string;
}

const ImagePicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, skeleton, imageClassName, ...props }, ref) => {
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
          if (
            !props.readOnly &&
            !props.disabled &&
            inputRef &&
            inputRef.current
          ) {
            inputRef.current.click();
          }
        }}
        className={cn("flex relative group cursor-pointer", className)}
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
            alt={props.alt ?? "Image Picker preview"}
            className={cn(
              className,
              "rounded-md size-full bg-muted object-contain object-center"
            )}
            src={URL.createObjectURL(selectedImage)}
          />
        ) : props.src ? (
          <Image
            unoptimized
            height={0}
            width={0}
            alt={props.alt ?? "Image Picker preview"}
            className={cn(
              imageClassName,
              "rounded-md size-full bg-slate-500 object-contain object-center"
            )}
            src={props.src}
          />
        ) : (
          <>
            {skeleton ?? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center bg-slate-500 text-white size-full"
                )}
              >
                <Icons.image />
              </div>
            )}
          </>
        )}

        {!props.readOnly && !props.disabled && (
          <div className="absolute hidden rounded-md group-hover:flex backdrop-blur-sm bg-accent/25 size-full flex-col items-center justify-center z-10">
            <Icons.imageUp className="size-1/2" />
          </div>
        )}
      </div>
    );
  }
);
ImagePicker.displayName = "ImagePicker";
export { ImagePicker };
