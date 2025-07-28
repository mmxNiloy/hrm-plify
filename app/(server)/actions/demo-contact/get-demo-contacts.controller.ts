"use server";
import { IContactDemo } from "@/schema/IContactDemoSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";
import executeRequest from "../network/request-builder.service";

export async function getDemoContacts({
  demoOnly = 0,
  page = 1,
  limit = 10,
}: {
  demoOnly?: number;
  page?: number;
  limit?: number;
}) {
  return await executeRequest<IContactDemo[]>({
    method: "GET",
    authenticate: true,
    endpoint: ["notification", "contact-demo"].join("/"),
    query: {
      page,
      limit,
      demoOnly,
    },
  });
}
