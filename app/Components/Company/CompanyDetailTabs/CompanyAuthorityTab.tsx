import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ICompanyAuthorisedDetails,
  ICompanyAuthorizedDetailsBase,
} from "@/schema/CompanySchema";
import { ButtonBlue } from "@/styles/button.tailwind";
import Link from "next/link";
import React from "react";
import CompanyAuthorityEditDialog from "../CompanyEditDialog/CompanyAuthorityEditDialog";
import CompanyAuthorityFormFragment from "../CompanyEditDialog/CompanyAuthorityEditDialog/form-fragment";

export default function CompanyAuthorityTab({
  data,
  title = "Authorised Personnel",
  company_id,
  id,
}: {
  data?: ICompanyAuthorizedDetailsBase;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  company_id: number;
  id?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
      <div className="col-span-full flex flex-row items-center justify-between">
        <p className="text-lg font-semibold">{title}</p>

        <CompanyAuthorityEditDialog
          id={id}
          company_id={company_id}
          title={title}
          data={data}
        />
      </div>

      <CompanyAuthorityFormFragment data={data} readOnly />
    </div>
  );
}
