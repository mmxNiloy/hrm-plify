"use client";
import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useContext, useState } from "react";
import VisaFrontSkeleton from "../../Employee/visa-front-skeleton";
import RTWFormContext from "@/context/RTWFormContext";
import { Textarea } from "@/components/ui/textarea";
import { IFormFragmentProps } from "@/utils/Types";
import { IRightToWork } from "@/schema/RightToWork";

export default function RTWStep3CopyTab({
  data,
  readOnly,
}: IFormFragmentProps<IRightToWork>) {
  const { selectedEmployee } = useContext(RTWFormContext);
  const [rtwEvidence1, setRTWEvidence1] = useState<string>();
  const [rtwEvidence2, setRTWEvidence2] = useState<string>();
  const [rtwReportDoc, setRTWReportDoc] = useState<string>();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs col-span-full">
        You must make a clear copy of each document in a format which cannot
        later be altered, and retain the copy securely; electronically or in
        hardcopy. <br />
        <b>You must copy and retain:</b>
      </p>
      <div className="flex gap-2 col-span-full">
        <Checkbox
          name="has_passport_copy"
          id="has-passport-copy"
          defaultChecked={
            data ? (data.has_passport_copy === "on" ? true : false) : true
          }
          disabled={readOnly}
        />
        <Label htmlFor="has-passport-copy">
          <b>Passports:</b> any page with the document expiry date, nationality,
          date of birth, signature, leave expiry date, biometric details and
          photograph, and any page containing information indicating the holder
          has an entitlement to enter or remain in the UK and undertake the work
          in question.
        </Label>
      </div>
      <div className="flex gap-2 col-span-full">
        <Checkbox
          disabled={readOnly}
          defaultChecked={data?.has_all_other_docs === "on" ? true : false}
          name="has_all_other_docs"
          id="has-all-other-docs"
        />
        <Label htmlFor="has-all-other-docs">
          <b>All other documents:</b> the document in full, both sides of a
          biometric residence permit. You must also record and retain the date
          on which the check was made.
        </Label>
      </div>

      <p>Know the type of excuse you have</p>
      <p className="text-xs col-span-full">
        If you have correctly carried out the above 3 steps you will have an
        excuse against liability for a civil penalty if the above named person
        is found working for you illegally. However, you need to be aware of the
        type of excuse you have as this determines how long it lasts for, and
        if, and when you are required to do a followup check.
        <br />
        <b>The documents that you have checked and copied are from:</b>
      </p>
      <div className="flex flex-col gap-2 col-span-full">
        <div className="flex gap-2">
          {/* TODO: Handle the case for readonly view here */}
          <Checkbox
            disabled={readOnly}
            name="is_copied_from_list_a"
            id="is_copied_from_list_a"
            defaultChecked={data?.is_copied_from_list_a}
          />
          <Label htmlFor="is_copied_from_list_a">
            <b>List A:</b> You have a continuous statutory excuse for the full
            duration of the person&apos;s employment with you. You are not
            required to carry out any repeat right to work checks on this.
          </Label>
        </div>

        <div className="flex gap-2">
          <Checkbox
            disabled={readOnly}
            name="is_copied_from_list_b_group_1"
            id="is_copied_from_list_b_group_1"
            defaultChecked={data?.is_copied_from_list_b_group_1}
          />
          <Label htmlFor="is_copied_from_list_b_group_1">
            <b>List B - Group 1:</b> You have a time-limited statutory excuse
            which expires when the person&apos;s permission to be in the UK
            expires. You should carry out a follow-up check when the document
            evidencing their permission to work expires.
          </Label>
        </div>

        <div className="flex gap-2">
          <Checkbox
            disabled={readOnly}
            name="is_copied_from_list_b_group_2"
            id="is_copied_from_list_b_group_2"
            defaultChecked={data?.is_copied_from_list_b_group_2}
          />
          <Label htmlFor="is_copied_from_list_b_group_2">
            <b>List B - Group 2:</b> You have a time-limited statutory excuse
            which expires six months from the date specified in your Positive
            Verification Notice. This means that you should carry out a
            follow-up check when this notice expires.
          </Label>
        </div>
      </div>

      <Table>
        <TableHeader className="bg-blue-500 *:hover:bg-blue-600 *:*:text-white">
          <TableRow>
            <TableHead>Know the type of excuse you have</TableHead>
            <TableHead>Date followup required</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-muted">
            <TableCell>List B: (Group 1)</TableCell>
            <TableCell>
              <Input
                type="date"
                name="list_b_group_1_follow_up_date"
                required
                defaultValue={data?.list_b_group_1_follow_up_date}
                readOnly={readOnly}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>List B: (Group 2)</TableCell>
            <TableCell>
              <Input
                type="date"
                name="list_b_group_2_follow_up_date"
                required
                defaultValue={data?.list_b_group_2_follow_up_date}
                readOnly={readOnly}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell>EUSS</TableCell>
            <TableCell>
              <Input
                type="date"
                name="euss_follow_up_date"
                required
                defaultValue={data?.euss_follow_up_date}
                readOnly={readOnly}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <p>RTW Evidence Scans - 1</p>

          <Label>Select Document</Label>
          <Select
            name="rtw_evidence_scan_1"
            defaultValue={data?.rtw_evidence_scan_1}
            disabled={readOnly}
            onValueChange={(e) => setRTWEvidence1(e)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Document" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select document</SelectLabel>
                <SelectItem value="proof_of_address">
                  Proof of correspondance address
                </SelectItem>
                <SelectItem value="passport">Passport document</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <AvatarPicker
            key={`rtw-evidence-1-${rtwEvidence1}`}
            className="size-full max-h-64"
            src={data?.rtw_evidence_scan_1_file_url}
            name="rtw_evidence_scan_1_file"
            skeleton={<VisaFrontSkeleton />}
            variant="video"
            readOnly={readOnly}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>RTW Evidence Scans - 2 (If Applicable)</p>

          <Label>Select Document</Label>
          <Select
            name="rtw_evidence_scan_2"
            onValueChange={(e) => setRTWEvidence2(e)}
            defaultValue={data?.rtw_evidence_scan_2}
            disabled={readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Document" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select document</SelectLabel>
                <SelectItem value="proof_of_address">
                  Proof of correspondance address
                </SelectItem>
                <SelectItem value="passport">Passport document</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <AvatarPicker
            key={`rtw-evidence-2-${rtwEvidence2}`}
            className="size-full max-h-64"
            src={data?.rtw_evidence_scan_2_file_url}
            name="rtw_evidence_scan_2_file"
            skeleton={<VisaFrontSkeleton />}
            variant="video"
            readOnly={readOnly}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>RTW Report</p>

          <Label>Select Document</Label>
          <Select
            name="rtw_report_doc"
            onValueChange={(e) => setRTWReportDoc(e)}
            defaultValue={data?.rtw_report_doc}
            disabled={readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Document" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select document</SelectLabel>
                <SelectItem value="proof_of_address">
                  Proof of correspondance address
                </SelectItem>
                <SelectItem value="passport">Passport document</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <AvatarPicker
            key={`rtw-report-doc-${rtwReportDoc}`}
            className="size-full max-h-64"
            src={data?.rtw_report_doc_file_url}
            name="rtw_report_doc_file"
            skeleton={<VisaFrontSkeleton />}
            variant="video"
            readOnly={readOnly}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>RTW Check Results</p>
          <Label>RTW Check Results</Label>
          <Select
            name="rtw_check_result"
            defaultValue={data?.rtw_check_result}
            disabled={readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select RTW Check Result" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select RTW check result</SelectLabel>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label>Checker Name</Label>
          <Input
            name="checker_name"
            required
            placeholder="Checker Name"
            defaultValue={data?.checker_name}
            readOnly={readOnly}
          />

          <Label>Designation</Label>
          <Input
            name="checker_designation"
            required
            placeholder="Designation"
            defaultValue={data?.checker_designation}
            readOnly={readOnly}
          />

          <Label>Contact No.</Label>
          <Input
            name="checker_contact"
            required
            placeholder="Contact No."
            defaultValue={data?.checker_contact}
            readOnly={readOnly}
          />

          <Label>Email Address</Label>
          <Input
            name="checker_email"
            required
            placeholder="Email Address"
            defaultValue={data?.checker_email}
            readOnly={readOnly}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Remarks</Label>
        <Textarea
          className="resize-none"
          rows={5}
          name="rtw_remarks"
          placeholder="Example: No dentist/sports job, No recourse to public fund. Maximum 20 hours weekly."
          defaultValue={data?.rtw_remarks}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}
