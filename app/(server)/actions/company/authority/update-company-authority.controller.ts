"use server";

import executeRequest from "../../network/request-builder.service";

interface InputProps {
  email: string | undefined;
  fname: string | undefined;
  lname: string | undefined;
  designation: string | undefined;
  phone_no: string | undefined;
  offence_history: string | undefined;
  override: boolean | undefined;
  doc_link: string | undefined;
}

export default async function updateCompanyAuthority(
  id: string,
  data: InputProps
) {
  return await executeRequest({
    method: "PUT",
    endpoint: ["v2", "company", id, "authority"].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
