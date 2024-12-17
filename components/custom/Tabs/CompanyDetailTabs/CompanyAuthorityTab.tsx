import {
  ICompanyAuthorizedDetailsBase,
  ICompanyDetails,
} from "@/schema/CompanySchema";
import React from "react";
import CompanyAuthorityEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyAuthorityEditDialog";
import CompanyAuthorityFormFragment from "../../Form/Fragment/Company/CompanyAuthorityFormFragment";

export default function CompanyAuthorityTab({
  data,
  title = "Authorised Personnel",
  company_id,
  id,
  readOnly,
}: {
  data?: ICompanyDetails;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  company_id: number;
  id?: number;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Authorised Personnel</p>

          {!readOnly && (
            <CompanyAuthorityEditDialog
              id={id}
              company_id={company_id}
              title={"Authorised Personnel"}
              data={data?.company_authorised_details}
            />
          )}
        </div>

        <CompanyAuthorityFormFragment
          data={data?.company_authorised_details}
          readOnly
        />
      </div>

      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Key Contact</p>

          {!readOnly && (
            <CompanyAuthorityEditDialog
              id={id}
              company_id={company_id}
              title={"Key Contact"}
              data={data?.company_key_contact}
            />
          )}
        </div>

        <CompanyAuthorityFormFragment
          data={data?.company_key_contact}
          readOnly
        />
      </div>

      <div className="grid grid-cols-2 gap-4 p-8 border rounded-md">
        <div className="col-span-full flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Level 1 User</p>

          {!readOnly && (
            <CompanyAuthorityEditDialog
              id={id}
              company_id={company_id}
              title={"Level 1 User"}
              data={data?.company_l1_user}
            />
          )}
        </div>

        <CompanyAuthorityFormFragment data={data?.company_l1_user} readOnly />
      </div>
    </div>
  );
}
