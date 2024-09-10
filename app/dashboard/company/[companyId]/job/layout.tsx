import { LayoutProps } from "@/utils/Types";
import React from "react";
import { CompanyByIDPageProps } from "../PageProps";
import JobsNavDrawer from "@/app/Components/Dashboard/Job/JobsNavDrawer";

interface Props extends LayoutProps, CompanyByIDPageProps {}

export default function CompanyJobsPageLayout({ children, params }: Props) {
  return (
    <div className="flex flex-row gap-2">
      <JobsNavDrawer companyId={params.companyId} />
      {children}
    </div>
  );
}
