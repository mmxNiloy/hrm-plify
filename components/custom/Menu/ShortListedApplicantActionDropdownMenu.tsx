import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/icons";
import React from "react";
import { IJobApplicant } from "@/schema/JobSchema";
import ApplicantOnboardingDialogWrapper from "../Dialog/Recruitment/OnboardApplicantDialogWrapper";
import OfferLetterEditDialog from "../Dialog/Recruitment/OfferLetterEditDialog";
import { ICompany } from "@/schema/CompanySchema";

interface JobApplicantWithUpdateAccess extends IJobApplicant {
  updateAccess?: boolean;
}

interface Props {
  data: JobApplicantWithUpdateAccess;
  company: ICompany;
}

export default function ShortListedApplicantActionDropdownMenu({
  data,
  company,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="gap-1 group">
          Actions
          <Icons.chevronDown className=" group-data-[state=open]:rotate-180 transition-transform" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Employee Onboarding</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <ApplicantOnboardingDialogWrapper
              asMenuItem
              departments={data.job?.department ? [data.job.department] : []}
              company_id={data.company_id}
              designations={data.job?.designation ? [data.job.designation] : []}
              data={data}
              disabled={!data.updateAccess}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Offer Letter</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <OfferLetterEditDialog data={data} company={company} />
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            <Icons.send /> Send Offer Letter
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
