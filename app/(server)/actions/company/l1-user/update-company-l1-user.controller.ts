"use server";

import executeRequest from "../../network/request-builder.service";

interface InputProps {
  email: string | undefined;
  doc_link: string | undefined;
  fname: string | undefined;
  lname: string | undefined;
  designation: string | undefined;
  phone_no: string | undefined;
  offence_history: string | undefined;
  override: boolean | undefined;
}

export default async function updateCompanyL1User(
  id: string,
  data: InputProps
) {
  return await executeRequest({
    method: "PUT",
    endpoint: ["v2", "company", id, "l1-user"].join("/"),
    authenticate: true,
    body: JSON.stringify(data),
  });
}
