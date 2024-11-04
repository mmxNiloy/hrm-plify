"use server";

import { withError } from "@/utils/Debug";
import SiteConfig from "@/utils/SiteConfig";
import { cookies } from "next/headers";

export interface IUploadResult {
  message: string;
  fileUrl: string;
}

export interface IUploadResponse {
  data?: IUploadResult;
  error?: Error;
}

export async function upload(file: File) {
  if (file.size > SiteConfig.maxFileSize) {
    return {
      error: new Error("File too large", {
        cause: `Trying to upload a file greater than ${SiteConfig.maxFileSize} bytes`,
      }),
    };
  }

  const fd = new FormData();
  fd.append("file", file);

  const session =
    (await cookies()).get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
  const req = fetch(`${process.env.API_BASE_URL}/upload`, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
    method: "POST",
    body: fd,
  });

  const { data, error } = await withError<IUploadResult>(req);

  if (error) {
    console.error("Actions > Upload file > Failed to upload file", error);
    return { error };
  }

  return { data };
}
