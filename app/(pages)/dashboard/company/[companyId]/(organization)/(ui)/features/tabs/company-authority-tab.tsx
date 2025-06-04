"use server";
import React from "react";
import { getCompanyDetails } from "@/app/(server)/actions/getCompanyDetails";
import { DataTableError } from "@/components/ui/data-table/data-table-error";
import CompanyAuthorityEditDialog from "../../components/company-authority-edit-dialog";
import CompanyAuthorityFormFragment from "../../components/company-authority/company-authority-form-fragment";

interface Props {
  title?: "Authorised Personnel" | "Key Contact" | "Level 1 User";
  companyId: string;
  id?: number;
  readOnly?: boolean;
}

export default async function CompanyAuthorityTab({
  companyId,
  readOnly,
}: Props) {
  // Get Data here
  const company = await getCompanyDetails(companyId);

  if (company.error) {
    return <DataTableError errorMessage="Failed to load company details." />;
  }

  const { data } = company;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 border rounded-md">
      {/* Authorised Personnel Section */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Authorised Personnel
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyAuthorityEditDialog
                id={data?.company_authorised_details?.authorised_id}
                companyId={companyId}
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
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Key Contact
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyAuthorityEditDialog
                id={data?.company_key_contact?.key_contact_id}
                companyId={companyId}
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
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            Level 1 User
          </p>
          {!readOnly && (
            <div className="w-full sm:w-auto">
              <CompanyAuthorityEditDialog
                id={data?.company_l1_user?.l1_user_id}
                companyId={companyId}
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
