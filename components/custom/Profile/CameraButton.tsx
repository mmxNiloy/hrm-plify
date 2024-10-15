"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { WIPToastOptions } from "@/utils/Misc";
import React, { useCallback } from "react";

export default function CameraButton() {
  const { toast } = useToast();
  const handleImagePicker = useCallback(() => {
    toast(WIPToastOptions);
  }, [toast]);
  return (
    <Button
      onClick={handleImagePicker}
      className="rounded-full absolute top-6 right-6 shadow-lg bg-white hover:bg-white hover:text-sky-400 text-sky-500"
      size={"icon"}
    >
      <Icons.camera />
    </Button>
  );
}
