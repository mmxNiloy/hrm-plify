import { ICompanyDetails } from "@/schema/CompanySchema";
import React from "react";
import CompanyAuthorityEditDialog from "../../Dialog/Company/CompanyEditDialog/CompanyAuthorityEditDialog";
import CompanyAuthorityFormFragment from "../../Form/Fragment/Company/CompanyAuthorityFormFragment";

export default function CompanyAuthorityTab({
  data,
  company_id,
  readOnly,
}: {
  data?: ICompanyDetails;
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  company_id: number;
  id?: number;
  readOnly?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      {/* Authorised Personnel Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Authorised Personnel
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyAuthorityEditDialog
                id={data?.company_authorised_details?.authorised_id}
                company_id={company_id}
                title={"Authorised Personnel"}
                data={data?.company_authorised_details}
              />
            </div>
          )}
        </div>

        <CompanyAuthorityFormFragment
          data={data?.company_authorised_details}
          title={"Authorised Personnel"}
          readOnly
        />
      </div>

      {/* Key Contact Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Key Contact
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyAuthorityEditDialog
                id={data?.company_key_contact?.key_contact_id}
                company_id={company_id}
                title={"Key Contact"}
                data={data?.company_key_contact}
              />
            </div>
          )}
        </div>

        <CompanyAuthorityFormFragment
          data={data?.company_key_contact}
          title={"Key Contact"}
          readOnly
        />
      </div>

      {/* Level 1 User Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Level 1 User
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyAuthorityEditDialog
                id={data?.company_l1_user?.l1_user_id}
                company_id={company_id}
                title={"Level 1 User"}
                data={data?.company_l1_user}
              />
            </div>
          )}
        </div>

        <CompanyAuthorityFormFragment
          title={"Level 1 User"}
          data={data?.company_l1_user}
          readOnly
        />
      </div>
    </div>
  );
}
