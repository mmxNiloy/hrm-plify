"use server";

import SiteConfig from "@/utils/SiteConfig";
import { cookies } from "next/headers";

export async function upload(file: File) {
  if (file.size > SiteConfig.maxFileSize) {
    return { error: { message: "File too large" } };
  }

  const fd = new FormData();
  fd.append("file", file);

  try {
    const session = cookies().get(process.env.COOKIE_SESSION_KEY!)?.value ?? "";
    const apiRes = await fetch(`${process.env.API_BASE_URL}/upload`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
      method: "POST",
      body: fd,
    });

    if (apiRes.ok) {
      const data = (await apiRes.json()) as {
        message: string;
        fileUrl: string;
      };
      return {
        data: {
          message: data.message,
          fileUrl: data.fileUrl.replace("http:", "https:"),
        },
      };
    }

    return {
      error: { message: "Failed to upload file", reason: await apiRes.json() },
    };
  } catch (err) {
    console.error("Actions > Upload file > Failed to upload file", err);

    return { error: { message: "Failed to upload file", reason: err } };
  }
}
