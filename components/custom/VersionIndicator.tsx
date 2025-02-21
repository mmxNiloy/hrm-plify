"use server";
import React from "react";
import TextCapsule from "./TextCapsule";
import Icons from "../ui/icons";
import SiteConfig from "@/utils/SiteConfig";

export default async function VersionIndicator() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <TextCapsule className="sticky bottom-4 left-full mr-4 bg-blue-500">
      <Icons.version />v{SiteConfig.currentVersion}
    </TextCapsule>
  );
}
