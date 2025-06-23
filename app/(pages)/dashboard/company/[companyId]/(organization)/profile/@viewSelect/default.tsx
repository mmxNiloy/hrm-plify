"use server";

import React from "react";
import { CompanyByIDPageProps } from "../../../PageProps";
import CompanyDetailViewSelect from "../(ui)/components/company-detail-view-select";

export default async function ViewSelect({ params }: CompanyByIDPageProps) {
  const mParams = await params;
  const companyId = mParams.companyId;
  return <CompanyDetailViewSelect companyId={companyId} />;
}
