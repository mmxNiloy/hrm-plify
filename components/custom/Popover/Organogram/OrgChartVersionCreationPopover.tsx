"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useCallback, useEffect, useState } from "react";
import AnimatedTrigger from "../AnimatedTrigger";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IChartVersion } from "@/schema/OrganogramSchema";
import { ButtonSuccess } from "@/styles/button.tailwind";

export default function OrgChartVersionCreationPopover() {
  const sParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [versions, setVersions] = useState<IChartVersion[]>([]);
  const [isValidVersion, setIsValidVersion] = useState<boolean>(false);
  const [newVersion, setNewVersion] = useState<string>("");
  const checkValidityOfNewVersion = useCallback(
    (ver: string) => {
      if (ver.length > 0) {
        const f = versions.find((item) => item.name === ver);
        if (f || ver === "default") setIsValidVersion(false);
        else setIsValidVersion(true);
      } else setIsValidVersion(false);
    },
    [versions]
  );
  const handleVersionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      const ver = v.replace(" ", "-").toLowerCase();
      setNewVersion(ver);
      checkValidityOfNewVersion(ver);
    },
    [checkValidityOfNewVersion]
  );

  const createVersion = useCallback(() => {
    localStorage.setItem(
      "organogram-versions",
      JSON.stringify([
        { name: newVersion, lastModified: new Date().toUTCString() },
        ...versions,
      ])
    );

    router.push(`${pathname}?version=${newVersion}`);
  }, [newVersion, pathname, router, versions]);

  useEffect(() => {
    const storedVersions = localStorage.getItem("organogram-versions");
    if (storedVersions) {
      const v = JSON.parse(storedVersions) as IChartVersion[];
      const sortedVersions = v.sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
      );
      setVersions(sortedVersions);

      // router.push(`${pathname}?version=${encodeURIComponent(sortedVersions[0].name)}`)
    }
  }, [sParams]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <AnimatedTrigger label="New Version" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Input
          onChange={handleVersionChange}
          value={newVersion}
          placeholder="Version Name"
        />
        <Button
          onClick={createVersion}
          disabled={!isValidVersion}
          className={ButtonSuccess}
        >
          <Icons.check /> Submit
        </Button>
      </PopoverContent>
    </Popover>
  );
}
