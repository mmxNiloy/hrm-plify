"use server";

import { UpdateUserSchema } from "@/schema/form/user.schema";
import { z } from "zod";
import executeRequest from "../network/request-builder.service";
import { IUser } from "@/schema/UserSchema";

type InputProps = z.infer<typeof UpdateUserSchema>;

export default async function updateUser(userId: number, data: InputProps) {
  return await executeRequest<IUser>({
    method: "PATCH",
    authenticate: true,
    endpoint: ["v2", "user", userId.toString()].join("/"),
    body: JSON.stringify(data),
  });
}
