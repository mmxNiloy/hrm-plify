"use server";
import getCurrentUserPermissions from "@/app/(server)/actions/user/get-current-user-permissions.controller";
import ServiceInformationEditDialog from "@/components/custom/Dialog/Employee/ServiceInformationEditDialog";
import React from "react";

export default async function ServiceInfoAction() {
  const mPermissions = await getCurrentUserPermissions();
  const updateAccess = await mPermissions?.find(
    (item) => item === "cmp_emp_update"
  );

  if (!updateAccess) {
    return null;
  }

  return (
    <>WIP</>
    // <ServiceInformationEditDialog
    //   company={company.data}
    //   data={personalInfo.data}
    //   departments={companyExtraData.data.departments}
    //   designations={companyExtraData.data.designations}
    //   employmentTypes={empTypes}
    // />
  );
}
