"use server";

import executeRequest from "../../network/request-builder.service";

export async function deleteCompanyAdmin(user_id: number) {
  return await executeRequest({
    method: "DELETE",
    authenticate: true,
    endpoint: ["v2", "company", "admin", user_id.toString()].join("/"),
  });
}
