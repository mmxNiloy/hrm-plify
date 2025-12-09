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
import { searchParamsParsers } from "@/utils/searchParamsParsers";
import { useQueryState } from "nuqs";
import React from "react";

export default function EditEmployeeActions() {
  const [view, setView] = useQueryState(
    "employeeProfileView",
    searchParamsParsers.employeeProfileView
  );

  return (
    <div className="flex flex-col gap-3">
      <Label>View</Label>
      <Select value={view} onValueChange={(val) => setView(val as typeof view)}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Personal Info" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>View</SelectLabel>
            <SelectItem value="personal-info">Personal Info</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="passport-info">Passport & VISA</SelectItem>
            <SelectItem value="euss">EUSS & DBS</SelectItem>
            <SelectItem value="nid">NID</SelectItem>
            <SelectItem value="contact">Contact</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
