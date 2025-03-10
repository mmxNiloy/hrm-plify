"use server";

import { IContactDemo } from "@/schema/IContactDemoSchema";
import { withError } from "@/utils/Debug";
import { cookies } from "next/headers";

export async function deleteContactRequest(id: number) {
  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(
    `${process.env.API_BASE_URL}/company/operation/delete-contact-demo/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session}`,
        "Content-Type": "application/json",
      },
    }
  );

  const { data, error } = await withError<{
    message: string;
    deletedContact: IContactDemo;
  }>(req);

  if (error) {
    console.error(
      "Actions > Delete a contact request > Failed to delete the contact request >",
      error
    );
    return { error };
  }

  return { data };
}
