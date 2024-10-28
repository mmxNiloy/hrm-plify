"use server";

import { ISalaryStructure } from "@/schema/Payroll";
import { ISearchParamsProps } from "@/utils/Types";

interface Props extends ISearchParamsProps {
  company_id: string | number;
}

export async function getSalaryStructure({
  company_id,
  searchParams,
}: Props): Promise<ISalaryStructure[]> {
  // Code
  return [];
}
