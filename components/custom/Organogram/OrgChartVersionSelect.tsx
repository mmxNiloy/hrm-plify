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
import { IChartVersion, IOrganogramDB } from "@/schema/OrganogramSchema";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import OrgChartNameEditPopover from "../Popover/Organogram/OrgChartNameEditPopover";

interface Props {
  charts: IOrganogramDB[];
}

export default function OrgChartVersionSelect({ charts }: Props) {
  const sParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentVersion, setCurrentVersion] = useState<
    IOrganogramDB | undefined
  >(
    charts.find(
      (item) =>
        item.id.toString() ===
        decodeURIComponent(sParams.get("version") ?? "default")
    ) ?? charts.at(0)
  );

  const handleVersionSelectChange = useCallback(
    (v: string) => {
      setCurrentVersion(
        charts.find((item) => item.id.toString() === v) ?? charts.at(0)
      );

      if (v === "default") router.push(pathname);
      else router.push(`${pathname}?version=${encodeURIComponent(v)}`);
    },
    [charts, pathname, router]
  );

  useEffect(() => {
    const verParam = decodeURIComponent(sParams.get("version") ?? "default");
    setCurrentVersion(
      charts.find((item) => item.id.toString() === verParam) ?? charts.at(0)
    );
  }, [charts, sParams]);

  return (
    <div className="flex flex-col gap-2">
      <Label>Select a version</Label>
      <div className="flex gap-2">
        <Select
          defaultValue={decodeURIComponent(
            sParams.get("version") ?? charts.at(0)?.id.toString() ?? "default"
          )}
          onValueChange={handleVersionSelectChange}
        >
          <SelectTrigger className="min-w-64">
            <SelectValue placeholder="Default" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a version</SelectLabel>
              {charts.length < 1 && (
                <SelectItem value="default">Default</SelectItem>
              )}
              {charts.map((item, index) => (
                <SelectItem
                  key={`org-chart-version-${index}`}
                  value={item.id.toString()}
                >
                  {item.name} (
                  {new Date(item.updated_at ?? new Date()).toLocaleDateString(
                    "en-GB"
                  )}
                  )
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <OrgChartNameEditPopover data={currentVersion} />
      </div>
    </div>
  );
}
