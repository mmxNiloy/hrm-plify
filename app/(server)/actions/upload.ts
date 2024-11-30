"use server";

import { withError } from "@/utils/Debug";
import { withPrecision } from "@/utils/Misc";
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
  if (file.size <= 0) {
    // Ignore empty files
    return {
      error: new Error("File is empty!", {
        cause: `Trying to upload an empty file. Please select a non-empty file.`,
      }),
    };
  }

  if (file.size > SiteConfig.maxFileSize) {
    return {
      error: new Error("File too large", {
        cause: `Trying to upload a file greater than ${withPrecision({
          num: SiteConfig.maxFileSize / 1e6,
        })} MB`,
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
