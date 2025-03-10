"use server";

import { IContactDemo } from "@/schema/IContactDemoSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

interface IContactRequest {
  first_name: string;
  last_name: string;
  email: string;
  contact_num?: string;
  message?: string;
  is_demo_call?: boolean;
}

export async function createContactRequest({
  first_name,
  last_name,
  email,
  contact_num,
  message,
  is_demo_call = false,
}: IContactRequest) {
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/create-contact-demo`,
    {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        contact_num,
        message,
        is_demo_call,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data, error } = await withError<IContactDemo>(req);

  if (error) {
    console.error(
      "Actions > Create a new contact request > Failed to create a new contact request >",
      error
    );
    return { error };
  }

  return { data };
}
