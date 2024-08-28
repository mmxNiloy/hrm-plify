import Icons from "@/components/ui/icons";
import React from "react";

export default function SiteLoading() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-center">
      <Icons.spinner className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
}
