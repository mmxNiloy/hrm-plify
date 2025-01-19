"use strict";

import { IJobListing } from "@/schema/JobSchema";
import { withError } from "@/utils/Debug";

interface IReturnData {
  sucess: boolean;
  data: IJobListing;
}

export async function getJobListing(id: string) {
  const request = fetch(`${process.env.API_BASE_URL}/recruitment/job/${id}`);
  const { data, error } = await withError<IReturnData>(request);

  if (error) {
    console.error(
      "Actions > Get job listing by id > Failed to get job listing",
      error
    );
    return { error };
  }

  return { data: data.data };
}
