"use server";

import { IEmployeeWithUserMetadata } from "@/schema/EmployeeSchema";
import { IUser, TRole } from "@/schema/UserSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IEmployeeData {
  role_name: TRole;
  data?: IEmployeeWithUserMetadata;
}

export async function getEmployeeData(): Promise<IEmployeeData> {
  const user = JSON.parse(
    cookies().get(process.env.COOKIE_USER_KEY!)?.value ?? "{}"
  ) as IUser;

  if (
    user.user_roles?.roles.role_name === "Admin" ||
    user.user_roles?.roles.role_name === "Super Admin"
  ) {
    return { role_name: user.user_roles.roles.role_name };
  }
  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(`${process.env.API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    const res = await apiRes.json();

    console.log("Actions > getEmployeeData > Data found", res);

    if (apiRes.ok) {
      return {
        data: res as IEmployeeWithUserMetadata,
        role_name: user.user_roles?.roles.role_name ?? "Guest",
      };
    } else redirect("/api/logout?_ref=data-not-found");
  } catch (err) {
    console.error(
      "Actions > Get Employee Data > Failed to get employee data",
      err
    );
    redirect("/api/logout?_ref=data-not-found");
  }
}
