"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { ButtonBlue } from "@/styles/button.tailwind";
import SiteConfig from "@/utils/SiteConfig";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Utility functions for cookie handling
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

export default function RotatePhoneOverlay() {
  const [open, setOpen] = useState<boolean>(true);

  // Check cookie on mount
  useEffect(() => {
    const dismissed = getCookie("rotateOverlayDismissed");
    if (dismissed === "true") {
      setOpen(false);
    }
  }, []);

  // Handle dismiss and set cookie
  const handleDismiss = () => {
    setOpen(false);
    setCookie("rotateOverlayDismissed", "true", 30); // Persist for 30 days
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={cn(
        "sticky md:hidden z-[9999] top-0 left-0 w-screen h-screen flex flex-col items-center justify-center gap-2 from-purple-300/30 to-orange-400/50 bg-gradient-to-br backdrop-blur-md",
        open ? "flex" : "hidden"
      )}
    >
      <DotLottieReact
        className="w-full"
        src="/anim/rotate_phone.lottie"
        loop
        autoplay
      />

      <h4 className="font-bold text-2xl text-center">
        Please Rotate Your Phone.
        <br />
        {SiteConfig.appName} works best on wide screen devices.
      </h4>

      <div className="flex gap-4">
        <Button className={ButtonBlue} onClick={handleClose}>
          <Icons.cross /> Close
        </Button>

        <Button variant={"destructive"} onClick={handleDismiss}>
          <Icons.trash /> Don&apos;t show again
        </Button>
      </div>
    </div>
  );
}
