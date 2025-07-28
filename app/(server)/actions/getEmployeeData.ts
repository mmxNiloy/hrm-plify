"use server";

import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IUser, TRole } from "@/schema/UserSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IEmployeeData {
  role_name: TRole;
  data?: IEmployeeWithUserMetadata;
}

export async function getEmployeeData() {
  const mCookies = await cookies();
  const user = JSON.parse(
    mCookies.get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (
    user.user_roles?.roles?.role_name === "Admin" ||
    user.user_roles?.roles?.role_name === "Super Admin"
  ) {
    return { data: { role_name: user.user_roles.roles.role_name } };
  }
  const session = mCookies.get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const { data, error } = await withError<IEmployeeWithUserMetadata>(req);
  if (error) {
    console.error(
      "Actions > Get Employee Data > Failed to get employee data",
      error
    );
    return { error };
  }

  return {
    data: {
      data: data,
      role_name: user.user_roles?.roles?.role_name ?? "Guest",
    },
  };
}
