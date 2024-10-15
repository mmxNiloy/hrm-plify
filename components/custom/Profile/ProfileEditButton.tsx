"use client";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { WIPToastOptions } from "@/utils/Misc";
import React, { useCallback } from "react";

export default function ProfileEditButton() {
  const { toast } = useToast();
  const handleClick = useCallback(() => {
    toast(WIPToastOptions);
  }, [toast]);
  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant={"ghost"}
      className="rounded-full"
    >
      <Icons.pencil />
    </Button>
  );
}
