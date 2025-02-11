"use client";

import React from "react";
import { Button } from "../ui/button";
import Icons from "../ui/icons";
import { useRouter } from "next/navigation";
import { ButtonBlue } from "@/styles/button.tailwind";

export default function RefreshButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.refresh()} size={"sm"} className={ButtonBlue}>
      <Icons.resend /> Refresh
    </Button>
  );
}
