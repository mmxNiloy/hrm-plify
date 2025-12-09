"use server";

import { IUserBase } from "@/schema/UserSchema";
import executeRequest from "../../network/request-builder.service";

export default async function deleteSystemUser(id: number) {
  return await executeRequest<IUserBase>({
    method: "DELETE",
    authenticate: true,
    endpoint: ["system-user", id.toString()].join("/"),
  });
}
