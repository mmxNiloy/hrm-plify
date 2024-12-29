"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IChartVersion } from "@/schema/OrganogramSchema";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function OrgChartVersionSelect() {
  const sParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [versions, setVersions] = useState<IChartVersion[]>([]);

  const handleVersionSelectChange = useCallback(
    (v: string) => {
      if (v === "default") router.push(pathname);
      else router.push(`${pathname}?version=${encodeURIComponent(v)}`);
    },
    [pathname, router]
  );

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
    <div className="flex flex-col gap-2">
      <Label>Select a version</Label>
      <Select
        defaultValue={decodeURIComponent(sParams.get("version") ?? "default")}
        onValueChange={handleVersionSelectChange}
      >
        <SelectTrigger className="min-w-64">
          <SelectValue placeholder="Default" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a version</SelectLabel>
            <SelectItem value="default">Default</SelectItem>
            {versions.map((item, index) => (
              <SelectItem key={`org-chart-version-${index}`} value={item.name}>
                {item.name} (
                {new Date(item.lastModified).toLocaleDateString("en-GB")})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
