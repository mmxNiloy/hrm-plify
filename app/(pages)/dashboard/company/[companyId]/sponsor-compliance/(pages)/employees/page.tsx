import React from "react";
import AllEmployeePage from "../../../employee/(administrative)/all/page";
import { CompanyByIDPageProps } from "../../../PageProps";
import { ISearchParamsProps } from "@/utils/Types";

interface Props extends CompanyByIDPageProps, ISearchParamsProps {}

export default function SCEmployeesPage({ params, searchParams }: Props) {
  return (
    <AllEmployeePage
      params={params}
      searchParams={searchParams}
      parent="Sponsor Compliance"
      readOnly
    />
  );
}
