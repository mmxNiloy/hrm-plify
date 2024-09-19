"use server";

import { getShifts } from "@/app/actions/getShifts";
import React from "react";
import OffDaysEditDialog from ".";
import { IOffDays } from "@/schema/RotaSchema";

export default async function OffDaysEditDialogWrapper({
  company_id,
  data,
  asIcon,
}: {
  company_id: number;
  data?: IOffDays;
  asIcon?: boolean;
}) {
  const paginatedShifts = await getShifts({ company_id, page: 1, limit: 10 }); //! TODO: Add Support to get all data

  return (
    <OffDaysEditDialog
      data={data}
      asIcon={asIcon}
      shifts={paginatedShifts.data}
      company_id={company_id}
    />
  );
}
