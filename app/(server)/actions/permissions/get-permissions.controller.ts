"use server";

import { IPermission } from "@/schema/UserSchema";
import executeRequest from "../network/request-builder.service";

interface FilterProps {
  isActive: boolean;
}

export default async function getPermissions({ isActive }: FilterProps) {
  return await executeRequest<IPermission[]>({
    method: "GET",
    endpoint: "permission",
    authenticate: true,
    query: [["isActive", isActive ? "1" : "0"]],
  });
}
