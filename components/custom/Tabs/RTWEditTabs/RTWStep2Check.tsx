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
import { IRightToWork } from "@/schema/RightToWork";
import { RequiredAsterisk } from "@/styles/label.tailwind";
import { IFormFragmentProps } from "@/utils/Types";
import React from "react";

export default function RTWStep2CheckTab({
  data,
  readOnly,
}: IFormFragmentProps<IRightToWork>) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <p className="text-xs col-span-full">
        You must check that the documents are genuine and that the person
        presenting them is the prospective employee or employee, the rightful
        holder and allowed to do the type of work you are offering.
      </p>
      <div className="col-span-full flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Are photographs consistent across documents and with the person&apos;s
          appearance?
        </Label>

        <Select
          disabled={readOnly}
          name="is_photo_consistent"
          defaultValue={data?.is_photo_consistent ?? "yes"}
        >
          <SelectTrigger>
            <SelectValue
              placeholder="Are photographs consistent across documents and with the person's
          appearance?"
            />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an option</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="n/a">N/A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-full flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Are dates of birth correct and consistent across documents?
        </Label>

        <Select
          disabled={readOnly}
          name="is_dob_consistent"
          defaultValue={data?.is_dob_consistent ?? "yes"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Are dates of birth correct and consistent across documents?" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an option</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="n/a">N/A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-full flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Are expiry dates for time-limited permission to be in the UK in the
          future i.e. they have not passed (if applicable)?
        </Label>

        <Select
          disabled={readOnly}
          name="is_not_expired"
          defaultValue={data?.is_not_expired ?? "yes"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Are expiry dates for time-limited permission to be in the UK in the future i.e. they have not passed (if applicable)?" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an option</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="n/a">N/A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-full flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Have you checked work restrictions to determine if the person is able
          to work for you and do the type of work you are offering? (For
          students who have limited permission to work during termtime, you must
          also obtain, copy and retain details of their academic term and
          vacation times covering the duration of their period of study in the
          UK for which they will be employed.)
        </Label>

        <Select
          disabled={readOnly}
          name="is_not_restricted"
          defaultValue={data?.is_not_restricted ?? "yes"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an option</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="n/a">N/A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-full flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Are you satisfied the document is genuine, has not been tampered with
          and belongs to the holder?
        </Label>

        <Select
          disabled={readOnly}
          name="is_doc_genuine"
          defaultValue={data?.is_doc_genuine ?? "yes"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Are you satisfied the document is genuine, has not been tampered with and belongs to the holder?" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an option</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="n/a">N/A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-full flex flex-col gap-2">
        <Label className={RequiredAsterisk}>
          Have you checked the reasons for any different names across documents
          (e.g. marriage certificate, divorce decree, deed poll)? (Supporting
          documents should also be photocopied and a copy retained.)
        </Label>

        <Select
          disabled={readOnly}
          name="is_name_consistent"
          defaultValue={data?.is_name_consistent ?? "yes"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Have you checked the reasons for any different names across documents (e.g. marriage certificate, divorce decree, deed poll)? (Supporting documents should also be photocopied and a copy retained.)" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select an option</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="n/a">N/A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
