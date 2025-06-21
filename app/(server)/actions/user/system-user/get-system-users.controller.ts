"use server";
import { IUser } from "@/schema/UserSchema";
import executeRequest from "../../network/request-builder.service";

interface Props {
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export default async function getSystemUsers({
  page = 1,
  limit = 10,
  isActive = true,
}: Props) {
  return await executeRequest<IUser[]>({
    method: "GET",
    endpoint: "system-user",
    authenticate: true,
    query: [
      ["page", page.toString()],
      ["limit", limit.toString()],
      ["isActive", isActive ? "1" : "0"],
    ],
  });
}
