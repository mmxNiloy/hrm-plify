"use server";

import { IRoles, IUser, IUserBase, IUserRoles } from "@/schema/UserSchema";
import executeRequest from "../../network/request-builder.service";
import { z } from "zod";
import { SystemUserSchema } from "@/schema/form/system-user.schema";

interface NewUser {
  user: IUserBase;
  role: IUserRoles;
  user_access: {
    count: number;
  };
}

export default async function createSystemUser(
  data: z.infer<typeof SystemUserSchema>
) {
  return await executeRequest<NewUser>({
    method: "POST",
    authenticate: true,
    endpoint: "system-user",
    body: JSON.stringify(data),
  });
}
