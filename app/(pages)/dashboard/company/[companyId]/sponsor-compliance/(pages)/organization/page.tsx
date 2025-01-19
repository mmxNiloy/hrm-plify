import React from "react";
import CompanyByIDPage from "../../../(organization)/page";
import { CompanyByIDPageProps } from "../../../PageProps";

export default function SCOrganization({ params }: CompanyByIDPageProps) {
  return (
    <CompanyByIDPage
      params={params}
      readOnly
      parent="Sponsor Compliance"
      title="Organization Profile"
    />
  );
}
