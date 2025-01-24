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
import { IChartVersion, IOrganogramDB } from "@/schema/OrganogramSchema";
import { ButtonSuccess } from "@/styles/button.tailwind";
import { useToast } from "@/components/ui/use-toast";
import { ToastSuccess } from "@/styles/toast.tailwind";
import { Label } from "@/components/ui/label";

interface Props {
  data?: IOrganogramDB;
}

export default function OrgChartNameEditPopover({ data }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [versions, setVersions] = useState<IChartVersion[]>([]);
  const [isValidVersion, setIsValidVersion] = useState<boolean>(false);
  const [newVersion, setNewVersion] = useState<string>(data?.name ?? "");
  const [open, setOpen] = useState<boolean>(false);
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

  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const createVersion = useCallback(async () => {
    setLoading(true);

    const nVersion = {
      id: data?.id,
      name: newVersion,
    };

    const res = await fetch("/api/organogram/version", {
      method: "PATCH",
      body: JSON.stringify(nVersion),
    });

    if (res.ok) {
      toast({
        title: "Update successful",
        className: ToastSuccess,
      });

      const data = await res.json();

      setOpen(false);
      router.refresh();
    } else {
      toast({
        title: "Update Failed",
        variant: "destructive",
      });
    }
    setLoading(false);
    setOpen(false);
  }, [data?.id, newVersion, router, toast]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Icons.edit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <Label>Version Name</Label>
        <Input
          onChange={handleVersionChange}
          value={newVersion}
          placeholder="Version Name"
        />
        <Button
          onClick={createVersion}
          disabled={!isValidVersion || loading}
          className={ButtonSuccess}
        >
          <Icons.check /> Submit
        </Button>
      </PopoverContent>
    </Popover>
  );
}
