"use server";

import { IUserBase } from "@/schema/UserSchema";
import executeRequest from "../../network/request-builder.service";
import { z } from "zod";
import { UpdateSystemUserSchema } from "@/schema/form/system-user.schema";

interface UpdatedUser {
  user: IUserBase;
  newPermissions: {
    count: number;
  };
}

export default async function updateSystemUser(
  id: number,
  data: z.infer<typeof UpdateSystemUserSchema>
) {
  return await executeRequest<UpdatedUser>({
    method: "PATCH",
    authenticate: true,
    endpoint: ["system-user", id.toString()].join("/"),
    body: JSON.stringify(data),
  });
}
