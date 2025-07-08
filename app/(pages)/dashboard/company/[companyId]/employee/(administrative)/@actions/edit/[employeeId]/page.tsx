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
import React from "react";

export default function EditEmployeeActions() {
  return (
    <div className="flex flex-col gap-3">
      <Label>View</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a View" />
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
