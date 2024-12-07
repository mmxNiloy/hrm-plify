"use client";

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
import { IJobListing } from "@/schema/JobSchema";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";

export default function CompanyJobListSelect({
  jobs,
}: {
  jobs: IJobListing[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleJobChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      params.delete("limit");

      if (value === "all") params.delete("job_id");
      else {
        params.append("job_id", value);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  return (
    <div className="flex flex-col gap-2">
      <Label>Selected Job(s)</Label>
      <Select
        defaultValue={searchParams.get("job_id") ?? "all"}
        onValueChange={handleJobChange}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a Job" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a job</SelectLabel>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobs.map((item) => (
              <SelectItem
                value={`${item.id}`}
                key={`company-job-listing-${item.id}`}
              >
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
